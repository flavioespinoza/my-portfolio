'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/commits', label: 'Commits' },
  { href: '/about', label: 'About' }
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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b px-6 py-3 transition-all">
      <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
        <div className="font-bold text-lg">Flavio</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'cursor-pointer transition-colors hover:text-foreground',
                pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hidden md:inline-flex cursor-pointer text-muted-foreground hover:text-foreground transition"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden cursor-pointer text-muted-foreground hover:text-foreground transition"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {open && (
        <div className="md:hidden mt-2 flex flex-col space-y-1 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-6 py-2 cursor-pointer transition-colors hover:text-foreground',
                pathname === href ? 'text-foreground font-medium' : 'text-muted-foreground'
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
