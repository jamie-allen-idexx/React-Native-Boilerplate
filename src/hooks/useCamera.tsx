import { useCallback, useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';

export const useCamera = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [availableTypes, setAvailableTypes] = useState<CameraType[]>([]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const granted = status === 'granted';
    setHasPermission(granted);
    return granted;
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      try {
        const types = await Camera.getAvailableCameraTypesAsync();
        // types is an array of strings like 'front' | 'back'
        setAvailableTypes((types ?? []) as CameraType[]);
      } catch {
        setAvailableTypes([]);
      }
    })();
  }, []);

  const refreshAvailability = useCallback(async () => {
    try {
      const types = await Camera.getAvailableCameraTypesAsync();
      setAvailableTypes((types ?? []) as CameraType[]);
    } catch {
      setAvailableTypes([]);
    }
  }, []);

  return { hasPermission, requestPermission, availableTypes, refreshAvailability };
};


