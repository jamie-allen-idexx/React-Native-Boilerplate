import { Camera, CameraType } from 'expo-camera';
import { Stack } from 'expo-router';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';

import { CameraButton } from '../src/components/CameraButton';
import { ChatInput } from '../src/components/ChatInput';
import { ChatMessage } from '../src/components/ChatMessage';
import { useCamera } from '../src/hooks/useCamera';
import { useChat } from '../src/hooks/useChat';

export default function ChatScreen() {
  const { messages, sendMessage, isLoading } = useChat();
  const { hasPermission, isCameraActive, activateCamera, deactivateCamera } =
    useCamera();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chat',
          headerBackTitle: 'Back',
        }}
      />
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View className="flex-1" testID="chat-screen">
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ChatMessage message={item} />}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
              inverted={false}
              testID="messages-list"
            />
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
            <CameraButton
              onPress={activateCamera}
              hasPermission={hasPermission}
            />
          </View>
        </KeyboardAvoidingView>

        {/* Camera Modal */}
        <Modal
          visible={isCameraActive}
          animationType="slide"
          onRequestClose={deactivateCamera}
          testID="camera-modal"
        >
          <Camera
            style={{ flex: 1 }}
            type={CameraType.back}
            testID="camera-view"
          >
            <View className="flex-1 items-center justify-end pb-10">
              <View
                className="rounded-full bg-white px-6 py-3"
                testID="close-camera-button"
              >
                <View onTouchEnd={deactivateCamera}>
                  <View className="px-4 py-2">
                    <View
                      testID="close-button-text"
                      className="text-lg font-semibold text-black"
                    >
                      Close Camera
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Camera>
        </Modal>
      </SafeAreaView>
    </>
  );
}
