'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export function DialogContent({
	title,
	description,
	children
}: {
	title: string
	description?: string
	children?: React.ReactNode
}) {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
			<DialogPrimitive.Content className="bg-background fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg outline-none">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold">{title}</h2>
					<DialogPrimitive.Close className="text-muted-foreground hover:text-foreground">
						<X className="h-4 w-4" />
					</DialogPrimitive.Close>
				</div>
				{description && <p className="text-muted-foreground mb-2 text-sm">{description}</p>}
				<div>{children}</div>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	)
}
