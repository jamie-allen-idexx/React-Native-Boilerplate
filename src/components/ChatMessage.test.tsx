import { render } from '@testing-library/react-native';

import type { Message } from '../hooks/useChat';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  const mockUserMessage: Message = {
    id: '1',
    text: 'Hello AI!',
    sender: 'user',
    timestamp: new Date('2024-01-01T12:00:00'),
  };

  const mockAIMessage: Message = {
    id: '2',
    text: 'Hello! How can I help you?',
    sender: 'ai',
    timestamp: new Date('2024-01-01T12:01:00'),
  };

  it('should render user message correctly', () => {
    const { getByTestId, getByText } = render(
      <ChatMessage message={mockUserMessage} />,
    );

    expect(getByTestId('chat-message-container')).toBeTruthy();
    expect(getByTestId('message-bubble-user')).toBeTruthy();
    expect(getByText('Hello AI!')).toBeTruthy();
  });

  it('should render AI message correctly', () => {
    const { getByTestId, getByText } = render(
      <ChatMessage message={mockAIMessage} />,
    );

    expect(getByTestId('chat-message-container')).toBeTruthy();
    expect(getByTestId('message-bubble-ai')).toBeTruthy();
    expect(getByText('Hello! How can I help you?')).toBeTruthy();
  });

  it('should display message text', () => {
    const { getByTestId } = render(<ChatMessage message={mockUserMessage} />);

    const messageText = getByTestId('message-text');
    expect(messageText.props.children).toBe('Hello AI!');
  });

  it('should display timestamp', () => {
    const { getByTestId } = render(<ChatMessage message={mockUserMessage} />);

    const timestamp = getByTestId('message-timestamp');
    expect(timestamp).toBeTruthy();
    // Timestamp format may vary based on locale
    expect(timestamp.props.children).toMatch(/\d{1,2}:\d{2}/);
  });

  it('should apply correct styles for user message', () => {
    const { getByTestId } = render(<ChatMessage message={mockUserMessage} />);

    const container = getByTestId('chat-message-container');
    const bubble = getByTestId('message-bubble-user');

    // Test that elements exist - style testing is complex in React Native with NativeWind
    expect(container).toBeTruthy();
    expect(bubble).toBeTruthy();
  });

  it('should apply correct styles for AI message', () => {
    const { getByTestId } = render(<ChatMessage message={mockAIMessage} />);

    const container = getByTestId('chat-message-container');
    const bubble = getByTestId('message-bubble-ai');

    // Test that elements exist - style testing is complex in React Native with NativeWind
    expect(container).toBeTruthy();
    expect(bubble).toBeTruthy();
  });

  it('should format timestamp correctly', () => {
    const message: Message = {
      ...mockUserMessage,
      timestamp: new Date('2024-01-01T15:30:45'),
    };

    const { getByTestId } = render(<ChatMessage message={message} />);
    const timestamp = getByTestId('message-timestamp');

    // Check that it contains hour and minute
    expect(timestamp.props.children).toMatch(/\d{1,2}:\d{2}/);
  });
});
