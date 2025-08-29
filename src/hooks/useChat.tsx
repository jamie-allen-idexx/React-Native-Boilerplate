import { useCallback, useEffect, useRef, useState } from 'react';

import { aiAgent } from '@/services/aiAgent';

export type Sender = 'user' | 'ai';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

const createMessage = (text: string, sender: Sender): Message => ({
  id: Math.random().toString(36).slice(2),
  text,
  sender,
  timestamp: new Date(),
});

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    const greeting = aiAgent.getInitialPleasantry();
    setMessages([createMessage(greeting, 'ai')]);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage = createMessage(text, 'user');
    setMessages((prev) => [...prev, userMessage]);

    const responseText = await aiAgent.respond(text);
    const aiMessage = createMessage(responseText, 'ai');
    setMessages((prev) => [...prev, aiMessage]);
  }, []);

  return { messages, sendMessage };
};


