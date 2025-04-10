'use server'

import { z } from 'zod'

// Define the expected shape of a message (matching OpenAI's format)
const messageSchema = z.object({
	role: z.enum(['user', 'assistant', 'system']), // Add 'system' if you use it
	content: z.string()
})

// Define the input schema for the action
const getReplySchema = z.array(messageSchema)

// Define a return type for success/error handling
type ActionResult = { success: true; reply: string } | { success: false; error: string }

export async function getAiReply(messages: z.infer<typeof getReplySchema>): Promise<ActionResult> {
	// Validate input - ensures messages array is correctly structured
	const validationResult = getReplySchema.safeParse(messages)
	if (!validationResult.success) {
		console.error('Invalid input format:', validationResult.error)
		return { success: false, error: 'Invalid message format.' }
	}

	// Ensure API key is available
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
				messages: validationResult.data, // Use validated data
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

		return { success: true, reply } // Return success object
	} catch (err: unknown) {
		// Catch unknown for better type safety
		console.error('Chat action error:', err)
		// Avoid leaking detailed error messages to the client
		const errorMessage = err instanceof Error ? err.message : 'An unexpected server error occurred.'
		return { success: false, error: `Server error: ${errorMessage}` } // Return error object
	}
}
