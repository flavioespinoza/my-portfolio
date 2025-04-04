import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighterBase } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownWithCodeProps {
  markdown: string;
}

const MarkdownWithCode: React.FC<MarkdownWithCodeProps> = ({ markdown }) => {
  const CodeBlock = ({ node, inline, className, children, ...props }: any): JSX.Element => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : null;

    const SyntaxHighlighter = SyntaxHighlighterBase as any;

    return !inline && language ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownWithCode;