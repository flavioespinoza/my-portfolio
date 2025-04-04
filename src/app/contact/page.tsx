'use client'

import { useState } from 'react'
import { Button, Input, Textarea } from '@flavioespinoza/salsa-ui'

export default function ContactPage() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [calendlyUrl] = useState(
		'https://calendly.com/flavio-espinoza/chat-with-flavio?preview_source=et_card'
	)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Get form data including hidden honeypot field
		const formData = new FormData(e.currentTarget)
		const honeypotValue = formData.get('website')

		// Check honeypot field
		if (honeypotValue) {
			console.log('Bot submission detected')
			setStatus('error')
			return
		}

		setStatus('loading')

		try {
			const res = await fetch('https://formspree.io/f/mldjwpen', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, message })
			})

			if (res.ok) {
				setStatus('success')
				setEmail('')
				setMessage('')
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	const testBotSubmission = () => {
		const form = document.querySelector('form')
		if (!form) {
			console.error('❌ Form not found')
			return
		}

		console.log('🛠️ Starting bot simulation...')

		// Fill all inputs including honeypot
		const inputs = form.querySelectorAll('input, textarea')
		inputs.forEach((input) => {
			;(input as HTMLInputElement).value = 'bot test value'
			console.log(`✏️ Filled ${input.getAttribute('name') || 'unnamed field'} with test value`)
		})

		// Submit the form
		console.log('🤖 Submitting form...')
		const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
		form.dispatchEvent(submitEvent)

		console.log('✅ Bot simulation complete. Form should show error state.')
	}

	// Expose to window for testing in development only
	if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
		;(window as any).testBotSubmission = testBotSubmission
	}

	return (
		<main className="mx-auto max-w-2xl space-y-8 p-6">
			<h1 className="text-3xl font-bold">Get in Touch</h1>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">📧 Send Me an Email</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						type="email"
						name="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Textarea
						name="message"
						placeholder="Your message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					/>
					{/* Honeypot field - hidden from users but visible to bots */}
					<div className="absolute left-[-9999px]" aria-hidden="true">
						<Input type="text" name="website" tabIndex={-1} autoComplete="off" />
					</div>
					<Button type="submit" disabled={status === 'loading'}>
						{status === 'loading' ? 'Sending...' : 'Send Message'}
					</Button>
					{status === 'success' && (
						<p className="text-green-600 text-sm">Message sent successfully!</p>
					)}
					{status === 'error' && (
						<p className="text-sm text-red-600">Failed to send. Please try again.</p>
					)}
					{process.env.NEXT_PUBLIC_DEV_ONLY === 'true' && (
						<div className="mt-6 rounded-lg border bg-yellow-50 p-4">
							<h3 className="mb-2 font-medium text-yellow-800">Developer Tools</h3>
							<Button
								type="button"
								variant="outline"
								onClick={testBotSubmission}
								className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
							>
								Test Bot Submission
							</Button>
							<p className="mt-2 text-sm text-yellow-700">
								Click to simulate a bot filling all fields (including honeypot)
							</p>
						</div>
					)}
				</form>
			</div>

			<div className="relative flex items-center py-4">
				<div className="flex-grow border-t border-cement"></div>
				<span className="mx-4 text-xl font-semibold text-charcoal">or</span>
				<div className="flex-grow border-t border-cement"></div>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">📅 Let’s Chat – Pick a Time</h2>
				<iframe
					src={calendlyUrl}
					height="900"
					className="w-full max-w-full rounded border"
				></iframe>
			</div>
		</main>
	)
}
