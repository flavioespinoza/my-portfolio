<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'
||||||| merged common ancestors
import { NextRequest, NextResponse } from 'next/server';
=======
export const maxDuration = 300; // 5 minutes on Vercel Pro

import { NextRequest, NextResponse } from 'next/server';
>>>>>>> 993a735517a3a2acb9ff0fb6c5adcd2e58284f7c

export async function POST(request: NextRequest) {
<<<<<<< HEAD
	try {
		const { topic } = await request.json()

		if (!topic) {
			return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
		}

		const backendUrl =
			process.env.NEXT_PUBLIC_BACKEND_URL ||
			process.env.PYTHON_BACKEND_URL ||
			'http://localhost:8000'

		console.log('Calling backend:', backendUrl)

		const response = await fetch(`${backendUrl}/research`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ topic }),
			signal: AbortSignal.timeout(60000)
		})

		if (!response.ok) {
			const errorText = await response.text()
			console.error('Backend error:', errorText)
			throw new Error(`Research API failed: ${response.status}`)
		}

		const data = await response.json()

		return NextResponse.json({
			success: true,
			data: data
		})
	} catch (error: any) {
		console.error('Research error:', error)
		return NextResponse.json(
			{
				error: error.message || 'Failed to complete research',
				details: error.toString()
			},
			{ status: 500 }
		)
	}
||||||| merged common ancestors
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
    
    const response = await fetch(`${backendUrl}/research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
      signal: AbortSignal.timeout(60000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      throw new Error(`Research API failed: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data
    });

  } catch (error: any) {
    console.error('Research error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to complete research',
        details: error.toString()
      },
      { status: 500 }
    );
  }
=======
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
    const timeoutId = setTimeout(() => controller.abort(), 280000); // 280 second timeout (留20秒缓冲)

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
        { error: 'Request timeout - the research took too long.' },
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
>>>>>>> 993a735517a3a2acb9ff0fb6c5adcd2e58284f7c
}

export async function GET() {
<<<<<<< HEAD
	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || process.env.PYTHON_BACKEND_URL || 'http://localhost:8000'

	return NextResponse.json({
		message: 'Multi-Agent Research API Proxy',
		backend: backendUrl,
		status: 'ready'
	})
}
||||||| merged common ancestors
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
  
  return NextResponse.json({
    message: 'Multi-Agent Research API Proxy',
    backend: backendUrl,
    status: 'ready'
  });
}
=======
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
  
  return NextResponse.json({
    message: 'Multi-Agent Research API Proxy',
    backend: backendUrl,
    status: 'ready'
  });
}
>>>>>>> 993a735517a3a2acb9ff0fb6c5adcd2e58284f7c
