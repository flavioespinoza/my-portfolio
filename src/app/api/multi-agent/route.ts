import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
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
}

export async function GET() {
	const backendUrl =
		process.env.NEXT_PUBLIC_BACKEND_URL || process.env.PYTHON_BACKEND_URL || 'http://localhost:8000'

	return NextResponse.json({
		message: 'Multi-Agent Research API Proxy',
		backend: backendUrl,
		status: 'ready'
	})
}
