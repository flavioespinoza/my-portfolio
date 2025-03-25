'use client'

export default function ProjectsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center">Projects</h1>

      <section className="rounded-lg border p-6 shadow-sm space-y-3">
        <h2 className="text-2xl font-semibold text-primary">AI Chat Assistant</h2>
        <p className="text-muted-foreground">
          A GPT-4o powered chatbot with theme toggle, Zustand chat state, and real-time streaming.
        </p>
        <iframe
          loading="lazy"
          src="https://yourdomain.com/embed?prompt=Hello&type=bar"
          width="100%"
          height="400"
          className="w-full border rounded-md shadow-sm"
        />
      </section>

      <section className="rounded-lg border p-6 shadow-sm space-y-3">
        <h2 className="text-2xl font-semibold text-primary">LLM Data Visualizer</h2>
        <p className="text-muted-foreground">
          Transforms user prompts into JSON and visualizes with D3.js — supports bar, line, and pie charts.
        </p>
        <iframe
          loading="lazy"
          src="https://yourdomain.com/embed?prompt=Show+sales+for+A%2C+B%2C+C&type=bar"
          width="100%"
          height="400"
          className="w-full border rounded-md shadow-sm"
        />
      </section>
    </main>
  )
}
