import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react'

export type AlertType = 'info' | 'success' | 'warning' | 'error'

const iconMap = {
	info: Info,
	success: CheckCircle2,
	warning: AlertTriangle,
	error: AlertTriangle
}

export function Alert({
	title,
	message,
	type = 'info',
	className
}: {
	title?: string
	message: string
	type?: AlertType
	className?: string
}) {
	const Icon = iconMap[type]
	return (
		<div className={cn('flex items-start gap-3 rounded-md border px-4 py-3 text-sm', className)}>
			<Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
			<div>
				{title && <div className="font-medium">{title}</div>}
				<div>{message}</div>
			</div>
		</div>
	)
}
