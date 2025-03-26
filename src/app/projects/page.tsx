'use client'

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">AI Chat Assistant</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          A lightweight chat UI using GPT-4o, Zustand for state management, and next-themes for theme switching.
        </p>
        <iframe
          loading="lazy"
          src="https://ai-chat-assistant-git-main-flavio-espinozas-projects.vercel.app"
          width="100%"
          height="500"
          className="w-full border rounded-md shadow-sm"
        />
      </section>
    </main>
  )
}
