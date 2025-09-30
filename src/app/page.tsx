'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

// ---------------------------------------------
// Featured Projects — Responsive Grid w/ Filters
// ---------------------------------------------
// Design goals
// - Sleek, modern grid (2–3 columns) showing distinct projects
// - Crisp cover image + concise tagline + tech tags
// - Optional category filter via Tabs (AI, Web3, Data Viz, UI, etc.)
// - Accessible modal detail with additional images and links
// - Subtle, tasteful hover animations (no carousel / no infinite scroll)
// ---------------------------------------------

// 1) Define your projects here. Images should live in /public/projects/<slug>/...
//    You can add as many as you like; the grid remains snappy.

const PROJECTS: Project[] = [
  {
    id: 'ai-llm-data-visualizer',
    title: 'LLM Data Visualizer',
    tagline: 'Prompt → clean data → interactive charts',
    category: 'AI',
    tags: ['Next.js', 'TypeScript', 'D3.js', 'OpenAI'],
    cover: '/projects/ai-llm-data-visualizer/cover.png',
    images: [
      '/projects/ai-llm-data-visualizer/image-1.png',
			'/projects/ai-llm-data-visualizer/image-2.png',
      '/projects/ai-llm-data-visualizer/image-3.png',
      '/projects/ai-llm-data-visualizer/image-4.png',
      '/projects/ai-llm-data-visualizer/image-5.png',
    ],
    links: [
      { label: 'Live Demo', href: '/ai-llm-data-visualizer' },
      { label: 'GitHub', href: 'https://github.com/flavioespinoza' }
    ]
  },
  {
    id: 'ai-chat-assistant',
    title: 'AI Chat Assistant',
    tagline: 'Lightweight chat UI with message feedback + copy',
    category: 'AI',
    tags: ['Next.js', 'Zustand', 'OpenAI', 'Tailwind'],
    cover: '/projects/ai-chat-assistant/cover.png',
    images: [
      '/projects/ai-chat-assistant/image-1.png',
      '/projects/ai-chat-assistant/image-2.png',
      '/projects/ai-chat-assistant/image-3.png'
    ],
    links: [
      { label: 'Open App', href: '/ai-chat-assistant' },
      { label: 'GitHub', href: 'https://github.com/flavioespinoza' }
    ]
  },
  {
    id: 'commits-analytics',
    title: 'Commits Analytics',
    tagline: 'Morphing charts + CSV export of contributions',
    category: 'Data Viz',
    tags: ['Salsa-UI', 'D3.js', 'CSV', 'Next.js'],
    cover: '/projects/commits/cover.png',
    images: [
      '/projects/commits/1.png',
      '/projects/commits/2.png'
    ],
    links: [
      { label: 'Open App', href: '/commits' }
    ]
  }
]

const CATEGORIES = ['All', 'AI', 'Web3', 'Data Viz', 'UI Systems'] as const

// Types
interface ProjectLink { label: string; href: string }
interface Project {
  id: string
  title: string
  tagline: string
  category: typeof CATEGORIES[number] | 'AI' | 'Web3' | 'Data Viz' | 'UI Systems'
  tags: string[]
  cover: string
  images?: string[]
  links?: ProjectLink[]
}

export default function FeaturedProjectsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesQuery = !q
        ? true
        : [p.title, p.tagline, p.tags.join(' ')].join(' ').toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Featured Projects</h1>
        <p className="text-sm text-muted-foreground">
          Clean, scannable project grid with filters. Hover or open a project for more visuals + links.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as any)}>
            <TabsList>
              {CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by title, tag, or tech…"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Grid */}
      <section
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Project grid"
      >
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </section>

      {/* Optional empty state */}
      {filtered.length === 0 && (
        <div className="mt-12 rounded-md border p-6 text-center text-sm text-muted-foreground">
          No projects match your filters.
        </div>
      )}

      {/* SEO helpers */}
      <Tabs className="sr-only" value={activeCategory}>
        {CATEGORIES.map((c) => (
          <TabsContent key={c} value={c} />
        ))}
      </Tabs>
    </main>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg',
      )}
    >
      <Dialog open={open}>
        <DialogTrigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="block w-full text-left focus:outline-none"
            aria-label={`Open details for ${project.title}`}
          >
            <figure className="relative aspect-video overflow-hidden">
              <Image
                src={project.cover}
                alt={`${project.title} cover`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                priority={false}
              />
              {/* Soft gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)'
              }} />
            </figure>

            <div className="space-y-2 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-snug">{project.title}</h2>
                <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                  {project.category}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>

              <ul className="mt-2 flex flex-wrap gap-1">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </button>
        </DialogTrigger>

        {/* Modal content */}
        <DialogContent title={project.title} description={project.tagline}>
          <div className="space-y-4">
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.images.map((src, i) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </article>
  )
}
