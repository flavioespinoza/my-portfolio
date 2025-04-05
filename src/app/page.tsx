'use client'

import { Button } from '@flavioespinoza/salsa-ui'
import { Moon, Sun } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6 text-center">
      <div className="flex justify-end"></div>
      <h1 className="text-4xl font-bold">Flavio Espinoza</h1>
      <p className="text-lg text-muted-foreground">
        Front-End Developer & AI Builder · React · Next.js · Tailwind · LLMs
      </p>
      <div className="space-x-4">
        <Button variant="outline">
          <a href="/projects">View Projects</a>
        </Button>
        <Button variant="outline">
          <a href="/about">About Me</a>
        </Button>
      </div>
    </main>
  )
}
