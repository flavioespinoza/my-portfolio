import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Message = {
	role: 'user' | 'assistant'
	text: string
	createdAt: string
	feedback?: 'up' | 'down'
}

interface ChatState {
	messages: Message[]
	addMessage: (message: Message) => void
	setMessages: (messages: Message[]) => void
	clearMessages: () => void
	updateMessageFeedback: (index: number, feedback: 'up' | 'down') => void
}

export const useChatStore = create<ChatState>()(
	persist(
		(set) => ({
			messages: [],
			addMessage: (message) =>
				set((state) => ({
					messages: [...state.messages, message]
				})),
			setMessages: (messages) => set({ messages }),
			clearMessages: () => set({ messages: [] }),
			updateMessageFeedback: (index, feedback) =>
				set((state) => {
					const updatedMessages = state.messages.map((msg, i) => {
						if (i === index) {
							return { ...msg, feedback }
						}
						return msg
					})
					return { messages: updatedMessages }
				})
		}),
		{
			name: 'chat-messages'
		}
	)
)
