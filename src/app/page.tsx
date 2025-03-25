'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function HomePage() {

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6 text-center">
      <div className="flex justify-end">
      </div>
      <h1 className="text-4xl font-bold">Flavio Espinoza</h1>
      <p className="text-muted-foreground text-lg">
        Front-End Developer & AI Builder · React · Next.js · Tailwind · LLMs
      </p>
      <div className="space-x-4">
        <Button>
          <a href="/projects">View Projects</a>
        </Button>
        <Button variant="secondary">
          <a href="/about">About Me</a>
        </Button>
      </div>
    </main>
  )
}
