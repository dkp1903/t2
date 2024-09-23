import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  console.log("event get")
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch events' }, { status: 500 });
  }
}
