package com.snowplowanalytics.snowplow.micro

import java.util.concurrent.{ScheduledExecutorService, Executors, TimeUnit}
import scala.collection.JavaConverters._
import net.snowflake.ingest.streaming._
import io.circe.generic.auto._
import io.circe.syntax._

import io.circe._
import CirceSupport._

private[micro] trait ValidationCache {
  import ValidationCache._

  protected var good: List[GoodEvent]
  private object LockGood

  protected var bad: List[BadEvent]
  private object LockBad

  protected var snowpipeEvents: List[(String, Boolean)] = List.empty
  private object LockSnowpipe

  /** Compute a summary with the number of good and bad events currently in
    * cache.
    */
  private[micro] def getSummary(): ValidationSummary = {
    val nbGood = LockGood.synchronized {
      good.size
    }
    val nbBad = LockBad.synchronized {
      bad.size
    }
    ValidationSummary(nbGood + nbBad, nbGood, nbBad)
  }

  private[micro] def printvars(): Json = {
    val envVars = System.getenv().asScala.toMap
    envVars.asJson
  }

  // Snowpipe client and channels initialization
  val clientConfig = Snowpipe.loadConfig("client")
  val eventChannelConfig = Snowpipe.loadConfig("eventChannel")
  val client = Snowpipe.buildClient(clientConfig)
  val eventsChannelRequest = Snowpipe.buildRequest(eventChannelConfig)
  val eventsChannel: SnowflakeStreamingIngestChannel =
    client.openChannel(eventsChannelRequest)

  // Get the values of X from environment variables
  private val FLUSH_BUFFER_THRESHOLD: Int =
    sys.env.getOrElse("FLUSH_BUFFER_THRESHOLD", "100").toInt
  private val FLUSH_TIME_INTERVAL_SECONDS: Int =
    sys.env.getOrElse("FLUSH_FLUSH_TIME_INTERVAL_SECONDS_SECONDS", "60").toInt

  // Use ScheduledExecutorService instead of Timer
  private val executor: ScheduledExecutorService =
    Executors.newSingleThreadScheduledExecutor()

  // Schedule SendEventsToSnowpipeTask to run every X seconds
  executor.scheduleAtFixedRate(
    new SendEventsToSnowpipeTask,
    0,
    FLUSH_TIME_INTERVAL_SECONDS,
    TimeUnit.SECONDS
  )

  class SendEventsToSnowpipeTask extends Runnable {
    override def run(): Unit = {
      LockSnowpipe.synchronized {
        val rowsBatch = snowpipeEvents.map { case (event, isGoodRecord) =>
          Map(
            eventChannelConfig("variantColumn") -> event.asInstanceOf[AnyRef],
            eventChannelConfig("eventFlagColumn") -> isGoodRecord
              .asInstanceOf[AnyRef]
          ).asJava
        }

        if (rowsBatch.nonEmpty) {
          println(s"Current size of snowpipeEvents: ${snowpipeEvents.size}")
          Snowpipe.insertRowsBatch(eventsChannel, rowsBatch)
        }

        snowpipeEvents = List.empty
      }
    }
  }

  private[micro] def addToGood(events: List[GoodEvent]): Unit = {
    LockGood.synchronized {
      good = events ++ good
    }
    addToSnowpipeEvents(events.map(_.asJson.noSpaces), isGood = true)

  }

  private[micro] def addToBad(events: List[BadEvent]): Unit = {
    LockBad.synchronized {
      bad = events ++ bad
    }
    addToSnowpipeEvents(events.map(_.asJson.noSpaces), isGood = false)
  }

  private def addToSnowpipeEvents(
      events: List[String],
      isGood: Boolean
  ): Unit = {
    LockSnowpipe.synchronized {
      snowpipeEvents = events.map(e => (e, isGood)) ++ snowpipeEvents

      if (snowpipeEvents.size > FLUSH_BUFFER_THRESHOLD) {
        new SendEventsToSnowpipeTask().run()
      }
    }
  }

  /** Remove all the events from memory. */
  private[micro] def reset(): Unit = {
    LockGood.synchronized {
      good = List.empty[GoodEvent]
    }
    LockBad.synchronized {
      bad = List.empty[BadEvent]
    }
  }

  /** Filter out the good events with the possible filters contained in the HTTP
    * request.
    */
  private[micro] def filterGood(
      filtersGood: FiltersGood = FiltersGood(None, None, None, None)
  ): List[GoodEvent] =
    LockGood.synchronized {
      val filtered = good.filter(keepGoodEvent(_, filtersGood))
      filtered.take(filtersGood.limit.getOrElse(filtered.size))
    }

  /** Filter out the bad events with the possible filters contained in the HTTP
    * request.
    */
  private[micro] def filterBad(
      filtersBad: FiltersBad = FiltersBad(None, None, None)
  ): List[BadEvent] =
    LockBad.synchronized {
      val filtered = bad.filter(keepBadEvent(_, filtersBad))
      filtered.take(filtersBad.limit.getOrElse(filtered.size))
    }

}

private[micro] object ValidationCache extends ValidationCache {
  protected var good = List.empty[GoodEvent]
  protected var bad = List.empty[BadEvent]

  /** Check if a good event matches the filters. */
  private[micro] def keepGoodEvent(
      event: GoodEvent,
      filters: FiltersGood
  ): Boolean =
    filters.event_type.toSet.subsetOf(event.eventType.toSet) &&
      filters.schema.toSet.subsetOf(event.schema.toSet) &&
      filters.contexts.forall(containsAllContexts(event, _))

  /** Check if an event conntains all the contexts of the list. */
  private[micro] def containsAllContexts(
      event: GoodEvent,
      contexts: List[String]
  ): Boolean =
    contexts.forall(event.contexts.contains)

  /** Check if a bad event matches the filters. */
  private[micro] def keepBadEvent(
      event: BadEvent,
      filters: FiltersBad
  ): Boolean =
    filters.vendor.forall(vendor =>
      event.collectorPayload.forall(_.api.vendor == vendor)
    ) &&
      filters.version.forall(version =>
        event.collectorPayload.forall(_.api.version == version)
      )
}
