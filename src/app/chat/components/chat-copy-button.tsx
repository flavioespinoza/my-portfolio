'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@flavioespinoza/salsa-ui'

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
			className="p-1 h-auto w-auto flex items-center text-xs text-muted-foreground"
		>
			<Copy className="h-4 w-4 mr-1" />
			{copied ? 'Copied' : 'Copy'}
		</Button>
	)
}
