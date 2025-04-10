import { useRef, useEffect } from 'react';
import { useChatStore, Message } from '@/store/chat-store'; // Assuming consolidated store
import MarkdownWithCode from '@/components/markdown-with-code';
import { ChatCopyButton } from './chat-copy-button';
import { ChatFeedback } from './chat-feedback';

interface MessageListProps {
  isTyping: boolean;
}

export function MessageList({ isTyping }: MessageListProps) {
  const { messages } = useChatStore(); // Get messages from store
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div id="chat_bubbles" className="space-y-3">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`animate-fade-in relative max-w-[80%] rounded-xl px-4 py-2 text-sm text-black transition-all duration-200 ease-in-out ${
              msg.role === 'user'
                ? 'border border-solid border-zinc-300 bg-cblue-300' // Styles from original
                : 'bg-sage-200' // Styles from original
            }`}
          >
            <p className="mb-1 text-xs text-muted-foreground">
              {msg.role === 'user' ? 'You' : 'AI'} ·{' '}
              {new Date(msg.createdAt).toLocaleTimeString()}
            </p>

            {/* Keep Markdown rendering */}
            <div className="whitespace-normal [&>*]:mb-1 [&>*]:mt-1">
              <MarkdownWithCode markdown={msg.text} />
            </div>

            {/* Keep copy/feedback buttons for assistant messages */}
            {msg.role === 'assistant' && (
              <div className="mt-3 flex items-center space-x-2">
                <ChatCopyButton text={msg.text} />
                <ChatFeedback index={idx} />
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Show typing indicator */}
      {isTyping && <div className="text-sm italic text-muted-foreground">AI is typing…</div>}
      {/* Element to scroll to */}
      <div ref={bottomRef} />
    </div>
  );
}