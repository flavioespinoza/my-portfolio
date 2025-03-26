'use client'

export default function ProjectsPage() {
	return (
		<main className="mx-auto max-w-6xl space-y-10 px-6 py-12">
			<h1 className="text-4xl font-bold tracking-tight">Projects</h1>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">AI Chat Assistant</h2>
				<p className="text-base leading-relaxed text-muted-foreground">
					A lightweight chat UI using GPT-4o, Zustand for state management, and next-themes for
					theme switching.
				</p>
				<iframe
					loading="lazy"
					src="https://ai-chat-assistant-git-main-flavio-espinozas-projects.vercel.app"
					width="100%"
					height="500"
					className="w-full rounded-md border shadow-sm"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">LLM Data Visualizer</h2>
				<p className="text-base leading-relaxed text-muted-foreground">
					Converts natural language into interactive D3.js charts using OpenAI and Tailwind CSS.
				</p>
				<iframe
					loading="lazy"
					src="https://ai-llm-data-visualizer-git-main-flavio-espinozas-projects.vercel.app"
					width="100%"
					height="500"
					className="w-full rounded-md border shadow-sm"
				/>
			</section>
		</main>
	)
}
