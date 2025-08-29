import type React from 'react';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View
        className="flex-row items-center border-t border-gray-200 bg-white px-4 py-3"
        testID="chat-input-container"
      >
        <TextInput
          className="mr-3 flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-base"
          placeholder="Type a message..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
          multiline
          maxLength={500}
          editable={!isLoading}
          testID="message-input"
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
          className={`rounded-full px-4 py-2 ${
            message.trim() && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          testID="send-button"
        >
          <Text
            className={`font-semibold ${
              message.trim() && !isLoading ? 'text-white' : 'text-gray-500'
            }`}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
