import { useCallback, useState } from 'react';
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
      <View className="flex-1 rounded-xl border border-black/5 bg-gray-100 px-3 py-2">
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
        className="rounded-xl bg-blue-600 px-4 py-3"
      >
        <Text className="font-semibold text-white">Send</Text>
      </Pressable>
    </View>
  );
};

export { ChatInput };
