// File: src/app/contact/page.tsx
'use client'

import { useRef, useState, useTransition } from 'react'
// Added useRef and useTransition
import { Button, Input, Textarea } from '@flavioespinoza/salsa-ui'
// Assuming salsa-ui is used
import { submitContactForm } from './actions'

// File: src/app/contact/page.tsx

// Import the Server Action

export default function ContactPage() {
	// Remove useState for email and message if solely relying on FormData
	// const [email, setEmail] = useState('')
	// const [message, setMessage] = useState('')
	const [formStatus, setFormStatus] = useState<{
		status: 'idle' | 'success' | 'error'
		message: string | null
	}>({ status: 'idle', message: null })
	const [isPending, startTransition] = useTransition() // For loading state without blocking UI
	const formRef = useRef<HTMLFormElement>(null) // Ref to reset the form

	const handleFormSubmit = async (formData: FormData) => {
		// Reset previous status messages
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

	// ... (keep calendlyUrl, testBotSubmission if needed)

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
					<Textarea
						className="bg-cblue-200" // Keep styling as needed
						name="message" // Name attribute is crucial for FormData
						placeholder="Your message"
						// Remove value and onChange if using FormData directly
						// value={message}
						// onChange={(e) => setMessage(e.target.value)}
						required
					/>
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

					{/* Keep dev tools if needed */}
					{/* ... */}
				</form>
			</div>

			{/* ... (keep Calendly iframe section) ... */}
		</main>
	)
}
