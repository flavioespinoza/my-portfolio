'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [calendlyUrl] = useState(
		'https://calendly.com/flavio-espinoza/chat-with-flavio?preview_source=et_card'
	)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
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

	return (
		<main className="mx-auto max-w-2xl space-y-8 p-6">
			<h1 className="text-3xl font-bold">Get in Touch</h1>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">📅 Book a Time</h2>
				<iframe
					src={calendlyUrl}
					height="900"
					className="w-full max-w-full rounded border"
				></iframe>
			</div>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold">📧 Send an Email</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						type="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Textarea
						placeholder="Your message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					/>
					<Button type="submit" disabled={status === 'loading'}>
						{status === 'loading' ? 'Sending...' : 'Send Message'}
					</Button>
					{status === 'success' && (
						<p className="text-green-600 text-sm">Message sent successfully!</p>
					)}
					{status === 'error' && (
						<p className="text-red-600 text-sm">Failed to send. Please try again.</p>
					)}
				</form>
			</div>
		</main>
	)
}
