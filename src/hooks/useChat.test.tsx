import { act, renderHook, waitFor } from '@testing-library/react-native';

import AIAgentService from '../services/aiAgent';
import { useChat } from './useChat';

jest.mock('../services/aiAgent');

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with AI pleasantry message', () => {
    const mockPleasantry = {
      text: 'Hello! How can I help you today?',
      timestamp: new Date(),
    };
    (AIAgentService.getInitialPleasantry as jest.Mock).mockReturnValue(
      mockPleasantry,
    );

    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]?.text).toBe(mockPleasantry.text);
    expect(result.current.messages[0]?.sender).toBe('ai');
  });

  it('should start with isLoading as false', () => {
    (AIAgentService.getInitialPleasantry as jest.Mock).mockReturnValue({
      text: 'Hello!',
      timestamp: new Date(),
    });

    const { result } = renderHook(() => useChat());

    expect(result.current.isLoading).toBe(false);
  });

  it('should send user message and receive AI response', async () => {
    const mockPleasantry = {
      text: 'Hello!',
      timestamp: new Date(),
    };
    const mockResponse = {
      text: 'I can help with that!',
      timestamp: new Date(),
    };

    (AIAgentService.getInitialPleasantry as jest.Mock).mockReturnValue(
      mockPleasantry,
    );
    (AIAgentService.generateResponse as jest.Mock).mockResolvedValue(
      mockResponse,
    );

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('I need help');
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(3);
    });

    // Check user message
    expect(result.current.messages[1]?.text).toBe('I need help');
    expect(result.current.messages[1]?.sender).toBe('user');

    // Check AI response
    expect(result.current.messages[2]?.text).toBe(mockResponse.text);
    expect(result.current.messages[2]?.sender).toBe('ai');
  });

  it('should not send empty messages', async () => {
    (AIAgentService.getInitialPleasantry as jest.Mock).mockReturnValue({
      text: 'Hello!',
      timestamp: new Date(),
    });

    const { result } = renderHook(() => useChat());
    const initialLength = result.current.messages.length;

    await act(async () => {
      await result.current.sendMessage('');
      await result.current.sendMessage('   ');
    });

    expect(result.current.messages).toHaveLength(initialLength);
  });

  it('should handle AI response errors gracefully', async () => {
    (AIAgentService.getInitialPleasantry as jest.Mock).mockReturnValue({
      text: 'Hello!',
      timestamp: new Date(),
    });
    (AIAgentService.generateResponse as jest.Mock).mockRejectedValue(
      new Error('AI Error'),
    );

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Test message');
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(3);
    });

    // Check error message
    expect(result.current.messages[2]?.text).toBe(
      'Sorry, I encountered an error. Please try again.',
    );
    expect(result.current.messages[2]?.sender).toBe('ai');
  });

  it('should set isLoading during message processing', async () => {
    (AIAgentService.getInitialPleasantry as jest.Mock).mockReturnValue({
      text: 'Hello!',
      timestamp: new Date(),
    });
    (AIAgentService.generateResponse as jest.Mock).mockImplementation(
      () =>
        new Promise<{ text: string; timestamp: Date }>((resolve) => {
          setTimeout(
            () =>
              resolve({
                text: 'Response',
                timestamp: new Date(),
              }),
            100,
          );
        }),
    );

    const { result } = renderHook(() => useChat());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.sendMessage('Test');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
