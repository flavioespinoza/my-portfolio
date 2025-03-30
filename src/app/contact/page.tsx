'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import dayjs from 'dayjs'

export default function ContactPage() {
	const [formData, setFormData] = useState({ name: '', email: '', message: '' })
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const devOnly = process.env.NEXT_PUBLIC_DEV_ONLY === 'true'

	useEffect(() => {
		if (devOnly) {
			setFormData({
				name: `Flavio Espinoza ${dayjs().format('ddd MMM D hh:mma').toUpperCase()}`,
				email: 'flavio.espinoza@gmail.com',
				message: 'Hello from Flavio Espinoza!'
			})
		}
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus('loading')

		try {
			const res = await fetch('https://formspree.io/f/mldjwpen', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			})

			if (res.ok) {
				setStatus('success')
				setFormData({ name: '', email: '', message: '' })
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	return (
		<div className="mx-auto max-w-xl space-y-6 p-6">
			<h1 className="text-2xl font-bold">Contact Me</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					required
					name="name"
					placeholder="Your name"
					value={formData.name}
					onChange={handleChange}
				/>
				<Input
					required
					name="email"
					type="email"
					placeholder="Your email"
					value={formData.email}
					onChange={handleChange}
				/>
				<Textarea
					required
					name="message"
					placeholder="Your message"
					value={formData.message}
					onChange={handleChange}
				/>
				<Button variant="outline" type="submit" disabled={status === 'loading'}>
					{status === 'loading' ? 'Sending...' : 'Send Message'}
				</Button>
				{status === 'success' && (
					<p className="text-sm text-green-600">Your message has been sent!</p>
				)}
				{status === 'error' && (
					<p className="text-sm text-red-600">Something went wrong. Try again.</p>
				)}
			</form>
		</div>
	)
}
