'use client'

import { useState } from 'react'
import { Loader2, Users } from 'lucide-react'
import AgentCard from './components/agent-card'
import ResearchForm from './components/research-form'
import ResultsDisplay from './components/results-display'

export default function MultiAgentPage() {
	const [topic, setTopic] = useState('')
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState<any>(null)
	const [activeAgent, setActiveAgent] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const handleResearch = async (researchTopic: string) => {
		setLoading(true)
		setResults(null)
		setError(null)
		setTopic(researchTopic)

		try {
			const response = await fetch('/api/multi-agent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ topic: researchTopic })
			})

			const data = await response.json()

			if (!response.ok) {
				console.error('API Error:', data)
				throw new Error(data.error || 'Research failed')
			}

			setResults(data.data)
		} catch (err: any) {
			console.error('Research error:', err)
			setError(err.message || 'Failed to complete research. Please try again.')
		} finally {
			setLoading(false)
			setActiveAgent(null)
		}
	}

	return (
		<div className="from-slate-900 to-slate-900 min-h-screen bg-gradient-to-br via-purple-900 p-8 text-white">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="mb-12">
					<div className="mb-4 flex items-center justify-center gap-3">
						<div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-hotpink-400`}>
							<Users className={`h-6 w-6 text-white`} />
						</div>
						<h1 className="text-4xl font-bold">Multi-Agent Research System</h1>
					</div>
					<p className="mx-auto w-3/4 text-left text-white md:w-1/2">
						An autonomous multi-agent AI system where three specialized agents (Researcher, Writer,
						Reviewer) collaborate sequentially to research topics, generate content, and perform
						quality reviews—powered by CrewAI, OpenAI GPT-4o-mini, and Next.js.
					</p>
				</div>

				{/* Agent Cards */}
				<div className="mb-8 grid gap-6 md:grid-cols-3">
					<AgentCard
						name="Researcher"
						role="Gathers and analyzes information"
						color="bg-cblue-500"
						icon="search"
						isActive={activeAgent === 'researcher'}
					/>
					<AgentCard
						name="Writer"
						role="Creates structured content"
						color="bg-hotpink-400"
						icon="file-text"
						isActive={activeAgent === 'writer'}
					/>
					<AgentCard
						name="Reviewer"
						role="Reviews and provides feedback"
						color="bg-purple-500"
						icon="check-circle"
						isActive={activeAgent === 'reviewer'}
					/>
				</div>

				{/* Research Form */}
				<ResearchForm onSubmit={handleResearch} loading={loading} error={error} />

				{/* Results */}
				{results && <ResultsDisplay results={results} />}
			</div>
		</div>
	)
}
