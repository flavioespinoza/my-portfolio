'use client';

import { useState } from 'react';
import { Loader2, Users } from 'lucide-react';
import AgentCard from './components/agent-card';
import ResearchForm from './components/research-form';
import ResultsDisplay from './components/results-display';

export default function MultiAgentPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async (researchTopic: string) => {
    setLoading(true);
    setResults(null);
    setError(null);
    setTopic(researchTopic);
    
    try {
      const response = await fetch('/api/multi-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: researchTopic }),
      });

      if (!response.ok) {
        throw new Error('Research failed');
      }

      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError('Failed to complete research. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setActiveAgent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold">Multi-Agent Research System</h1>
          </div>
          <p className="text-slate-300">
            Powered by CrewAI collaborative agents
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <AgentCard
            name="Researcher"
            role="Gathers and analyzes information"
            color="bg-blue-500"
            icon="search"
            isActive={activeAgent === 'researcher'}
          />
          <AgentCard
            name="Writer"
            role="Creates structured content"
            color="bg-purple-500"
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
        <ResearchForm
          onSubmit={handleResearch}
          loading={loading}
          error={error}
        />

        {/* Results */}
        {results && <ResultsDisplay results={results} />}
      </div>
    </div>
  );
}