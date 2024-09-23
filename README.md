## Running the app

Run `./start.sh`.

Run `index.html` and get events.

## Backend approach

### main

NextJS API Serverless => `/api/events/fetch` returns list of events - called by UI, and `POST api/events` is used by the script to write to the Postgres DB via Prisma

### develop

Running a separate websocket server. Can't use it directly inside NextJS APIs since serverless APIs are stateless, and the websocket won't be able to stay on

```
git checkout develop
```

Backend implementation optimizations that have been done

1. Generic structure of the models to hold any type of event

2. Separate endpoints and components to ensure concern separation, yet at the same time, allow for easier traceability for bugs

3. 

Some other implementation optimizations that could be done : 

1. Use a messaging queue like Kafka to queue events for processing

2. 

