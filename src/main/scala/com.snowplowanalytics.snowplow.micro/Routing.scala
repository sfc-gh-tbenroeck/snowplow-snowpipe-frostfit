/*
 * Copyright (c) 2019-2022 Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */
package com.snowplowanalytics.snowplow.micro

import akka.http.scaladsl.server.{Route, RouteResult}
import org.slf4j.LoggerFactory

import akka.http.scaladsl.server._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.ContentTypes
import akka.http.scaladsl.model.headers.{
  `Access-Control-Allow-Methods`,
  `Access-Control-Allow-Headers`
}
import akka.http.scaladsl.model.{HttpMethods, StatusCodes}

import io.circe.generic.auto._

import com.snowplowanalytics.snowplow.collectors.scalastream.model.{
  CollectorConfig,
  CollectorSinks
}
import com.snowplowanalytics.snowplow.collectors.scalastream.{
  CollectorRoute,
  CollectorService,
  HealthService
}

import scala.concurrent.ExecutionContext

import CirceSupport._

/** Contain definitions of the routes (endpoints) for Snowplow Micro. Make the
  * link between Snowplow Micro endpoints and the functions called. Snowplow
  * Micro has 2 types of endpoints:
  *   - to receive tracking events;
  *   - to query the validated events.
  *
  * More information about an Akka HTTP routes can be found here:
  * https://doc.akka.io/docs/akka-http/current/routing-dsl/routes.html.
  */
private[micro] object Routing {

  lazy val logger = LoggerFactory.getLogger(getClass())

  /** Create `Route` for Snowplow Micro, with the endpoints of the collector to
    * receive tracking events and the endpoints to query the validated events.
    */
  def getMicroRoutes(
      collectorConf: CollectorConfig,
      collectorSinks: CollectorSinks,
      igluService: IgluService
  )(implicit ec: ExecutionContext): Route = {
    val c = new CollectorService(
      collectorConf,
      collectorSinks,
      buildinfo.BuildInfo.name,
      buildinfo.BuildInfo.version
    )

    val health = new HealthService.Settable {
      toHealthy()
    }
    val collectorRoutes = new CollectorRoute {
      override def collectorService = c
      override def healthService = health
    }.collectorRoute

    val logRequestUri: Directive[Unit] = extractRequestContext.flatMap { ctx =>
      logger.info(s"Request URI: ${ctx.request.uri}")
      pass
    }
    withCors(c) {

      /** Start Static Site Serving * */
      /** Some hardcoded routes specific for FrostFit * */
      pathEndOrSingleSlash {
        getFromFile("/static-frontend/index.html")
      } ~ pathPrefix("product") {
        path(Segment) { productName =>
          get {
            logger.info(s"pathPrefix - product > ${productName}")
            getFromDirectory(s"/static-frontend/product/$productName.html")
          }
        }
      } ~ pathPrefix("_next") {
        concat(
          get {
            getFromDirectory("/static-frontend/_next")
          },
          head {
            extractUnmatchedPath { path =>
              getFromFile(s"/static-frontend/_next$path")
            }
          }
        )
      } ~ pathPrefix("") {
        get {
          getFromDirectory("/static-frontend")
        }

        /** End Static Site Serving * */
      } ~ pathPrefix("status") {
        get {
          complete(StatusCodes.OK, "Server is running!")
        }
      } ~ pathPrefix("micro") {
        (get | post) {
          path("all") {
            complete(ValidationCache.getSummary())
          } ~ path("reset") {
            ValidationCache.reset()
            complete(ValidationCache.getSummary())
          }
        } ~ get {
          path("good") {
            complete(
              ValidationCache.filterGood(FiltersGood(None, None, None, None))
            )
          } ~ path("bad") {
            complete(ValidationCache.filterBad(FiltersBad(None, None, None)))
          } ~ path("printvars") {
            complete(ValidationCache.printvars())
          }
        } ~ post {
          path("good") {
            entity(as[FiltersGood]) { filters =>
              complete(ValidationCache.filterGood(filters))
            }
          } ~ path("bad") {
            entity(as[FiltersBad]) { filters =>
              complete(ValidationCache.filterBad(filters))
            }
          }
        } ~ options {
          complete(StatusCodes.OK)
        } ~ pathPrefix("iglu") {
          path(Segment / Segment / "jsonschema" / Segment) {
            igluService.get(_, _, _)
          } ~ {
            complete(
              StatusCodes.NotFound,
              "Schema lookup should be in format iglu/{vendor}/{schemaName}/jsonschema/{model}-{revision}-{addition}"
            )
          }
        } ~ {
          complete(
            StatusCodes.NotFound,
            "Path for micro has to be one of: /all /good /bad /reset /iglu"
          )
        }
      }
    } ~ collectorRoutes

  }

  /** Wrap a Route with CORS header handling.
    *
    * Reuses the implementation used by the stream collector
    */
  private def withCors(
      c: CollectorService
  )(route: Route)(implicit ec: ExecutionContext): Route =
    extractRequest { request => requestContext =>
      route(requestContext).map {
        case RouteResult.Complete(response) =>
          val r = response.withHeaders(
            List(
              `Access-Control-Allow-Methods`(
                List(HttpMethods.POST, HttpMethods.GET, HttpMethods.OPTIONS)
              ),
              c.accessControlAllowOriginHeader(request),
              `Access-Control-Allow-Headers`("Content-Type")
            )
          )
          RouteResult.Complete(r)
        case other => other
      }
    }
}
