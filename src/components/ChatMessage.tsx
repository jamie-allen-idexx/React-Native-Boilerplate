import type React from 'react';
import { Text, View } from 'react-native';

import type { Message } from '../hooks/useChat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <View
      className={`mb-4 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}
      testID="chat-message-container"
    >
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-blue-500' : 'bg-gray-200'
        }`}
        testID={`message-bubble-${message.sender}`}
      >
        <Text
          className={`text-base ${isUser ? 'text-white' : 'text-gray-800'}`}
          testID="message-text"
        >
          {message.text}
        </Text>
        <Text
          className={`mt-1 text-xs ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}
          testID="message-timestamp"
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};
