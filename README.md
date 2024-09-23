## Introduction

This application captures events from a simple form and posts them to a backend. These events are then stored in a PostgreSQL database using Prisma.

## Running the Application

To run the application, paste the env variable, and execute the following command:

```bash
./start.sh
```

If that doesn't work,

```bash
cd surface-workflow-project

./start-database.sh

pnpm db:push
pnpm dev
```

After the application starts, open `index.html` to begin capturing events.

## Structure
```
client
    | - Main
        | - Sidebar
        | - InstallSurfaceTagComponent
        | - TestSurfaceTagEventsComponent

server
    | - api
        | - events
            | - POST events
                | - fetch events

    | - prisma
        | - schema
    | - env/db # Describes db configuration

index.html ## Sample index.html page
script.js ## Analytics script to capture events and write them to the database
```

## Backend Approach

### Main

The application uses a Next.js serverless API with the following endpoints:

- `GET /api/events/fetch`: Returns a list of events, called by the UI.
- `POST /api/events`: Used by the script to write events to the PostgreSQL database via Prisma.

### Development

In development, a separate WebSocket server is run. Due to the stateless nature of serverless APIs, WebSocket connections cannot be maintained directly within Next.js APIs.

To switch to the development branch, use the following command:

```bash
git checkout develop
```

### Backend Implementation Optimizations

Several optimizations have been implemented in the backend:

1. **Generic Model Structure**: The models are designed to handle various types of events.
2. **Separation of Concerns**: Distinct endpoints and components promote better organization and easier bug traceability.

### Future Optimizations

Further optimizations that could be considered include:

1. **Message Queue Integration**: Implementing a messaging queue, such as Kafka, to queue events for processing.
2. **Redux Store for complex UI state scheduling** : If the UI state, like number of events captured, connection status etc need to remain in sync across the application
