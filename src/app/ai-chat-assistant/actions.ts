'use server'

import { z } from 'zod'

const messageSchema = z.object({
	role: z.enum(['user', 'assistant', 'system']),
	content: z.string()
})

const getReplySchema = z.array(messageSchema)

type ActionResult = { success: true; reply: string } | { success: false; error: string }

export async function getAiReply(messages: z.infer<typeof getReplySchema>): Promise<ActionResult> {
	const validationResult = getReplySchema.safeParse(messages)
	if (!validationResult.success) {
		console.error('Invalid input format:', validationResult.error)
		return { success: false, error: 'Invalid message format.' }
	}

	const apiKey = process.env.OPENAI_API_KEY
	if (!apiKey) {
		console.error('OpenAI API key is not configured.')
		return { success: false, error: 'Server configuration error.' }
	}

	try {
		const res = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: 'gpt-4o-2024-05-13',
				messages: validationResult.data,
				temperature: 0.7
			})
		})

		if (!res.ok) {
			const errorText = await res.text()
			console.error(`OpenAI API error (${res.status}):`, errorText)
			return { success: false, error: `OpenAI API request failed (Status: ${res.status})` }
		}

		const json = await res.json()
		const reply = json.choices?.[0]?.message?.content

		if (!reply) {
			console.error('No reply content found in OpenAI response:', json)
			return { success: false, error: 'Sorry, something went wrong receiving the reply.' }
		}

		return { success: true, reply }
	} catch (err: unknown) {
		console.error('Chat action error:', err)
		const errorMessage = err instanceof Error ? err.message : 'Action error: An unexpected server error occurred.'
		return { success: false, error: `Server error: ${errorMessage}` }
	}
}
