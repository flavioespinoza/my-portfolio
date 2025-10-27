'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/ai-multi-agent', label: 'AI Multi-Agent' },
	{ href: '/ai-chat-assistant', label: 'AI Chat' },
	{ href: '/ai-llm-data-visualizer', label: 'AI LLM Data Visualizer' },
	{ href: '/wallet', label: 'Wallet' },
	{ href: '/otp-verification', label: 'OTP Verification' },
	{ href: '/contact', label: 'Contact' }
]

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 10)
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<header
			className={cn(
				'supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full backdrop-blur transition-all',
				isScrolled && 'border-b border-black/10 shadow-sm'
			)}
		>
			<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-white">
				<div className="flex gap-4 text-sm font-medium">
					{links.map(({ href, label }) => (
						<Link key={href} href={href} className="transition-colors hover:text-hotpink-300">
							{label}
						</Link>
					))}
				</div>
			</div>
		</header>
	)
}
