'use server'

import { z } from 'zod'

const contactFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address.' }),
	message: z.string().min(5, { message: 'Message must be at least 5 characters long.' }),
	website: z.string().optional()
})

type FormActionResult = { success: true; message: string } | { success: false; error: string }

export async function submitContactForm(formData: FormData): Promise<FormActionResult> {
	const parsed = contactFormSchema.safeParse({
		email: formData.get('email'),
		message: formData.get('message'),
		website: formData.get('website')
	})

	if (!parsed.success) {
		const errorMessages = parsed.error.errors
			.map((e) => `${e.path.join('.')}: ${e.message}`)
			.join(', ')
		return { success: false, error: `Invalid form data: ${errorMessages}` }
	}

	if (parsed.data.website) {
		console.log('Bot submission detected (server-side).')
		return { success: false, error: 'There was an issue submitting the form.' }
	}

	const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT

	if (!formspreeEndpoint) {
		console.error('Formspree endpoint is not configured.')
		return { success: false, error: 'Server configuration error.' }
	}

	try {
		const res = await fetch(formspreeEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ email: parsed.data.email, message: parsed.data.message })
		})

		if (res.ok) {
			return { success: true, message: 'Message sent successfully!' }
		} else {
			const errorData = await res.json().catch(() => ({}))
			console.error(`Formspree submission failed (${res.status}):`, errorData)
			return {
				success: false,
				error: `Failed to send message (Status: ${res.status}). Please try again.`
			}
		}
	} catch (err) {
		console.error('Error submitting to Formspree:', err)
		return { success: false, error: 'An unexpected error occurred while sending the message.' }
	}
}
