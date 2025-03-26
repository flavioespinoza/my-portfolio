export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">Contact</h1>

      <p className="text-muted-foreground leading-relaxed">
        If you'd like to get in touch, feel free to reach out via email or connect with me on social media:
      </p>

      <ul className="space-y-3 text-base">
        <li>
          📬 <a href="mailto:flavio.espinoza@gmail.com" className="underline text-blue-500 hover:text-blue-700">
            flavio.espinoza@gmail.com
          </a>
        </li>
        <li>
          🔗 <a href="https://github.com/flavioespinoza" target="_blank" rel="noopener noreferrer" className="underline text-blue-500 hover:text-blue-700">
            github.com/flavioespinoza
          </a>
        </li>
        <li>
          💼 <a href="https://linkedin.com/in/flavioespinoza" target="_blank" rel="noopener noreferrer" className="underline text-blue-500 hover:text-blue-700">
            linkedin.com/in/flavioespinoza
          </a>
        </li>
      </ul>
    </main>
  )
}
