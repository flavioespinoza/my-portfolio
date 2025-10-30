'use client'

import { useRef, useState, useTransition } from 'react'
import { Button, Input, Textarea } from '@flavioespinoza/salsa-ui'
import { submitContactForm } from './actions'

export default function ContactPage() {
	const [formStatus, setFormStatus] = useState<{
		status: 'idle' | 'success' | 'error'
		message: string | null
	}>({ status: 'idle', message: null })
	const [isPending, startTransition] = useTransition()
	const formRef = useRef<HTMLFormElement>(null)
	const CALENDLY_URL = 'https://calendly.com/flavio-espinoza/45-with-flavio'

	const handleFormSubmit = async (formData: FormData) => {
		setFormStatus({ status: 'idle', message: null })

		startTransition(async () => {
			const result = await submitContactForm(formData)

			if (result.success) {
				setFormStatus({ status: 'success', message: result.message })
				formRef.current?.reset()
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

		const inputs = form.querySelectorAll('input, textarea')
		inputs.forEach((input) => {
			;(input as HTMLInputElement).value = 'bot test value'
			console.log(`✏️ Filled ${input.getAttribute('name') || 'unnamed field'} with test value`)
		})

		const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
		form.dispatchEvent(submitEvent)
	}

	if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
		;(window as any).testBotSubmission = testBotSubmission
	}

	return (
		<main className="mx-auto max-w-2xl space-y-8 p-6 text-white">
			<h1 className="text-3xl font-bold">Let's have a chat</h1>

			<div className="space-y-2">
				<h2 className="text-1xl">Schedule a time for us to talk.</h2>
				<iframe
					src={CALENDLY_URL}
					height="900"
					className="w-full max-w-full rounded border"
				></iframe>
			</div>
		</main>
	)
}
