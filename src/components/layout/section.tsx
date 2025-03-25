import { cn } from '@/lib/utils'

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <section className={cn('py-12 space-y-6', className)} {...props} />
}
