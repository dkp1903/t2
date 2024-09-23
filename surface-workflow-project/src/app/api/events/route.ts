import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import WebSocket from 'ws';

const prisma = new PrismaClient(); // Your format for Prisma client
let wsServer: WebSocket.Server | null = null;
const clients: WebSocket[] = [];

// POST handler for event ingestion
export async function POST(req: NextRequest) {
  try {
    const { eventName, visitorId, metadata } = await req.json();

    // Create event in the database
    const newEvent = await prisma.event.create({
      data: {
        eventName,
        visitorId,
        metadata,
      },
    });

    // Broadcast to WebSocket clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newEvent));
      }
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Failed to create event' }, { status: 500 });
  }
}

// Initialize WebSocket server
export function initWebSocket(server: any) {
  if (!wsServer) {
    wsServer = new WebSocket.Server({ server });

    wsServer.on('connection', (ws: WebSocket) => {
      clients.push(ws);
      console.log('New WebSocket connection established.');

      ws.on('close', () => {
        const index = clients.indexOf(ws);
        if (index !== -1) {
          clients.splice(index, 1);
        }
      });
    });
  }
}
