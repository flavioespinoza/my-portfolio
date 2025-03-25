'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function HomePage() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6 text-center">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} size="icon">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
      <h1 className="text-4xl font-bold">Flavio Espinoza</h1>
      <p className="text-muted-foreground text-lg">
        Front-End Developer & AI Builder · React · Next.js · Tailwind · LLMs
      </p>
      <div className="space-x-4">
        <Button asChild>
          <a href="/projects">View Projects</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="/about">About Me</a>
        </Button>
      </div>
    </main>
  )
}
