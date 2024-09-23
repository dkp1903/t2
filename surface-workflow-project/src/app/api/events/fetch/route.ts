import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Your format for Prisma client

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events' }, { status: 500 });
  }
}
