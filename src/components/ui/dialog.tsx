// File: src/components/ui/dialog.tsx
'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from '@/lib/utils'
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
  // If there is a description, align the X with its baseline row; otherwise align with title row.
  const closeRowClass = description ? 'row-start-2' : 'row-start-1'

  return (
    <DialogPortal>
      <DialogOverlay
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm'
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'rounded-lg bg-background p-6 shadow-lg outline-none',
          className
        )}
      >
        {/* Header grid: 2 columns (content / X), 2 rows (title / description) */}
        <div className="mb-4 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-3">
          {hideTitleVisually ? (
            <VisuallyHidden asChild>
              <DialogTitle>{title}</DialogTitle>
            </VisuallyHidden>
          ) : (
            <DialogTitle className="row-start-1 col-start-1 text-lg font-semibold">
              {title}
            </DialogTitle>
          )}

          {description && (
            <DialogDescription className="row-start-2 col-start-1 text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          )}

          {/* Close aligned with description (or title if no description) */}
          <DialogClose
            aria-label="Close"
            className={cn(
              'col-start-2 self-start rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
              closeRowClass
            )}
          >
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div>{children}</div>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
