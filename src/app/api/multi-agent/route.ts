import { NextResponse } from 'next/server';
import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Publish async job to backend via QStash
    const response = await qstash.publishJSON({
      url: backendUrl, // Replace with your FastAPI or Node backend
      body,
      // Optional retry/delay settings:
      // delay: 10, // seconds
      // retries: 3,
    });

    return NextResponse.json(
      { message: '✅ Job enqueued successfully', qstashResponse: response },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('❌ QStash enqueue error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to enqueue QStash job' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to enqueue AI Agent Multi tasks via QStash',
  });
}
