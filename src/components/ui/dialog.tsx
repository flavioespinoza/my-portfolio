'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-6 shadow-lg outline-none">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <DialogPrimitive.Close className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        </div>
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        <div>{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
