import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { messages } = await req.json()

	try {
		const res = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages,
				temperature: 0.7
			})
		})

		if (!res.ok) {
			const error = await res.text()
			console.error('OpenAI API error:', error)
			return NextResponse.json({ error: 'OpenAI API request failed' }, { status: 500 })
		}

		const json = await res.json()
		const reply = json.choices?.[0]?.message?.content || 'Sorry, something went wrong.'
		return NextResponse.json({ reply })
	} catch (err) {
		console.error('Chat error:', err)
		return NextResponse.json({ error: 'Server error' }, { status: 500 })
	}
}
