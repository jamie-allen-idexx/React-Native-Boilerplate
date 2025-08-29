import { render, waitFor } from '@testing-library/react-native';

import { useCamera } from '../src/hooks/useCamera';
import { useChat } from '../src/hooks/useChat';
import ChatScreen from './chat';

// Mock expo-router
jest.mock('expo-router', () => ({
  Stack: {
    Screen: ({ children }: any) => children,
  },
}));

// Mock expo-camera
jest.mock('expo-camera', () => ({
  Camera: ({ children }: any) => children,
  CameraType: {
    back: 'back',
    front: 'front',
  },
}));

// Mock hooks
jest.mock('../src/hooks/useChat');
jest.mock('../src/hooks/useCamera');

describe('ChatScreen', () => {
  const mockSendMessage = jest.fn();
  const mockActivateCamera = jest.fn();
  const mockDeactivateCamera = jest.fn();

  const mockMessages = [
    {
      id: '1',
      text: 'Hello! How can I help you?',
      sender: 'ai' as const,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Hi there!',
      sender: 'user' as const,
      timestamp: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useChat as jest.Mock).mockReturnValue({
      messages: mockMessages,
      sendMessage: mockSendMessage,
      isLoading: false,
    });
    (useCamera as jest.Mock).mockReturnValue({
      hasPermission: true,
      isCameraActive: false,
      activateCamera: mockActivateCamera,
      deactivateCamera: mockDeactivateCamera,
      requestPermission: jest.fn(),
    });
  });

  it('should render chat screen components', async () => {
    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      expect(getByTestId('chat-screen')).toBeTruthy();
      expect(getByTestId('messages-list')).toBeTruthy();
    });
  });

  it('should display messages from useChat hook', async () => {
    const { getByText } = render(<ChatScreen />);

    await waitFor(() => {
      expect(getByText('Hello! How can I help you?')).toBeTruthy();
      expect(getByText('Hi there!')).toBeTruthy();
    });
  });

  it('should render ChatInput component', async () => {
    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      expect(getByTestId('chat-input-container')).toBeTruthy();
    });
  });

  it('should render CameraButton component', async () => {
    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      expect(getByTestId('camera-button-container')).toBeTruthy();
    });
  });

  it('should not show camera modal when camera is inactive', async () => {
    const { queryByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      const modal = queryByTestId('camera-modal');
      expect(modal?.props.visible).toBe(false);
    });
  });

  it('should show camera modal when camera is active', async () => {
    (useCamera as jest.Mock).mockReturnValue({
      hasPermission: true,
      isCameraActive: true,
      activateCamera: mockActivateCamera,
      deactivateCamera: mockDeactivateCamera,
      requestPermission: jest.fn(),
    });

    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      const modal = getByTestId('camera-modal');
      expect(modal.props.visible).toBe(true);
    });
  });

  it('should pass isLoading to ChatInput', async () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: mockMessages,
      sendMessage: mockSendMessage,
      isLoading: true,
    });

    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      const input = getByTestId('message-input');
      expect(input.props.editable).toBe(false);
    });
  });

  it('should render FlatList with messages', async () => {
    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      const list = getByTestId('messages-list');
      expect(list.props.data).toEqual(mockMessages);
    });
  });

  it('should use message id as keyExtractor', async () => {
    const { getByTestId } = render(<ChatScreen />);

    await waitFor(() => {
      const list = getByTestId('messages-list');
      const { keyExtractor } = list.props;
      expect(keyExtractor(mockMessages[0])).toBe('1');
      expect(keyExtractor(mockMessages[1])).toBe('2');
    });
  });
});
