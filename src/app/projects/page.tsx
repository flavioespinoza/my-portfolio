'use client'

export default function ProjectsPage() {
	return (
		<main className="mx-auto max-w-4xl space-y-12 p-6">
			<h1 className="text-center text-3xl font-bold">Projects</h1>

			<section className="space-y-3 rounded-lg border p-6 shadow-sm">
				<h2 className="text-primary text-2xl font-semibold">AI Chat Assistant</h2>
				<p className="text-muted-foreground">
					A GPT-4o powered chatbot with theme toggle, Zustand chat state, and real-time streaming.
				</p>
				<iframe
					loading="lazy"
					src="https://yourdomain.com/embed?prompt=Hello&type=bar"
					width="100%"
					height="400"
					className="w-full rounded-md border shadow-sm"
				/>
			</section>

			<section className="space-y-3 rounded-lg border p-6 shadow-sm">
				<h2 className="text-primary text-2xl font-semibold">LLM Data Visualizer</h2>
				<p className="text-muted-foreground">
					Transforms user prompts into JSON and visualizes with D3.js — supports bar, line, and pie
					charts.
				</p>
				<iframe
					loading="lazy"
					src="https://yourdomain.com/embed?prompt=Show+sales+for+A%2C+B%2C+C&type=bar"
					width="100%"
					height="400"
					className="w-full rounded-md border shadow-sm"
				/>
			</section>
		</main>
	)
}
