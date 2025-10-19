import MarkdownWithCode from '@/components/markdown-with-code'
import { Card } from '@flavioespinoza/salsa-ui'
import { CheckCircle, FileText, Search } from 'lucide-react'

interface ResultsDisplayProps {
	results: {
		research: string
		content: string
		review: string
	}
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
	return (
		<div className="space-y-4">
			{/* Research Results */}
			<Card className="p-6">
				<div className="mb-4 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
						<Search className="h-5 w-5 text-white" />
					</div>
					<h2 className="text-2xl font-semibold">Research Findings</h2>
				</div>
				<div className="whitespace-pre-wrap [&>*]:mb-1 [&>*]:mt-1">
					<MarkdownWithCode markdown={results.research} />
				</div>
			</Card>

			{/* Content Results */}
			<Card className="p-6">
				<div className="mb-4 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hotpink-500">
						<FileText className="h-5 w-5 text-white" />
					</div>
					<h2 className="text-2xl font-semibold">Generated Content</h2>
				</div>
				<div className="whitespace-pre-wrap [&>*]:mb-1 [&>*]:mt-1">
					<MarkdownWithCode markdown={results.content} />
				</div>
			</Card>

			{/* Review Results */}
			<Card className="p-6">
				<div className="mb-4 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
						<CheckCircle className="h-5 w-5 text-white" />
					</div>
					<h2 className="text-2xl font-semibold">Review & Feedback</h2>
				</div>
				<div className="whitespace-pre-wrap [&>*]:mb-1 [&>*]:mt-1">
					<MarkdownWithCode markdown={results.review} />
				</div>
			</Card>
		</div>
	)
}
