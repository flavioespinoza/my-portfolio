import { cn } from '@/lib/utils'

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('mx-auto max-w-5xl px-6', className)} {...props} />
}
