import { useCallback, useEffect, useState } from 'react';

import AIAgentService from '../services/aiAgent';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface UseChatReturn {
  messages: Message[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize chat with AI pleasantry
  useEffect(() => {
    const initialMessage = AIAgentService.getInitialPleasantry();
    const message: Message = {
      id: Date.now().toString(),
      text: initialMessage.text,
      sender: 'ai',
      timestamp: initialMessage.timestamp,
    };
    setMessages([message]);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await AIAgentService.generateResponse(text);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponse.text,
        sender: 'ai',
        timestamp: aiResponse.timestamp,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Error generating AI response
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
