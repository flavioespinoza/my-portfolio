import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@upstash/qstash';

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const targetUrl = `${backendUrl}/research`;

    console.log('📬 Enqueuing backend call via QStash:', targetUrl);

    const response = await qstash.publishJSON({
      url: targetUrl,
      body: { topic },
      // Optional parameters:
      // delay: 10, // seconds
      // retries: 3,
    });

    console.log('✅ QStash publish response:', response);

    return NextResponse.json({
      success: true,
      message: 'Task enqueued successfully',
      qstashResponse: response,
    });
  } catch (error: any) {
    console.error('❌ QStash enqueue error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to enqueue research task',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.PYTHON_BACKEND_URL ||
    'http://localhost:8000';

  return NextResponse.json({
    message: 'Multi-Agent Research API via QStash',
    backend: backendUrl,
    status: 'ready',
  });
}
