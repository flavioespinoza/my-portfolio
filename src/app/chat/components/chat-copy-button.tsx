'use client'

import { useState } from 'react'
import { Button, Tooltip } from '@flavioespinoza/salsa-ui'
import { Check, Copy } from 'lucide-react'
// import { Tooltip } from '@/components/ui/tooltip'

interface ChatCopyButtonProps {
	text: string
}

export function ChatCopyButton({ text }: ChatCopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(text)
		setCopied(true)
		setTimeout(() => setCopied(false), 1500)
	}

	return (
		<Button
			type="button"
			variant="ghost"
			onClick={handleCopy}
			className="flex h-auto w-auto items-center p-1 text-xs text-muted-foreground"
		>
			{copied ? (
				<Check className="h-4 w-4" />
			) : (
				<Tooltip content="Copy">
					<Copy className="h-4 w-4" />
				</Tooltip>
			)}
		</Button>
	)
}
