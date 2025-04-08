'use client'

import { useEffect, useRef, useState } from 'react'
import MarkdownWithCode from '@/components/markdown-with-code'
import { useChatStore } from '@/store/chat-store'
import { Button, Card, Checkbox, Textarea, toast } from '@flavioespinoza/salsa-ui'
import { ChatCopyButton } from './components/chat-copy-button'
import { ChatFeedback } from './components/chat-feedback'

export default function ChatPage() {
	const { messages, addMessage, clearMessages } = useChatStore()
	const [input, setInput] = useState('')
	const [isTyping, setIsTyping] = useState(false)
	const [sendOnEnterOnly, setSendOnEnterOnly] = useState(true)
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const bottomRef = useRef<HTMLDivElement>(null)

	const sendMessage = async (text: string) => {
		if (!text.trim() || isTyping) return
		setIsTyping(true)
		setInput('')
		addMessage({ role: 'user', text, createdAt: new Date().toISOString() })

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

	const isEmpty = messages.length === 0

	useEffect(() => {
		if (!isEmpty) {
			bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	const ButtonSend = () => {
		return (
			<>
				<Checkbox
					id="sendOnEnter"
					className={`mr-1 mt-3 bg-hotpink-200 ${sendOnEnterOnly ? 'bg-hotpink-400' : 'bg-sage-200'} text-white`}
					checked={sendOnEnterOnly}
					onCheckedChange={() => setSendOnEnterOnly(!sendOnEnterOnly)}
				/>
				<label className="mr-2 mt-2" htmlFor="sendOnEnter">
					Send with Enter
				</label>
				<Button variant="default" onClick={handleSubmit} disabled={isTyping || !input.trim()}>
					Send
				</Button>
			</>
		)
	}

	return (
		<main className="relative mx-auto max-w-xl p-4 pb-[180px]">
			{isEmpty ? (
				<div className="flex h-[80vh] flex-col items-center justify-center space-y-6">
					<div className="text-center text-lg text-zinc-500">How can I help you today?</div>
					<div className="w-full space-y-3 rounded-xl border border-zinc-100 bg-white p-4 shadow-xl md:w-[688px]">
						<form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
							<Textarea
								ref={inputRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Ask anything"
								rows={2}
								className="resize-y border border-solid border-zinc-300 bg-cblue-300 text-black"
								disabled={isTyping}
							/>
							<div className="flex justify-end gap-2">
								<ButtonSend />
							</div>
						</form>
					</div>
				</div>
			) : (
				<>
					<div id="chat_bubbles" className="space-y-3">
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`animate-fade-in relative max-w-[80%] rounded-xl px-4 py-2 text-sm text-black transition-all duration-200 ease-in-out ${
										msg.role === 'user'
											? 'border border-solid border-zinc-300 bg-cblue-300'
											: 'bg-sage-200'
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
						{isTyping && <div className="text-sm italic text-muted-foreground">AI is typing…</div>}
						<div ref={bottomRef} />
					</div>

					<form
						onSubmit={handleSubmit}
						className="fixed bottom-16 left-1/2 w-[calc(80%+80px)] max-w-[calc(640px+80px)] -translate-x-1/2 px-4"
					>
						<div className="space-y-3 rounded-xl border border-zinc-100 bg-white p-4 shadow-xl">
							<Textarea
								ref={inputRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder="Ask anything"
								rows={2}
								className="resize-y border border-solid border-zinc-300 bg-cblue-300 text-black"
							/>
							<div className="flex justify-between">
								<div className="flex items-center gap-2 text-xs text-zinc-500">
									<Button
										variant="outline"
										type="button"
										onClick={clearMessages}
										className="hover:bg-cblue-500/60"
									>
										New Chat
									</Button>
								</div>
								<div className="flex gap-2">
									<ButtonSend />
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</main>
	)
}
