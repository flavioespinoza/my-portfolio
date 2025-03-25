'use client'

export default function ProjectsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
        <p className="text-muted-foreground">
          A GPT-4o powered chatbot with theme toggle, Zustand chat state, and real-time streaming.
        </p>
        <iframe
          src="https://yourdomain.com/embed?prompt=Hello&type=bar"
          width="100%"
          height="400"
          className="w-full border rounded"
        />
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">LLM Data Visualizer</h2>
        <p className="text-muted-foreground">
          Transforms user prompts into JSON and visualizes with D3.js — supports bar, line, and pie charts.
        </p>
        <iframe
          src="https://yourdomain.com/embed?prompt=Show+sales+for+A%2C+B%2C+C&type=bar"
          width="100%"
          height="400"
          className="w-full border rounded"
        />
      </section>
    </main>
  )
}
