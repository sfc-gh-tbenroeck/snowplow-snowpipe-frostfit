/**
  * PROPRIETARY AND CONFIDENTIAL
  *
  * Unauthorized copying of this file via any medium is strictly prohibited.
  *
  * Copyright (c) 2019-2022 Snowplow Analytics Ltd. All rights reserved.
  */
import com.typesafe.sbt.packager.MappingsHelper.directory
import com.typesafe.sbt.packager.docker._

lazy val buildSettings = Seq(
  name := "snowplow-micro",
  organization := "com.snowplowanalytics.snowplow",
  description := "Standalone application to automate testing of trackers",
  scalaVersion := "2.12.14",
  scalacOptions := Settings.compilerOptions,
  javacOptions := Settings.javaCompilerOptions,
  Runtime / unmanagedClasspath ++= Seq(
    baseDirectory.value / "config"),
  Compile / unmanagedResources += file("LICENSE.md"),
  resolvers ++= Dependencies.resolvers
)

lazy val dependencies = Seq(
  libraryDependencies ++= Seq(
    Dependencies.snowplowStreamCollector,
    Dependencies.snowplowCommonEnrich,
    Dependencies.circeJawn,
    Dependencies.circeGeneric,
    Dependencies.specs2,
    Dependencies.badRows
  )
)

//Tim Add
libraryDependencies += "com.google.code.gson" % "gson" % "2.8.8"
libraryDependencies += "net.snowflake" % "snowflake-ingest-sdk" % "2.0.2"
libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.12.4"
libraryDependencies += "com.typesafe.akka" %% "akka-http" % "10.2.4"


lazy val exclusions = Seq(
  excludeDependencies ++= Dependencies.exclusions
)

lazy val buildInfoSettings = Seq(
  buildInfoKeys := Seq[BuildInfoKey](organization, name, version, scalaVersion),
  buildInfoPackage := "buildinfo"
)

lazy val dynVerSettings = Seq(
  ThisBuild / dynverVTagPrefix := false, // Otherwise git tags required to have v-prefix
  ThisBuild / dynverSeparator := "-"     // to be compatible with docker
)

lazy val commonSettings =
  dependencies ++
  exclusions ++
  buildSettings ++
  buildInfoSettings ++
  dynVerSettings ++
  Settings.dynverOptions ++
  Settings.assemblyOptions

lazy val dockerCommon = Seq(
  Docker / maintainer := "Snowplow Analytics Ltd. <support@snowplow.io>",
  Docker / packageName := "snowplow/snowplow-micro",
  Docker / defaultLinuxInstallLocation := "/opt/snowplow",
  Docker / daemonUserUid := None,
  dockerPermissionStrategy := DockerPermissionStrategy.CopyChown,
  dockerRepository := Some("snowplow"),
  Universal / mappings += file("LICENSE.md") -> "LICENSE.md"
)

lazy val microSettings = dockerCommon ++ Seq(
  dockerBaseImage := "eclipse-temurin:11",
  Docker / daemonUser := "daemon",
  scriptClasspath ++= Seq( "/config"),
  Universal / javaOptions ++= Seq("-Dnashorn.args=--language=es6"),
)

lazy val micro = project
  .in(file("."))
  .settings(commonSettings ++ microSettings)
  .enablePlugins(BuildInfoPlugin, DockerPlugin, JavaAppPackaging)
