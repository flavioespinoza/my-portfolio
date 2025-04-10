import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Standardized Message Type (incorporating fields from both versions)
export type Message = {
	role: 'user' | 'assistant'
	text: string // Standardize on 'text'
	createdAt: string // Keep timestamp
	feedback?: 'up' | 'down' // Keep feedback
}

// Consolidated Store Interface
interface ChatState {
	messages: Message[]
	addMessage: (message: Message) => void
	setMessages: (messages: Message[]) => void // Keep setMessages (might be useful)
	clearMessages: () => void // Keep clearMessages
	updateMessageFeedback: (index: number, feedback: 'up' | 'down') => void // Keep feedback update
}

// Create the store using the consolidated interface and logic
export const useChatStore = create<ChatState>()(
	persist(
		// Keep persistence
		(set) => ({
			messages: [], // Initial state
			addMessage: (message) =>
				set((state) => ({
					messages: [...state.messages, message]
				})),
			// Keep setMessages (useful for potentially loading history)
			setMessages: (messages) => set({ messages }),
			// Keep clearMessages
			clearMessages: () => set({ messages: [] }),
			// Keep updateMessageFeedback
			updateMessageFeedback: (index, feedback) =>
				set((state) => {
					// Ensure immutability when updating
					const updatedMessages = state.messages.map((msg, i) => {
						if (i === index) {
							return { ...msg, feedback } // Create new object for the updated message
						}
						return msg
					})
					// Return the new array
					return { messages: updatedMessages }
				})
		}),
		{
			name: 'chat-messages' // Persistence key
			// Optional: Specify storage (default is localStorage)
			// storage: createJSONStorage(() => sessionStorage), // Example: use sessionStorage instead
		}
	)
)
