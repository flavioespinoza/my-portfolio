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
			clearMessages: () => set({ messages: [] }),
			updateMessageFeedback: (index, feedback) =>
				set((state) => {
					const updated = [...state.messages]
					if (updated[index]) updated[index].feedback = feedback
					return { messages: updated }
				})
		}),
		{
			name: 'chat-messages'
		}
	)
)
