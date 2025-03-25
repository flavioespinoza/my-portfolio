'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/commits', label: 'Commits' },
	{ href: '/about', label: 'About' }
]

export function Navbar() {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)

	return (
		<nav className="bg-background/95 sticky top-0 z-50 border-b px-6 py-3 backdrop-blur transition-all">
			<div className="mx-auto flex max-w-5xl items-center justify-between">
				<div className="text-lg font-bold">Flavio</div>

				{/* Desktop Nav */}
				<div className="hidden items-center gap-4 text-sm md:flex">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								'hover:text-foreground transition-colors',
								pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'
							)}
						>
							{label}
						</Link>
					))}
				</div>

				{/* Mobile Toggle */}
				<button
					onClick={() => setOpen(!open)}
					className="text-muted-foreground hover:text-foreground transition md:hidden"
				>
					<Menu className="h-5 w-5" />
				</button>
			</div>

			{/* Mobile Nav Dropdown */}
			<div
				className={cn(
					'overflow-hidden transition-all md:hidden',
					open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
				)}
			>
				<div className="mt-2 flex flex-col space-y-1 text-sm">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={() => setOpen(false)}
							className={cn(
								'hover:text-foreground px-6 py-2 transition-colors',
								pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'
							)}
						>
							{label}
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
