// Suggested Modified File: src/app/chat/page.tsx
'use client'

import { useState } from 'react';
import { useChatStore } from '@/store/chat-store';
import { MessageList } from './components/message-list';
import { ChatInputForm } from './components/chat-input-form';

export default function ChatPage() {
  const { messages, addMessage } = useChatStore();
  const [isTyping, setIsTyping] = useState(false);

  const isEmpty = messages.length === 0;

  return (
    // Use Flexbox for layout. Conditionally center items when isEmpty.
    // Add min-height to ensure centering works vertically.
    <main
      className={`relative mx-auto flex max-w-xl flex-col px-4 pt-4 ${
        isEmpty
          ? 'min-h-[calc(100vh-150px)] items-center justify-center' // Center vertically and horizontally when empty
          : 'pb-[120px]' // Add padding-bottom when form is fixed (adjust as needed)
      }`}
    >
      {isEmpty ? (
        // Only show the prompt text in the centered area
        <div className="mb-6 text-center text-lg text-zinc-500"> {/* Added margin-bottom */}
          How can I help you today?
        </div>
      ) : (
        // Render the message list when not empty
        <MessageList isTyping={isTyping} />
      )}

      {/* Conditionally wrap the ChatInputForm for fixed positioning */}
      {isEmpty ? (
        // Render form directly when empty (will be centered by the main flex container)
         <ChatInputForm
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          addMessage={addMessage}
        />
      ) : (
        // Render form inside a fixed wrapper when not empty
        <div className="fixed bottom-4 left-1/2 w-full -translate-x-1/2 transform sm:bottom-8">
          {/* Center the form horizontally within the fixed wrapper */}
          <div className="mx-auto flex justify-center">
            <ChatInputForm
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              addMessage={addMessage}
            />
          </div>
        </div>
      )}
    </main>
  );
}