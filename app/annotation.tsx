import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useAnnotation } from '@/hooks/useAnnotation';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ClearButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable onPress={onPress} className="mr-4">
    <Text className="font-semibold text-blue-600">Clear</Text>
  </Pressable>
);

const AnnotationScreen = () => {
  const {
    paths,
    currentPath,
    isDrawing,
    startDrawing,
    updateDrawing,
    endDrawing,
    clearCanvas,
  } = useAnnotation();

  const renderHeaderRight = useCallback(
    () => <ClearButton onPress={clearCanvas} />,
    [clearCanvas],
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Annotation',
          headerRight: renderHeaderRight,
        }}
      />
      <View className="flex-1 bg-gray-50">
        <View className="m-4 flex-1 rounded-lg bg-white shadow-sm">
          <Svg
            width={screenWidth - 32}
            height={screenHeight - 200}
            className="absolute inset-0"
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={(event) => {
              const { locationX, locationY } = event.nativeEvent;
              startDrawing(locationX, locationY);
            }}
            onResponderMove={(event) => {
              if (isDrawing) {
                const { locationX, locationY } = event.nativeEvent;
                updateDrawing(locationX, locationY);
              }
            }}
            onResponderRelease={endDrawing}
            onResponderTerminate={endDrawing}
          >
            {/* Render completed paths */}
            {paths.map((pathData) => (
              <Path
                key={pathData.id}
                d={pathData.path}
                stroke="rgba(59, 130, 246, 0.6)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
            {/* Render current path being drawn */}
            {currentPath && (
              <Path
                d={currentPath}
                stroke="rgba(59, 130, 246, 0.6)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </Svg>
        </View>
        <View className="p-4">
          <Text className="text-center text-sm text-gray-600">
            Draw on the canvas above to create annotations
          </Text>
        </View>
      </View>
    </>
  );
};

export default AnnotationScreen;
