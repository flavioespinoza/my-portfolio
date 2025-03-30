'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@flavioespinoza/salsa-ui'
import { Moon, Sun } from 'lucide-react'

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/commits', label: 'Commits' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
	{ href: '/fluid', label: 'Fluid' }
]

export function Navbar() {
	const { theme, setTheme } = useTheme()
	const [isScrolled, setIsScrolled] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 10)
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<header
			className={cn(
				'sticky top-0 z-50 w-full backdrop-blur transition-all supports-[backdrop-filter]:bg-background/80',
				isScrolled && 'border-b border-black/10 shadow-sm'
			)}
		>
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
				<div className="flex gap-4 text-sm font-medium">
					{links.map(({ href, label }) => (
						<Link key={href} href={href} className="transition-colors hover:text-primary">
							{label}
						</Link>
					))}
				</div>

				{mounted && (
					<Button
						variant="outline"
						size="icon"
						className="cursor-pointer"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
					</Button>
				)}
			</div>
		</header>
	)
}
