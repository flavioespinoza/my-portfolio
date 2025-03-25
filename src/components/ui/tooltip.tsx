'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

export function Tooltip({
	children,
	content,
	delay = 300,
	...props
}: {
	children: React.ReactNode
	content: string
	delay?: number
}) {
	return (
		<TooltipPrimitive.Provider delayDuration={delay}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						className={cn(
							'z-50 overflow-hidden rounded-md bg-black px-2 py-1 text-xs text-white shadow-md'
						)}
						sideOffset={4}
						{...props}
					>
						{content}
						<TooltipPrimitive.Arrow className="fill-black" />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	)
}
