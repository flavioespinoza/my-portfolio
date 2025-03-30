'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ChatSuggestionsProps {
	onSelect: (text: string) => void
}

const suggestions = [
	'What are the main differences between Server Components and Client Components in Next.js?',
	'Can you explain how Tailwind CSS handles responsive design?',
	'How does Zustand compare to Redux for managing state?',
	'Give me tips for optimizing performance in a React app.',
	'What is Suspense in React and how can I use it effectively?'
]

export function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
	const [isOpen, setIsOpen] = useState(false)
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className="relative" ref={wrapperRef}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex items-center space-x-1 text-sm font-medium hover:underline"
			>
				<span>Here’s a series of questions to get you started</span>
				{isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-[360px] rounded-md border bg-white shadow-lg dark:bg-zinc-900 z-50">
					<ul className="p-2 space-y-1 text-sm">
						{suggestions.map((text, index) => (
							<li
								key={index}
								onClick={() => {
									onSelect(text)
									setIsOpen(false)
								}}
								className="cursor-pointer rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
							>
								{text}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
