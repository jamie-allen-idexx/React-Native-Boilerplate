import { act, renderHook, waitFor } from '@testing-library/react-native';
import { Camera } from 'expo-camera';
import { Alert } from 'react-native';

import { useCamera } from './useCamera';

jest.mock('expo-camera');
jest.spyOn(Alert, 'alert');

describe('useCamera', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should check permission on mount', async () => {
    const mockGetPermissions = jest
      .fn()
      .mockResolvedValue({ status: 'granted' });
    (Camera.getPermissionsAsync as jest.Mock) = mockGetPermissions;

    renderHook(() => useCamera());

    await waitFor(() => {
      expect(mockGetPermissions).toHaveBeenCalled();
    });
  });

  it('should set hasPermission to true when granted', async () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    const { result } = renderHook(() => useCamera());

    await waitFor(() => {
      expect(result.current.hasPermission).toBe(true);
    });
  });

  it('should set hasPermission to false when denied', async () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useCamera());

    await waitFor(() => {
      expect(result.current.hasPermission).toBe(false);
    });
  });

  it('should start with camera inactive', () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    const { result } = renderHook(() => useCamera());

    expect(result.current.isCameraActive).toBe(false);
  });

  it('should activate camera when permission is granted', async () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    const { result } = renderHook(() => useCamera());

    await waitFor(() => {
      expect(result.current.hasPermission).toBe(true);
    });

    act(() => {
      result.current.activateCamera();
    });

    expect(result.current.isCameraActive).toBe(true);
  });

  it('should request permission when activating camera without permission', async () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });
    (Camera.requestPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useCamera());

    await waitFor(() => {
      expect(result.current.hasPermission).toBe(false);
    });

    act(() => {
      result.current.activateCamera();
    });

    await waitFor(() => {
      expect(Camera.requestPermissionsAsync).toHaveBeenCalled();
    });
  });

  it('should deactivate camera', async () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    const { result } = renderHook(() => useCamera());

    await waitFor(() => {
      expect(result.current.hasPermission).toBe(true);
    });

    act(() => {
      result.current.activateCamera();
    });

    expect(result.current.isCameraActive).toBe(true);

    act(() => {
      result.current.deactivateCamera();
    });

    expect(result.current.isCameraActive).toBe(false);
  });

  it('should show alert when permission is denied', async () => {
    (Camera.requestPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.requestPermission();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Camera Permission Required',
      'Please enable camera permissions in your device settings to use this feature.',
      [{ text: 'OK' }],
    );
  });

  it('should update hasPermission after requesting', async () => {
    (Camera.getPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });
    (Camera.requestPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });

    const { result } = renderHook(() => useCamera());

    await waitFor(() => {
      expect(result.current.hasPermission).toBe(false);
    });

    await act(async () => {
      await result.current.requestPermission();
    });

    expect(result.current.hasPermission).toBe(true);
  });
});
