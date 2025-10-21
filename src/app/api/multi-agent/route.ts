export const maxDuration = 60; // Set max timeout to 60 seconds (requires Vercel Pro)

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    
    console.log('Calling backend:', backendUrl);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 second timeout

    try {
      const response = await fetch(`${backendUrl}/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();
      
      return NextResponse.json({
        success: true,
        data: data
      });
    } finally {
      clearTimeout(timeoutId);
    }

  } catch (error: any) {
    console.error('Research error:', error);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - the research is taking too long. Please try a simpler topic.' },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to complete research',
      },
      { status: 500 }
    );
  }
}