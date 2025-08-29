import React, { useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

type ChatInputProps = {
  onSend: (text: string) => void | Promise<void>;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [text, setText] = useState('');

  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await onSend(trimmed);
    setText('');
  }, [onSend, text]);

  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-1 bg-gray-100 rounded-xl px-3 py-2 border border-black/5">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          className="text-base"
          multiline
        />
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={handleSend}
        className="bg-blue-600 px-4 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Send</Text>
      </Pressable>
    </View>
  );
};

export { ChatInput };


