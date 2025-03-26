export default function ContactPage() {
	return (
		<main className="mx-auto max-w-2xl space-y-8 px-6 py-12">
			<h1 className="text-4xl font-bold tracking-tight text-foreground">Contact</h1>

			<p className="leading-relaxed text-muted-foreground">
				If you'd like to get in touch, feel free to reach out via email or connect with me on social
				media:
			</p>

			<ul className="space-y-3 text-base">
				<li>
					📬{' '}
					<a
						href="mailto:flavio.espinoza@gmail.com"
						className="text-blue-500 underline hover:text-blue-700"
					>
						flavio.espinoza@gmail.com
					</a>
				</li>
				<li>
					🔗{' '}
					<a
						href="https://github.com/flavioespinoza"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 underline hover:text-blue-700"
					>
						github.com/flavioespinoza
					</a>
				</li>
				<li>
					💼{' '}
					<a
						href="https://linkedin.com/in/flavioespinoza"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 underline hover:text-blue-700"
					>
						linkedin.com/in/flavioespinoza
					</a>
				</li>
			</ul>
		</main>
	)
}
