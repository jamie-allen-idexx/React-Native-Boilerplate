import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import Home from './index';

// Mock expo-router
jest.mock('expo-router', () => ({
  Stack: {
    Screen: ({ children }: any) => children,
  },
  useRouter: jest.fn(),
}));

// Mock Welcome component
jest.mock('@/templates/Welcome', () => ({
  Welcome: () => null,
}));

describe('Home', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('should render home screen components', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Connect')).toBeTruthy();
  });

  it('should navigate to chat screen when Connect button is pressed', () => {
    const { getByText } = render(<Home />);

    const connectButton = getByText('Connect');
    fireEvent.press(connectButton);

    expect(mockPush).toHaveBeenCalledWith('/chat');
  });

  it('should call router.push only once when button is pressed', () => {
    const { getByText } = render(<Home />);

    const connectButton = getByText('Connect');
    fireEvent.press(connectButton);

    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('should have Connect as button title', () => {
    const { getByText } = render(<Home />);

    const button = getByText('Connect');
    expect(button).toBeTruthy();
  });
});
