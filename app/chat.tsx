import { Stack } from 'expo-router';
import { useCallback, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';

import { CameraButton } from '@/components/CameraButton';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import type { Message } from '@/hooks/useChat';
import { useChat } from '@/hooks/useChat';

const ChatScreen = () => {
  const { messages, sendMessage } = useChat();
  const listRef = useRef<FlatList<Message>>(null);

  const handleSend = useCallback(
    async (text: string) => {
      await sendMessage(text);
      // Scroll to end after sending message
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated: true });
      });
    },
    [sendMessage],
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chat',
        }}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
      >
        <View className="flex-1 bg-white">
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatMessage message={item} />}
            contentContainerStyle={{ padding: 16, gap: 12 }}
            onContentSizeChange={() =>
              listRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() => listRef.current?.scrollToEnd({ animated: true })}
          />
          <View className="px-4 pb-4">
            <ChatInput onSend={handleSend} />
          </View>
          <View className="px-4 pb-6">
            <CameraButton />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;
