import { cn } from '@/lib/utils'

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <section className={cn('space-y-6 py-12', className)} {...props} />
}
