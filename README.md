### Getting started

1. Clone the project and update git submodules

```sh
git clone git@github.com:sfc-gh-tbenroeck/snowplow-snowpipe-frostfit.git
git submodule init
git submodule update
```

# Optionally open the folder in the .devcontainer
- Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension
- Press F1 and select `Dev Containers: Open Folder In Container`
- Use the VSCode terminal for all non GIT and Docker commands
- GIT and Docker commands should still be run from your local terminal

# Configure docker-compose.yml
Rename docker-compose.yml.template to docker-compose.yml and update the environment variables to reflect your Snowflake Account and desiered Snowpipe configuration
```
    environment:
      SNOWPIPE_CLIENT_ACCOUNT: "wp48969.west-us-2.azure"
      SNOWPIPE_CLIENT_USER: "tbenroeck"
      SNOWPIPE_CLIENT_PRIVATE_KEY: "MIIEvAIBADANBg____NOT-REAL____/hmkVqJBR6T2Xh2eg=="
      SNOWPIPE_CLIENT_SCHEMA: "public"
      SNOWPIPE_CLIENT_DATABASE: "frostfit"
      SNOWPIPE_CLIENT_WAREHOUSE: "XSMALL"
      SNOWPIPE_CLIENT_ROLE: "accountadmin"
      SNOWPIPE_CLIENT_STREAMING_CLIENT: "streamingClient"
      SNOWPIPE_EVENT_CHANNEL_NAME: "snowplowEvents"
      SNOWPIPE_EVENT_CHANNEL_DATABASE: "frostfit"
      SNOWPIPE_EVENT_CHANNEL_SCHEMA: "public"
      SNOWPIPE_EVENT_CHANNEL_TABLE: "snowplowEvents"
      SNOWPIPE_EVENT_CHANNEL_VARIANT_COLUMN: "eventJson"
      SNOWPIPE_EVENT_CHANNEL_EVENT_FLAG_COLUMN: "isGoodRecord"
      FLUSH_BUFFER_THRESHOLD: 3
      FLUSH_TIME_INTERVAL_SECONDS: 60
```

# Frontend website
To change the frontend website, modify the volume mapping of `/static-frontend`

# To use Frostfit as the frontend
- Frostfit-build doesn't have Snowplow tracking.  You can overwrite the files in Frostfit-build with the files in frostfit-snowplow to add basic tracking.
  ```
  cp -r frostfit-snowplow/* frostfit-build/
  ```
- Build the frostfit frontend
  ```
  cd frostfit-build
  npm install
  npm run export
  ```

# Build server / snowplow-mirco code
If you made changes to the Akka routes or the Snowplow-micro files you will need to rebuild the code and docker image.  Currently the routes should support the Frostfit frontend
Run `sbt "project micro" docker:stage`

# Build and Run Container
 ```
 docker compose build
 docker compose up
 ```

# Known Issues
 - HEAD request into _next/data like `_next/data/io5So6uJ71bUgvte5ZbL9/product/frostchill-snow-tee.json?name=frostchill-snow-tee` are returning a 404.  I've tried several ways to fix the route in `src/main/scala/com.snowplowanalytics.snowplow.micro/Routing.scala` but it still returns a 404.
