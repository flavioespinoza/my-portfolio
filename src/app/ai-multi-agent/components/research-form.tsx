import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ResearchFormProps {
  onSubmit: (topic: string) => void;
  loading: boolean;
  error: string | null;
}

export default function ResearchForm({ onSubmit, loading, error }: ResearchFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
      <label className="block text-sm font-medium mb-2">Research Topic</label>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic to research (e.g., 'Artificial Intelligence in Healthcare')"
          className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing
            </>
          ) : (
            'Start Research'
          )}
        </button>
      </form>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  );
}