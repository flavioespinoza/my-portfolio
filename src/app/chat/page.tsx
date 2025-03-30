'use client'

import { useState } from 'react'
import { useChatStore } from '@/store/chat-store'
import { Button, Input, useToast } from '@flavioespinoza/salsa-ui'

export default function ChatPage() {
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const { messages, addMessage, clearMessages } = useChatStore()
	const { toast } = useToast()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const text = input.trim()
		if (!text) return

		const userMsg = {
			role: 'user',
			text,
			createdAt: new Date().toISOString()
		} as const

		addMessage(userMsg)
		setInput('')
		setIsTyping(true)

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: [
						...messages.map((m) => ({ role: m.role, content: m.text })),
						{ role: 'user', content: text }
					]
				})
			})

			const json = await res.json()
			if (res.ok) {
				addMessage({
					role: 'assistant',
					text: json.reply,
					createdAt: new Date().toISOString()
				})
			} else {
				toast({
					variant: 'destructive',
					title: 'Chat error',
					description: json.error || 'Failed to fetch reply.'
				})
			}
		} catch (err: any) {
			toast({
				variant: 'destructive',
				title: 'Network error',
				description: err.message || 'Failed to fetch reply.'
			})
		} finally {
			setIsTyping(false)
		}
	}

	return (
		<main className="mx-auto max-w-xl p-4 space-y-6">
			<h1 className="text-2xl font-bold">💬 Chat</h1>
			<form onSubmit={handleSubmit} className="flex items-center gap-2">
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Say something..."
				/>
				<Button type="submit" disabled={isTyping}>
					Send
				</Button>
			</form>

			<div className="space-y-3">
				{messages.map((msg, idx) => (
					<div
						key={idx}
						className={`whitespace-pre-wrap rounded px-3 py-2 text-sm ${
							msg.role === 'user'
								? 'bg-blue-100 dark:bg-blue-900'
								: 'bg-zinc-200 dark:bg-zinc-800'
						}`}
					>
						<p className="text-muted-foreground mb-1 text-xs">
							{msg.role === 'user' ? 'You' : 'AI'} ·{' '}
							{new Date(msg.createdAt).toLocaleTimeString()}
						</p>
						{msg.text}
					</div>
				))}
				{isTyping && (
					<div className="italic text-sm text-muted-foreground">Flavio is typing…</div>
				)}
			</div>

			{messages.length > 0 && (
				<Button variant="outline" onClick={clearMessages}>
					Clear chat
				</Button>
			)}
		</main>
	)
}
