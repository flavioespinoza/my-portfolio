import { Search, FileText, CheckCircle } from 'lucide-react';
import { Card } from '@flavioespinoza/salsa-ui';

interface ResultsDisplayProps {
  results: {
    research: string;
    content: string;
    review: string;
  };
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className='space-y-4'>
      {/* Research Results */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold">Research Findings</h2>
        </div>
        <div className="text-black whitespace-pre-wrap">{results.research}</div>
      </Card>

      {/* Content Results */}
      <Card className='p-6'>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-hotpink-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold">Generated Content</h2>
        </div>
        <div className="text-black whitespace-pre-wrap">{results.content}</div>
      </Card>

      {/* Review Results */}
      <Card className='p-6'>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-500 w-10 h-10 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-semibold">Review & Feedback</h2>
        </div>
        <div className="text-black whitespace-pre-wrap">{results.review}</div>
      </Card>
    </div>
  );
}