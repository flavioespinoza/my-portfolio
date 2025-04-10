// File: src/app/chat/page.tsx
'use client'

import { useState } from 'react';
import { useChatStore } from '@/store/chat-store'; // Assuming consolidated store
import { MessageList } from './components/message-list'; // Import new component
import { ChatInputForm } from './components/chat-input-form'; // Import new component

export default function ChatPage() {
  const { messages, addMessage } = useChatStore(); // Only need addMessage if passing down
  const [isTyping, setIsTyping] = useState(false); // Keep typing state here

  const isEmpty = messages.length === 0;

  return (
    // Adjust padding: remove bottom padding here as form is fixed
    <main className="relative mx-auto max-w-xl p-4 pb-4">
      {isEmpty ? (
        // Simplified Empty State: Only shows prompt text
        // Input form is now handled below, outside the conditional
        <div className="flex h-[calc(80vh-100px)] flex-col items-center justify-center text-center text-lg text-zinc-500">
          How can I help you today?
        </div>
      ) : (
        // Render the message list
        <MessageList isTyping={isTyping} />
      )}

      {/* Render the input form - always visible at the bottom */}
      <ChatInputForm
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        addMessage={addMessage} // Pass addMessage down to the form
      />
    </main>
  );
}