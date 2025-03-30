import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ChatMessage = {
	role: 'user' | 'assistant'
	text: string
	createdAt: string
}

interface ChatState {
	messages: ChatMessage[]
	addMessage: (msg: ChatMessage) => void
	clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
	persist(
		(set) => ({
			messages: [],
			addMessage: (msg) =>
				set((state) => ({ messages: [...state.messages, msg] })),
			clearMessages: () => set({ messages: [] })
		}),
		{ name: 'chat-storage' }
	)
)
