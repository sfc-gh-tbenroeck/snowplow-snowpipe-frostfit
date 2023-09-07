package com.snowplowanalytics.snowplow.micro

import net.snowflake.ingest.streaming._
import java.time._
import java.time.format.DateTimeFormatter
import java.util.{Properties, UUID}
import java.util.{Map => JMap}
import scala.collection.JavaConverters._
import scala.collection.mutable
import io.circe.syntax._
import io.circe.parser._
import java.nio.file.{Files, Paths}

object Snowpipe {
  type SnowPipeConfig = Map[String, Map[String, String]]

  def loadConfig(entity: String): Map[String, String] = {
    entity match {
      case "client" =>
        val account = sys.env("SNOWPIPE_CLIENT_ACCOUNT")
        val user = sys.env("SNOWPIPE_CLIENT_USER")
        val private_key = sys.env("SNOWPIPE_CLIENT_PRIVATE_KEY")
        val schema = sys.env("SNOWPIPE_CLIENT_SCHEMA")
        val database = sys.env("SNOWPIPE_CLIENT_DATABASE")
        val warehouse = sys.env("SNOWPIPE_CLIENT_WAREHOUSE")
        val role = sys.env("SNOWPIPE_CLIENT_ROLE")
        val streamingClient = sys.env("SNOWPIPE_CLIENT_STREAMING_CLIENT")
        val host = s"$account.snowflakecomputing.com"
        val baseURL = s"https://$host:443"
        val connect_string = s"jdbc:snowflake://$baseURL"

        Map(
          "account" -> account,
          "user" -> user,
          "private_key" -> private_key,
          "schema" -> schema,
          "database" -> database,
          "warehouse" -> warehouse,
          "role" -> role,
          "streamingClient" -> streamingClient,
          "url" -> baseURL,
          "connect_string" -> connect_string
        )

      case "eventChannel" =>
        val channelName = sys.env("SNOWPIPE_EVENT_CHANNEL_NAME")
        val database = sys.env("SNOWPIPE_EVENT_CHANNEL_DATABASE")
        val schema = sys.env("SNOWPIPE_EVENT_CHANNEL_SCHEMA")
        val table = sys.env("SNOWPIPE_EVENT_CHANNEL_TABLE")
        val variantColumn = sys.env("SNOWPIPE_EVENT_CHANNEL_VARIANT_COLUMN")
        val eventFlagColumn =
          sys.env("SNOWPIPE_EVENT_CHANNEL_EVENT_FLAG_COLUMN")

        Map(
          "channelName" -> channelName,
          "database" -> database,
          "schema" -> schema,
          "table" -> table,
          "variantColumn" -> variantColumn,
          "eventFlagColumn" -> eventFlagColumn
        )

      case _ =>
        throw new Exception(s"Entity $entity not found in configuration")
    }
  }

  def buildClient(
      propertiesMap: Map[String, String]
  ): SnowflakeStreamingIngestClient = {
    val props = new Properties()
    propertiesMap.foreach { case (key, value) => props.setProperty(key, value) }

    SnowflakeStreamingIngestClientFactory
      .builder(propertiesMap("streamingClient"))
      .setProperties(props)
      .build()
  }

  def buildRequest(
      propertiesMap: Map[String, String]
  ): OpenChannelRequest = {
    OpenChannelRequest
      .builder(propertiesMap("channelName"))
      .setDBName(propertiesMap("database"))
      .setSchemaName(propertiesMap("schema"))
      .setTableName(propertiesMap("table"))
      .setOnErrorOption(
        OpenChannelRequest.OnErrorOption.CONTINUE
      ) // Another ON_ERROR option is ABORT
      .build
  }

  def insertRowsBatch(
      channel: SnowflakeStreamingIngestChannel,
      rowsBatch: List[JMap[String, AnyRef]]
  ): Unit = {
    val batchUUID = UUID.randomUUID().toString

    val response = channel.insertRows(rowsBatch.asJava, batchUUID)

    if (response.hasErrors()) {
      throw new Exception(response.getInsertErrors().get(0).getException())
    }
  }
}
