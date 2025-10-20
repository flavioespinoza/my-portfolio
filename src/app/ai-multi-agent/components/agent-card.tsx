import { Search, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@flavioespinoza/salsa-ui';

interface AgentCardProps {
  name: string;
  role: string;
  color: string;
  icon: 'search' | 'file-text' | 'check-circle';
  isActive: boolean;
}

const iconMap = {
  'search': Search,
  'file-text': FileText,
  'check-circle': CheckCircle,
};

export default function AgentCard({ name, role, color, icon, isActive }: AgentCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card
      title={name}
      description={role}
    >
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 -mt-4`}>
        <Icon className={`w-6 h-6 text-white`} />
      </div>
      {isActive && (
        <div className="mt-4 flex items-center gap-2 text-black">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Working...</span>
        </div>
      )}
    </Card>
  );
}