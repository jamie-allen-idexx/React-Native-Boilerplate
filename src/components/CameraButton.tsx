import type React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CameraButtonProps {
  onPress: () => void;
  hasPermission: boolean | null;
}

export const CameraButton: React.FC<CameraButtonProps> = ({
  onPress,
  hasPermission,
}) => {
  return (
    <View
      className="absolute bottom-24 right-4"
      testID="camera-button-container"
    >
      <TouchableOpacity
        onPress={onPress}
        className="h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-lg"
        testID="camera-button"
        accessibilityLabel="Open Camera"
        accessibilityRole="button"
      >
        <Text className="text-2xl text-white" testID="camera-icon">
          📷
        </Text>
      </TouchableOpacity>
      {hasPermission === false && (
        <View
          className="absolute -top-8 right-0 rounded bg-red-500 px-2 py-1"
          testID="permission-warning"
        >
          <Text className="text-xs text-white">No permission</Text>
        </View>
      )}
    </View>
  );
};
