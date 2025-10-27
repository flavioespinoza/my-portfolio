'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogOverlay = DialogPrimitive.Overlay
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
export const DialogClose = DialogPrimitive.Close

type ContentProps = {
	title: string
	description?: string
	children?: React.ReactNode
	className?: string
}

export function DialogContent({ title, description, children, className }: ContentProps) {
	const closeRowClass = description ? 'row-start-2' : 'row-start-1'

	return (
		<DialogPortal>
			<DialogOverlay
				className={cn(
					'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
					'data-[state=open]:animate-in data-[state=closed]:animate-out',
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
					'motion-reduce:animate-none'
				)}
			/>
			<DialogPrimitive.Content
				className={cn(
					// Centered panel
					'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
					// Width: 100% mobile, 90% tablet, 80% desktop
					'w-[100vw] max-w-none md:w-[90vw] lg:w-[80vw]',
					// Layout/overflow
					'origin-center rounded-lg bg-background p-6 shadow-lg outline-none',
					'max-h-[90vh] overflow-y-auto',
					// Fade only (no directional slides)
					'data-[state=open]:animate-in data-[state=closed]:animate-out',
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
					'motion-reduce:animate-none',
					className
				)}
			>
				{/* Header */}
				<div className="mb-4">
					<div className="flex items-center justify-between gap-3">
						<DialogTitle className="text-lg font-semibold">{title}</DialogTitle>

						<DialogClose
							aria-label="Close"
							className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						>
							<X className="h-4 w-4" />
						</DialogClose>
					</div>

					{description && (
						<DialogDescription className="mt-1 text-sm text-muted-foreground">
							{description}
						</DialogDescription>
					)}
				</div>

				<div>{children}</div>
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}
