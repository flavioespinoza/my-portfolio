// File: src/components/ui/dialog.tsx
'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogOverlay = DialogPrimitive.Overlay
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

type ContentProps = {
  title: string
  description?: string
  hideTitleVisually?: boolean
  children?: React.ReactNode
  className?: string
}

export function DialogContent({
  title,
  description,
  hideTitleVisually = false,
  children,
  className
}: ContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg outline-none',
          className
        )}
      >
        {hideTitleVisually ? (
          <VisuallyHidden asChild>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        ) : (
          <DialogTitle className="mb-2 text-lg font-semibold">{title}</DialogTitle>
        )}

        {description && (
          <DialogDescription className="mb-3 text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        )}

        <div>{children}</div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
