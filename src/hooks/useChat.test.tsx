import { act, renderHook } from '@testing-library/react-native';

import * as aiAgentModule from '@/services/aiAgent';

import { useChat } from './useChat';

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with AI greeting', () => {
    jest
      .spyOn(aiAgentModule.aiAgent, 'getInitialPleasantry')
      .mockReturnValue('Hello!');
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0]?.text).toBe('Hello!');
    expect(result.current.messages[0]?.sender).toBe('ai');
  });

  it('sendMessage adds user and ai messages', async () => {
    jest
      .spyOn(aiAgentModule.aiAgent, 'respond')
      .mockResolvedValue('AI response');
    const { result } = renderHook(() => useChat());
    await act(async () => {
      await result.current.sendMessage('Hi');
    });
    expect(result.current.messages).toHaveLength(3);
    expect(result.current.messages[1]?.text).toBe('Hi');
    expect(result.current.messages[1]?.sender).toBe('user');
    expect(result.current.messages[2]?.text).toBe('AI response');
    expect(result.current.messages[2]?.sender).toBe('ai');
  });
});
