'use client'

import { useState } from 'react'
import { useChatStore } from '@/store/chat-store'
import { ChatInputForm } from './components/chat-input-form'
import { MessageList } from './components/message-list'

export default function ChatPage() {
	const { messages, addMessage } = useChatStore()
	const [isTyping, setIsTyping] = useState(false)

	const isEmpty = messages.length === 0

	return (
		<main
			className={`relative mx-auto flex max-w-xl flex-col px-4 pt-4 ${
				isEmpty ? 'min-h-[calc(100vh-150px)] items-center justify-center' : 'pb-[120px]'
			}`}
		>
			{isEmpty ? (
				<div className="mb-6 text-center text-lg text-white">How can I help you today?</div>
			) : (
				<MessageList isTyping={isTyping} />
			)}

			{isEmpty ? (
				<ChatInputForm isTyping={isTyping} setIsTyping={setIsTyping} addMessage={addMessage} />
			) : (
				<div className="fixed bottom-4 left-1/2 w-full -translate-x-1/2 transform sm:bottom-8">
					<div className="mx-auto flex justify-center">
						<ChatInputForm isTyping={isTyping} setIsTyping={setIsTyping} addMessage={addMessage} />
					</div>
				</div>
			)}
		</main>
	)
}
