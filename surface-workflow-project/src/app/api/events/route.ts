import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log("Event post");
    const body = await request.json();
    const { eventName, visitorId, metadata } = body;

    console.log("Received event : ", body);
    console.log("Creating new event")
    const parsedMetadata = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;

    const newEvent = await prisma.event.create({
      data: {
        eventName,
        visitorId,
        metadata: 'parsedMetadata',
      },
    });
    console.log('Event creation successful');
    const response = NextResponse.json({ success: true, event: newEvent }, { status: 201 });
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Unable to store event' }, { status: 500 });
  }
}
