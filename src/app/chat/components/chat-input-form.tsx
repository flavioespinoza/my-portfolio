import React, { useRef, useState } from 'react'
import { useChatStore } from '@/store/chat-store'
// Assuming consolidated store
import { Button, Checkbox, Textarea } from '@flavioespinoza/salsa-ui'
import { getAiReply } from '../actions'

interface ChatInputFormProps {
	isTyping: boolean
	setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
	// If using fetch (less recommended):
	// onSubmit: (text: string) => Promise<void>;
	// Or if directly calling Server Action:
	addMessage: (message: { role: 'user' | 'assistant'; text: string; createdAt: string }) => void // Pass addMessage down
}

export function ChatInputForm({ isTyping, setIsTyping, addMessage }: ChatInputFormProps) {
	const { messages, clearMessages } = useChatStore() // Need clearMessages
	const [input, setInput] = useState('')
	const [sendOnEnterOnly, setSendOnEnterOnly] = useState(true)
	const inputRef = useRef<HTMLTextAreaElement>(null)

	// If using Server Action, handle submission here
	const handleSubmitAction = async (e: React.FormEvent) => {
		e.preventDefault()
		const text = input.trim()
		if (!text || isTyping) return

		setIsTyping(true)
		setInput('') // Clear input immediately
		const userMessage = { role: 'user' as const, text, createdAt: new Date().toISOString() }
		addMessage(userMessage) // Add user message to the store

		// Prepare messages for API
		const messagesForApi = [
			...messages.map((m) => ({ role: m.role, content: m.text })), // Make sure format matches action input
			{ role: userMessage.role, content: userMessage.text }
		]

		// Call Server Action directly (assuming it's imported)
		// const result = await getAiReply(messagesForApi);
		// Fake delay for demonstration if action isn't imported
		await new Promise((resolve) => setTimeout(resolve, 1000))
		const result = { success: true, reply: `You said: ${text}` } // Placeholder

		if (result.success) {
			addMessage({
				role: 'assistant',
				text: result.reply,
				createdAt: new Date().toISOString()
			})
		} else {
			// Handle error (e.g., using toast)
			console.error('Action failed:', 'Error')
			// Maybe add user message back to input or show error indicator
		}
		setIsTyping(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (sendOnEnterOnly) {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				handleSubmitAction(e as unknown as React.FormEvent)
			}
		} else {
			if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault()
				handleSubmitAction(e as unknown as React.FormEvent)
			}
		}
	}

	// Reusable Button Send component (internal or imported)
	const ButtonSend = () => (
		<>
			<Checkbox
				id="sendOnEnter"
				className={`mr-1 mt-3 bg-hotpink-200 ${sendOnEnterOnly ? 'bg-hotpink-400' : 'bg-sage-200'} text-white`}
				checked={sendOnEnterOnly}
				onCheckedChange={() => setSendOnEnterOnly(!sendOnEnterOnly)}
			/>
			<label className="mr-2 mt-2 text-xs" htmlFor="sendOnEnter">
				{' '}
				Send w/ Enter
			</label>
			<Button type="submit" variant="default" disabled={isTyping || !input.trim()}>
				Send
			</Button>
		</>
	)

	return (
		<form
			onSubmit={handleSubmitAction}
			className="w-full max-w-[calc(640px+2rem)] px-4"
		>
			<div className="space-y-3 rounded-xl border border-zinc-100 bg-white p-4 shadow-xl">
				<Textarea
					ref={inputRef}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ask anything"
					rows={2}
					className="resize-y border border-solid border-zinc-300 bg-cblue-300 text-black" // Styles from original
					disabled={isTyping}
				/>
				<div className="flex items-center justify-between">
					{' '}
					{/* Use items-center */}
					<Button
						variant="outline"
						type="button"
						onClick={clearMessages} // Call clearMessages from store
						className="hover:bg-cblue-500/60" // Style from original
					>
						New Chat
					</Button>
					<div className="flex items-center gap-2">
						{' '}
						{/* Use items-center */}
						<ButtonSend />
					</div>
				</div>
			</div>
		</form>
	)
}
