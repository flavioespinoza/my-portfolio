'use client'

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'AI', 'Web3', 'Data Viz', 'UI Systems'] as const

interface ProjectLink {
	label: string
	href: string
}
interface Project {
	id: string
	title: string
	tagline: string
	category: (typeof CATEGORIES)[number] | 'AI' | 'Web3' | 'Data Viz' | 'UI Systems'
	tags: string[]
	cover: string
	images?: string[]
	links?: ProjectLink[]
}

const PROJECTS: Project[] = [
	{
		id: 'ai-multi-agent',
		title: 'AI Multi-Agent',
		tagline: 'Collaborative agents powered by OpenAI and CrewAI',
		category: 'AI',
		tags: ['React.js', 'Next.js', 'Zustand', 'OpenAI', 'CrewAI', 'Tailwind', 'Python', 'FastAPI'],
		cover: '/projects/ai-multi-agent/image-1.png',
		images: [
			'/projects/ai-multi-agent/image-1.png',
			'/projects/ai-multi-agent/image-2.png',
			'/projects/ai-multi-agent/image-3.png'
		],
		links: [
			{ label: 'Open App', href: '/ai-multi-agent' },
		]
	},
	{
		id: 'ai-chat-assistant',
		title: 'AI Chat Assistant',
		tagline: 'Lightweight chat UI with message feedback + copy',
		category: 'AI',
		tags: ['React.js', 'Next.js', 'Zustand', 'OpenAI', 'Tailwind', 'Node.js'],
		cover: '/projects/ai-chat-assistant/image-1.png',
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
		id: 'ai-llm-data-visualizer',
		title: 'LLM Data Visualizer',
		tagline: 'Prompt → clean data → interactive charts',
		category: 'AI',
		tags: ['React.js', 'Next.js', 'TypeScript', 'D3.js', 'OpenAI', 'Node.js'],
		cover: '/projects/ai-llm-data-visualizer/image-1.png',
		images: [
			'/projects/ai-llm-data-visualizer/image-1.png',
			'/projects/ai-llm-data-visualizer/image-2.png',
			'/projects/ai-llm-data-visualizer/image-3.png'
		],
		links: [
			{ label: 'Live Demo', href: '/ai-llm-data-visualizer' },
			{ label: 'GitHub', href: 'https://github.com/flavioespinoza' }
		]
	},
	{
		id: 'bless-network',
		title: 'Bless Network',
		tagline:
			'Decentralized compute dashboard with multimodal auth, real-time monitoring, and gamified engagement.',
		category: 'Web3',
		tags: [
			'React.js',
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'SWR',
			'WebSocket',
			'Recharts',
			'WCAG',
			'Node.js'
		],
		cover: '/projects/bless/image-1.png',
		images: [
			'/projects/bless/image-1.png',
			'/projects/bless/image-2.png',
			'/projects/bless/image-3.png'
		],
		links: [{ label: 'Project Link', href: 'https://bless.network/dashboard' }]
	},
	{
		id: 'akash-console',
		title: 'Akash Console',
		tagline:
			'Web platform that lets you deploy Docker containers on the Akash Network, a decentralized cloud computing marketplace.',
		category: 'Web3',
		tags: ['React.js', 'TypeScript', 'Fastify', 'WebSocket', 'mTLS', 'HTTP/2', 'Node.js'],
		cover: '/projects/akash-console/image-1.png',
		images: [
			'/projects/akash-console/image-1.png',
			'/projects/akash-console/image-2.png',
			'/projects/akash-console/image-3.png'
		],
		links: [{ label: 'Project Link', href: 'https://console.akash.network' }]
	},
	{
		id: 'exemplar',
		title: 'Exemplar',
		tagline:
			'Identity verification UI with multi-step OIDC via Okta, Trust Graph visualization, and real-time document checks.',
		category: 'UI Systems',
		tags: [
			'React.js',
			'Material UI',
			'Redux',
			'D3.js',
			'OIDC',
			'Okta',
			'Jumio',
			'WCAG',
			'Go',
			'Node.js'
		],
		cover: '/projects/exemplar/image-1.png',
		images: [
			'/projects/exemplar/image-1.png',
			'/projects/exemplar/image-2.png',
			'/projects/exemplar/image-3.png'
		],
		links: []
	},
	{
		id: 'street-fighter',
		title: 'Street Fighter',
		tagline:
			'Real-time trading dashboard with sub-second order book updates, TA overlays, and interactive order controls.',
		category: 'Web3',
		tags: ['React.js', 'D3.js', 'Socket.IO', 'WebSocket', 'Trading', 'Node.js'],
		cover: '/projects/street-fighter/image-1.png',
		images: [
			'/projects/street-fighter/image-1.png',
			'/projects/street-fighter/image-2.png',
			'/projects/street-fighter/image-3.png'
		],
		links: []
	},
	{
		id: 'swim-ai',
		title: 'Swim AI',
		tagline:
			'Interactive mapping application with D3.js overlays for real-time IoT device tracking and analytics',
		category: 'Data Viz',
		tags: ['React.js', 'D3.js', 'Google Maps API', 'FLUX', 'IoT', 'Node.js'],
		cover: '/projects/swim-ai/image-1.png',
		images: [
			'/projects/swim-ai/image-1.png',
			'/projects/swim-ai/image-2.png',
			'/projects/swim-ai/image-3.png'
		],
		links: []
	},
	{
		id: 'vivint-solar',
		title: 'Vivint Solar',
		tagline:
			'Modular analytics platform with lazy loading, real-time data visualization, and scalable architecture for high-volume processing',
		category: 'Data Viz',
		tags: ['Angular', 'D3.js', 'Modular Architecture', 'Node.js'],
		cover: '/projects/vivint-solar/image-1.png',
		images: [
			'/projects/vivint-solar/image-1.png',
			'/projects/vivint-solar/image-2.png',
			'/projects/vivint-solar/image-3.png'
		],
		links: [
			{ label: 'Video Demo', href: 'https://www.loom.com/share/251e47d0a3304ec5afc45178fa7d0cb2' }
		]
	},
	{
		id: 'attensity',
		title: 'Attensity',
		tagline:
			'Enterprise CRM platform with high-performance D3.js visualizations for real-time financial data serving Fortune 500 clients',
		category: 'Data Viz',
		tags: ['JavaScript', 'D3.js', 'Enterprise', 'CRM', 'Node.js'],
		cover: '/projects/attensity/image-2.png',
		images: [
			'/projects/attensity/image-2.png',
			'/projects/attensity/image-3.png',
			'/projects/attensity/image-4.png'
		],
		links: []
	},
	{
		id: 'commits-analytics',
		title: 'Commits Analytics',
		tagline: 'Morphing charts + CSV export of GitHub contributions',
		category: 'Data Viz',
		tags: ['React.js', 'Next.js', 'Salsa-UI', 'D3.js', 'CSV', 'Node.js'],
		cover: '/projects/commits/image-1.png',
		images: [
			'/projects/commits/image-1.png',
			'/projects/commits/image-2.png',
			'/projects/commits/image-3.png'
		],
		links: [{ label: 'Live Demo', href: '/commits' }]
	}
]

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
		<main className="mx-auto max-w-6xl px-6 py-10 text-white">
			<header className="mb-8 space-y-3">
				<div className="mb-6">
					<h1 className="text-3xl font-bold tracking-tight text-white">
						Flavio Espinoza | Development Portfolio
					</h1>
					<p className="text-sm pt-2">
						Creative and technically versatile developer with 11+ years of experience building
						high-impact, production-grade applications using React.js, Node.js, and TypeScript.
						Proven ability to ship full-stack features end-to-end—from idea to production—across
						Web3, FinTech, and AI-first platforms. Adept at collaborating directly with founders and
						product leaders in fast-paced startup environments. Strong background in real-time data
						systems, D3.js visualization, and OpenAI integration for AI-augmented development.
					</p>
				</div>
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight text-white">Featured Projects</h1>
					<p className="text-sm pt-2">
						Clean, scannable project grid with filters. Hover or open a project for more visuals +
						links.
					</p>
				</div>
				<div className="pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
	const close = useCallback(() => setOpen(false), [])

	return (
		<article
			className={cn(
				'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg'
			)}
		>
			<Dialog open={open} onOpenChange={setOpen}>
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
							<div
								className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								style={{
									background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.35) 100%)'
								}}
							/>
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
								{project.tags.map((t, i) => (
									<li
										key={i}
										className="rounded-md border px-2 py-0.5 text-[11px] text-muted-foreground"
									>
										{t}
									</li>
								))}
							</ul>
						</div>
					</button>
				</DialogTrigger>

				<DialogContent title={project.title} description={project.tagline}>
					{/* Gallery: stack on tablet (md) & mobile; only split into columns on desktop */}
					{project.images && project.images.length > 0 && (
						<div className="mx-auto">
							<div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
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
						</div>
					)}

					{/* Links */}
					{project.links && project.links.length > 0 && (
						<div className="mt-4 flex flex-wrap gap-2">
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
				</DialogContent>
			</Dialog>
		</article>
	)
}
