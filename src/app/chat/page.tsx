'use client'

import { useEffect, useRef, useState } from 'react'
import { useChatStore } from '@/store/chat-store'
import { Button, Textarea, useToast } from '@flavioespinoza/salsa-ui'
import { ChatSuggestions } from './components/chat-suggestions'
import { ChatCopyButton } from './components/chat-copy-button'
import { ChatFeedback } from './components/chat-feedback'
import { marked } from 'marked'

export default function ChatPage() {
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const { messages, addMessage, clearMessages } = useChatStore()
	const { toast } = useToast()
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const bottomRef = useRef<HTMLDivElement>(null)

	const sendMessage = async (text: string) => {
		if (!text.trim()) return

		const userMsg = {
			role: 'user',
			text: text.trim(),
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		sendMessage(input)
	}

	const handleSuggestionSelect = (text: string) => {
		setInput(text)
		inputRef.current?.focus()
		sendMessage(text)
		setTimeout(() => {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 10)
	}

	return (
		<main className="mx-auto max-w-xl p-4 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">💬 Chat</h1>
				<ChatSuggestions onSelect={handleSuggestionSelect} />
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<Textarea
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Say something..."
					rows={2}
					className="resize-y"
					disabled={isTyping}
				/>
				<Button type="submit" disabled={isTyping || !input.trim()}>
					Send
				</Button>
			</form>

			<div className="space-y-3">
				{messages.map((msg, idx) => (
					<div
						key={idx}
						className={`relative rounded px-3 py-2 pr-10 text-sm whitespace-pre-wrap transition-all duration-200 ease-in-out animate-fade-in ${
							msg.role === 'user'
								? 'bg-blue-100 dark:bg-blue-900'
								: 'bg-zinc-200 dark:bg-zinc-800'
						}`}
					>
						<p className="text-muted-foreground mb-1 text-xs">
							{msg.role === 'user' ? 'You' : 'AI'} ·{' '}
							{new Date(msg.createdAt).toLocaleTimeString()}
						</p>

						{msg.role === 'assistant' ? (
							<div
								className="markdown"
								dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
							/>
						) : (
							msg.text
						)}

						{msg.role === 'assistant' && (
							<div className="mt-3 flex items-center space-x-2">
								<ChatCopyButton text={msg.text} />
								<ChatFeedback index={idx} />
							</div>
						)}
					</div>
				))}
				{isTyping && (
					<div className="italic text-sm text-muted-foreground">Flavio is typing…</div>
				)}
				<div ref={bottomRef} />
			</div>

			{messages.length > 0 && (
				<Button variant="outline" onClick={clearMessages}>
					Clear chat
				</Button>
			)}
		</main>
	)
}
