import { useEffect, useRef } from 'react'
import MarkdownWithCode from '@/components/markdown-with-code'
import { Message, useChatStore } from '@/store/chat-store'
import { ChatCopyButton } from './chat-copy-button'
import { ChatFeedback } from './chat-feedback'

interface MessageListProps {
	isTyping: boolean
}

export function MessageList({ isTyping }: MessageListProps) {
	const { messages } = useChatStore()
	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	return (
		<div id="chat_bubbles" className="space-y-3">
			{messages.map((msg, idx) => (
				<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
					<div
						className={`animate-fade-in relative max-w-[80%] rounded-xl px-4 py-2 text-sm text-black transition-all duration-200 ease-in-out ${
							msg.role === 'user'
								? 'border border-solid border-zinc-300 bg-cblue-300'
								: 'bg-sage-200'
						}`}
					>
						<p className="mb-1 text-xs text-muted-foreground">
							{msg.role === 'user' ? 'You' : 'AI'} · {new Date(msg.createdAt).toLocaleTimeString()}
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
	)
}
