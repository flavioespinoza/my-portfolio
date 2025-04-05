'use client'

import { useEffect, useRef, useState } from 'react'
import MarkdownWithCode from '@/components/markdown-with-code'
import { useChatStore } from '@/store/chat-store'
import { Button, Textarea, useToast } from '@flavioespinoza/salsa-ui'
import { ChatCopyButton } from './components/chat-copy-button'
import { ChatFeedback } from './components/chat-feedback'
import { ChatSuggestions } from './components/chat-suggestions'

export default function ChatPage() {
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [sendOnEnterOnly, setSendOnEnterOnly] = useState(true)
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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (sendOnEnterOnly) {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				handleSubmit(e as unknown as React.FormEvent)
			}
		} else {
			if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				handleSubmit(e as unknown as React.FormEvent)
			}
		}
	}

	const handleSuggestionSelect = (text: string) => {
		setInput(text)
		inputRef.current?.focus()
		sendMessage(text)
		setTimeout(() => {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
		}, 10)
	}

	const isEmpty = messages.length === 0

	useEffect(() => {
		if (!isEmpty) {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	return (
		<main className="relative mx-auto max-w-xl p-4 pb-[180px]">
			{isEmpty ? (
				<div className="flex h-[80vh] flex-col items-center justify-center space-y-6">
					<div className="text-center text-lg text-zinc-500">How can I help you today?</div>
					<form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
						<Textarea
							ref={inputRef}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Say something..."
							rows={2}
							className="resize-y"
							disabled={isTyping}
						/>
						<div className="flex justify-end gap-2">
							<label className="mr-2">
								<input
									type="checkbox"
									checked={sendOnEnterOnly}
									onChange={() => setSendOnEnterOnly(!sendOnEnterOnly)}
									className="mr-2 mt-3"
								/>
								Send with Enter
							</label>
							<Button
								variant="default"
								className="bg-primary text-white"
								onClick={handleSubmit}
								disabled={isTyping || !input.trim()}
							>
								Send
							</Button>
						</div>
					</form>
				</div>
			) : (
				<>
					<div className="mb-4 flex items-center justify-between">
						<h1 className="text-2xl font-bold">💬 Chat</h1>
						<ChatSuggestions onSelect={handleSuggestionSelect} />
					</div>

					<div id="chat_bubbles" className="space-y-3">
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`animate-fade-in relative max-w-[80%] rounded-xl px-4 py-2 text-sm transition-all duration-200 ease-in-out ${
										msg.role === 'user' ? 'bg-blue-200 text-black' : 'bg-zinc-200 text-black'
									}`}
								>
									<p className="mb-1 text-xs text-muted-foreground">
										{msg.role === 'user' ? 'You' : 'AI'} ·{' '}
										{new Date(msg.createdAt).toLocaleTimeString()}
									</p>

									<div className="whitespace-normal [&>*]:mb-1 [&>*]:mt-1">
										<MarkdownWithCode markdown={msg.text} />
									</div>

									{msg.role === 'assistant' && (
										<div className="mt-3 flex items-center space-x-2">
											<ChatCopyButton text={msg.text} />
											<ChatFeedback index={idx} />
										</div>
									)}
								</div>
							</div>
						))}
						{isTyping && (
							<div className="text-sm italic text-muted-foreground">Flavio is typing…</div>
						)}
						<div ref={bottomRef} />
					</div>

					<form
						onSubmit={handleSubmit}
						className="fixed bottom-20 left-1/2 w-[calc(80%+80px)] max-w-[calc(640px+80px)] -translate-x-1/2 px-4"
					>
						<div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl">
							<Textarea
								ref={inputRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Ask anything"
								rows={2}
								className="resize-y"
								disabled={isTyping}
							/>
							<div className="flex justify-between">
								<div className="flex items-center gap-2 text-xs text-zinc-500">
									<Button variant="outline" type="button" onClick={clearMessages}>
										New Chat
									</Button>
								</div>
								<div className="flex gap-2">
									<label className="mr-2">
										<input
											type="checkbox"
											checked={sendOnEnterOnly}
											onChange={() => setSendOnEnterOnly(!sendOnEnterOnly)}
											className="mr-2 mt-3"
										/>
										Send with Enter
									</label>
									<Button
										variant="default"
										className="bg-primary text-white"
										onClick={handleSubmit}
										disabled={isTyping || !input.trim()}
									>
										Send
									</Button>
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</main>
	)
}
