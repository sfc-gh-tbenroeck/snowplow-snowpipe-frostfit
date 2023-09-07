# Configure docker-compose.yml
```
    environment:
      SNOWPIPE_CLIENT_ACCOUNT: "wp48969.west-us-2.azure"
      SNOWPIPE_CLIENT_USER: "tbenroeck"
      SNOWPIPE_CLIENT_PRIVATE_KEY: "MIIEvAIBADANBg____NOT-REAL____/hmkVqJBR6T2Xh2eg=="
      SNOWPIPE_CLIENT_SCHEMA: "public"
      SNOWPIPE_CLIENT_DATABASE: "sams"
      SNOWPIPE_CLIENT_WAREHOUSE: "XSMALL"
      SNOWPIPE_CLIENT_ROLE: "accountadmin"
      SNOWPIPE_CLIENT_STREAMING_CLIENT: "streamingClient"
      SNOWPIPE_EVENT_CHANNEL_NAME: "snowplowEvents"
      SNOWPIPE_EVENT_CHANNEL_DATABASE: "sams"
      SNOWPIPE_EVENT_CHANNEL_SCHEMA: "public"
      SNOWPIPE_EVENT_CHANNEL_TABLE: "snowplowEvents"
      SNOWPIPE_EVENT_CHANNEL_VARIANT_COLUMN: "eventJson"
      SNOWPIPE_EVENT_CHANNEL_EVENT_FLAG_COLUMN: "isGoodRecord"
      FLUSH_BUFFER_THRESHOLD: 3
      FLUSH_TIME_INTERVAL_SECONDS: 60
```

# Frontend website
To change the frontend website, modify the volume mapping of `/static-frontend`

# Build Frostfit Frontend
cd into frostfit-build and run `npm run export`.

# Build server / snowplow-mirco code
If you made changes to the Akka routes or the Snowplow-micro files you will need to rebuild the code and docker image
Run `sbt "project micro" docker:stage && docker compose build`

# Run Container
 Run `docker compose up`


# Known Issues
 - HEAD request into _next/data like `_next/data/io5So6uJ71bUgvte5ZbL9/product/frostchill-snow-tee.json?name=frostchill-snow-tee` are returning a 404.  I've tried several way to fix the route in `src/main/scala/com.snowplowanalytics.snowplow.micro/Routing.scala`.
