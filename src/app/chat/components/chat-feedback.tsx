'use client'

import { useChatStore } from '@/store/chat-store'
import { Button } from '@flavioespinoza/salsa-ui'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

interface ChatFeedbackProps {
	index: number
}

export function ChatFeedback({ index }: ChatFeedbackProps) {
	const { messages, updateMessageFeedback } = useChatStore()
	const feedback = messages[index]?.feedback || null

	return (
		<div className="flex items-center space-x-1">
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={() => updateMessageFeedback(index, 'up')}
				className="h-6 w-6 p-1"
			>
				<ThumbsUp
					className={`h-4 w-4 ${feedback === 'up' ? 'fill-black text-black' : 'text-black'}`}
				/>
			</Button>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={() => updateMessageFeedback(index, 'down')}
				className="h-6 w-6 p-1"
			>
				<ThumbsDown
					className={`h-4 w-4 ${feedback === 'down' ? 'fill-black text-black' : 'text-black'}`}
				/>
			</Button>
		</div>
	)
}
