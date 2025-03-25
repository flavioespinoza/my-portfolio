'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useState } from 'react'

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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b px-6 py-3 transition-all">
      <div className="mx-auto max-w-5xl flex items-center justify-between">
        <div className="font-bold text-lg">Flavio</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-foreground',
                pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-muted-foreground hover:text-foreground transition">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={cn(
          'transition-all overflow-hidden md:hidden',
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col mt-2 space-y-1 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-6 py-2 transition-colors hover:text-foreground',
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
