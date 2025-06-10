'use client'

import { Button } from '@flavioespinoza/salsa-ui'

export default function HomePage() {
	return (
		<div className="mx-auto max-w-2xl space-y-6 p-6">
			<br />
			<h1 className="text-center text-4xl font-bold">Flavio Espinoza</h1>
			<p className="text-center text-lg text-muted-foreground">
				Full-Stack Developer & AI Builder · React · Next.js · Tailwind · Node.js · ChatGPT · OpenAI
				· LLMs
			</p>
			<p>
				Creative and technically versatile developer with 11+ years of experience building
				high-impact, production-grade applications using React.js, Node.js, and TypeScript. Proven
				ability to ship full-stack features end-to-end—from idea to production—across Web3, FinTech,
				and AI-first platforms. Adept at collaborating directly with founders and product leaders in
				fast-paced startup environments. Strong background in real-time data systems, D3.js
				visualization, and OpenAI integration for AI-augmented development.{' '}
				<a
					href="https://github.com/flavioespinoza"
					target="_blank"
					style={{ color: 'blue' }}
					className="underline"
				>
					Check out my GitHub
				</a>
			</p>
		</div>
	)
}
