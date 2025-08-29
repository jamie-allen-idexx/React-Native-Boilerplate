import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, Text, View, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import { useCamera } from '@/hooks/useCamera';

const CameraButton = () => {
  const { hasPermission, requestPermission, availableTypes, refreshAvailability } = useCamera();
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<string | undefined>(undefined);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const onPress = () => {
    if (!hasPermission) return;
    setCameraError(null);
    setIsReady(false);
    setIsOpen(true);
    refreshAvailability();
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        className={`w-full items-center justify-center rounded-xl py-4 ${
          hasPermission ? 'bg-emerald-600' : 'bg-gray-400'
        }`}
      >
        <Text className="text-white font-semibold">
          {hasPermission ? 'Open Camera' : 'Camera Permission Required'}
        </Text>
      </Pressable>
      <Modal
        animationType="slide"
        visible={isOpen}
        onRequestClose={() => setIsOpen(false)}
        presentationStyle="fullScreen"
      >
        <View className="flex-1 bg-black">
          <Camera
            ref={(r) => (cameraRef.current = r)}
            style={{ flex: 1 }}
            type={availableTypes.includes(CameraType.back) ? CameraType.back : CameraType.front}
            {...(Platform.OS === 'android' && selectedRatio
              ? { ratio: selectedRatio }
              : {})}
            useCamera2Api={Platform.OS === 'android'}
            onCameraReady={async () => {
              try {
                // On Android, pick a supported ratio if available
                if (Platform.OS === 'android' && cameraRef.current) {
                  const ratios = await cameraRef.current.getSupportedRatiosAsync();
                  const preferred = ratios?.find((r) => r === '16:9') ?? ratios?.[0];
                  setSelectedRatio(preferred);
                }
                await cameraRef.current?.resumePreview();
              } catch (e) {
                // ignore
              } finally {
                setIsReady(true);
              }
            }}
            onMountError={(e) => setCameraError(e?.message ?? 'Unknown camera error')}
          />
          {!isReady && !cameraError ? (
            <View className="absolute inset-0 items-center justify-center">
              <Text className="text-white">Initializing camera...</Text>
            </View>
          ) : null}
          {cameraError ? (
            <View className="absolute inset-0 items-center justify-center bg-black/60 px-6">
              <Text className="text-red-400 text-center">{cameraError}</Text>
            </View>
          ) : null}
          <View className="absolute bottom-8 left-0 right-0 items-center">
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsOpen(false)}
              className="bg-white/90 px-6 py-3 rounded-full"
            >
              <Text className="text-black font-semibold">Close Camera</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export { CameraButton };


