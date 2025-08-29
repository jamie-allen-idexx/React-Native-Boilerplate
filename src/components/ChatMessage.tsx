import React from 'react';
import { Text, View } from 'react-native';

import { Message } from '@/hooks/useChat';

type ChatMessageProps = {
  message: Message;
};

const bubbleBase =
  'max-w-[80%] rounded-2xl px-4 py-2 shadow-sm border border-black/5';

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  return (
    <View className={`w-full flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`${bubbleBase} ${isUser ? 'bg-blue-600' : 'bg-gray-100'}`}
      >
        <Text className={`${isUser ? 'text-white' : 'text-gray-900'}`}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

export { ChatMessage };


