import { Camera } from 'expo-camera';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface UseCameraReturn {
  hasPermission: boolean | null;
  isCameraActive: boolean;
  activateCamera: () => void;
  deactivateCamera: () => void;
  requestPermission: () => Promise<void>;
}

export function useCamera(): UseCameraReturn {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const checkPermission = async () => {
    const { status } = await Camera.getPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    checkPermission();
  }, []);

  const requestPermission = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();
    const granted = status === 'granted';
    setHasPermission(granted);

    if (!granted) {
      Alert.alert(
        'Camera Permission Required',
        'Please enable camera permissions in your device settings to use this feature.',
        [{ text: 'OK' }],
      );
    }
  }, []);

  const activateCamera = useCallback(() => {
    if (hasPermission === false) {
      requestPermission();
      return;
    }

    if (hasPermission === true) {
      setIsCameraActive(true);
    }
  }, [hasPermission, requestPermission]);

  const deactivateCamera = useCallback(() => {
    setIsCameraActive(false);
  }, []);

  return {
    hasPermission,
    isCameraActive,
    activateCamera,
    deactivateCamera,
    requestPermission,
  };
}
