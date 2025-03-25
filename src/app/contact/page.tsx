'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function ContactPage() {
	return (
		<main className="mx-auto max-w-xl space-y-6 p-6">
			<h1 className="text-3xl font-bold">Contact</h1>

			<p className="text-muted-foreground">
				Feel free to reach out via email, GitHub, or LinkedIn. I'm currently open to freelance or
				full-time front-end/AI opportunities.
			</p>

			<div className="space-y-2 text-sm">
				<p className="flex items-center gap-2">
					<Mail className="h-4 w-4" />
					<a href="mailto:flavio.espinoza@gmail.com" className="underline">
						flavio.espinoza@gmail.com
					</a>
				</p>
				<p className="flex items-center gap-2">
					<Github className="h-4 w-4" />
					<a
						href="https://github.com/flavioespinoza"
						className="underline"
						target="_blank"
						rel="noreferrer"
					>
						github.com/flavioespinoza
					</a>
				</p>
				<p className="flex items-center gap-2">
					<Linkedin className="h-4 w-4" />
					<a
						href="https://www.linkedin.com/in/flavioespinoza"
						className="underline"
						target="_blank"
						rel="noreferrer"
					>
						linkedin.com/in/flavioespinoza
					</a>
				</p>
			</div>

			<form className="space-y-4">
				<Input placeholder="Your email" type="email" />
				<Textarea placeholder="Your message" rows={5} />
				<Button type="submit">Send</Button>
			</form>
		</main>
	)
}
