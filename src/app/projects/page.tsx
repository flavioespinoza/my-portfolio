'use client'

export default function ProjectsPage() {
	return (
		<main className="mx-auto max-w-6xl space-y-10 px-6 py-12">
			<h1 className="text-4xl font-bold tracking-tight">Projects</h1>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold">LLM Data Visualizer</h2>
				<p className="text-base leading-relaxed text-muted-foreground">
					Converts natural language into interactive D3.js charts using OpenAI and Tailwind CSS.
				</p>
				<div>
					<h3 className="text-lg font-semibold">Examples</h3>
					<ul>
						<li>Show me the top 5 mobile phone purchases by brand for the last year.</li>
						<li>Show me the top 5 car brands by sales for the last year.</li>
						<li>Show me the top 5 US cities to live.</li>
					</ul>
				</div>
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
