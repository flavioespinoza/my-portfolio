'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, Moon, Sun } from 'lucide-react'

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/commits', label: 'Commits' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' }
]

export function Navbar() {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<nav className="sticky top-0 z-50 border-b bg-background/95 px-6 py-3 backdrop-blur transition-all">
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
				<div className="text-lg font-bold">Flavio</div>

				{/* Desktop Nav */}
				<div className="hidden items-center gap-4 text-sm md:flex">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={cn(
								'cursor-pointer transition-colors hover:text-foreground',
								pathname === href ? 'font-medium text-foreground' : 'text-muted-foreground'
							)}
						>
							{label}
						</Link>
					))}
				</div>

				<div className="ml-auto flex items-center gap-2">
					{mounted && (
						<button
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className="hidden cursor-pointer text-muted-foreground transition hover:text-foreground md:inline-flex"
						>
							{theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
						</button>
					)}
					<button
						onClick={() => setOpen((prev) => !prev)}
						className="cursor-pointer text-muted-foreground transition hover:text-foreground md:hidden"
					>
						<Menu className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Mobile Nav Dropdown */}
			{open && (
				<div className="mt-2 flex flex-col space-y-1 text-sm md:hidden">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={() => setOpen(false)}
							className={cn(
								'cursor-pointer px-6 py-2 transition-colors hover:text-foreground',
								pathname === href ? 'font-medium text-foreground' : 'text-muted-foreground'
							)}
						>
							{label}
						</Link>
					))}
				</div>
			)}
		</nav>
	)
}
