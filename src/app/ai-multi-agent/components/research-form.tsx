import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button, Input } from '@flavioespinoza/salsa-ui';

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
    <div className="bg-white backdrop-blur-sm rounded-xl p-6 mb-8 text-black">
      <label className="block text-sm font-medium mb-2">Research Topic</label>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic to research (e.g., 'Artificial Intelligence in Healthcare')"
          className="border border-solid border-zinc-300 bg-cblue-200 text-black"
          disabled={loading}
        />
        <Button
          variant="default"
          type="submit"
          disabled={loading || !topic.trim()}
          
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing
            </>
          ) : (
            'Start Research'
          )}
        </Button>
      </form>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </div>
  );
}