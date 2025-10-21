import { Card } from '@flavioespinoza/salsa-ui'
import { CheckCircle, FileText, Loader2, Search } from 'lucide-react'

interface AgentCardProps {
	name: string
	role: string
	color: string
	icon: 'search' | 'file-text' | 'check-circle'
	isActive: boolean
}

const iconMap = {
	search: Search,
	'file-text': FileText,
	'check-circle': CheckCircle
}

export default function AgentCard({ name, role, color, icon, isActive }: AgentCardProps) {
	const Icon = iconMap[icon]

	return (
		<Card title={name} description={role}>
			<div className={`${color} -mt-4 mb-4 flex h-12 w-12 items-center justify-center rounded-lg`}>
				<Icon className={`h-6 w-6 text-white`} />
			</div>
			{isActive && (
				<div className="mt-4 flex items-center gap-2 text-black">
					<Loader2 className="h-4 w-4 animate-spin" />
					<span className="text-sm">Working...</span>
				</div>
			)}
		</Card>
	)
}
