'use client'

import { useRef, useState, useTransition } from 'react'
import { Button, Input, Textarea } from '@flavioespinoza/salsa-ui'
import { submitContactForm } from './actions'

export default function ContactPage() {
	const [formStatus, setFormStatus] = useState<{
		status: 'idle' | 'success' | 'error'
		message: string | null
	}>({ status: 'idle', message: null })
	const [isPending, startTransition] = useTransition() // For loading state without blocking UI
	const formRef = useRef<HTMLFormElement>(null) // Ref to reset the form
	const CALENDLY_URL = 'https://calendly.com/flavioespinoza'

	const handleFormSubmit = async (formData: FormData) => {
		setFormStatus({ status: 'idle', message: null })

		startTransition(async () => {
			// Wrap action call in startTransition
			const result = await submitContactForm(formData)

			if (result.success) {
				setFormStatus({ status: 'success', message: result.message })
				formRef.current?.reset() // Reset form fields on success
			} else {
				setFormStatus({ status: 'error', message: result.error })
			}
		})
	}

	const testBotSubmission = () => {
		const form = document.querySelector('form')
		if (!form) {
			console.error('❌ Form not found')
			return
		}

		// Fill all inputs including honeypot
		const inputs = form.querySelectorAll('input, textarea')
		inputs.forEach((input) => {
			;(input as HTMLInputElement).value = 'bot test value'
			console.log(`✏️ Filled ${input.getAttribute('name') || 'unnamed field'} with test value`)
		})

		// Submit the form
		const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
		form.dispatchEvent(submitEvent)
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
				{/* Use the action directly on the form */}
				<form ref={formRef} action={handleFormSubmit} className="space-y-4">
					<Input
						className="bg-cblue-200" // Keep styling as needed
						type="email"
						name="email" // Name attribute is crucial for FormData
						placeholder="Your email"
						// Remove value and onChange if using FormData directly
						// value={email}
						// onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Textarea className="bg-cblue-200" name="message" placeholder="Your message" required />
					{/* Honeypot field - still useful */}
					<div className="absolute left-[-9999px]" aria-hidden="true">
						<Input type="text" name="website" tabIndex={-1} autoComplete="off" />
					</div>
					<Button type="submit" disabled={isPending}>
						{' '}
						{/* Disable button based on isPending */}
						{isPending ? 'Sending...' : 'Send Message'}
					</Button>
					{/* Display status messages */}
					{formStatus.message && (
						<p
							className={`text-sm ${formStatus.status === 'success' ? 'text-green-600' : 'text-red-600'}`}
						>
							{formStatus.message}
						</p>
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
					src={CALENDLY_URL}
					height="900"
					className="w-full max-w-full rounded border"
				></iframe>
			</div>
		</main>
	)
}
