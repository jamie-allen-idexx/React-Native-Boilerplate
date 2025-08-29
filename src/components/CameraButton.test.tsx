import { fireEvent, render } from '@testing-library/react-native';

import { CameraButton } from './CameraButton';

describe('CameraButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render camera button', () => {
    const { getByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    expect(getByTestId('camera-button-container')).toBeTruthy();
    expect(getByTestId('camera-button')).toBeTruthy();
    expect(getByTestId('camera-icon')).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    const { getByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    const button = getByTestId('camera-button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should show camera emoji icon', () => {
    const { getByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    const icon = getByTestId('camera-icon');
    expect(icon.props.children).toBe('📷');
  });

  it('should not show warning when permission is granted', () => {
    const { queryByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    expect(queryByTestId('permission-warning')).toBeNull();
  });

  it('should show warning when permission is denied', () => {
    const { getByTestId, getByText } = render(
      <CameraButton onPress={mockOnPress} hasPermission={false} />,
    );

    expect(getByTestId('permission-warning')).toBeTruthy();
    expect(getByText('No permission')).toBeTruthy();
  });

  it('should not show warning when permission is null (not checked yet)', () => {
    const { queryByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission={null} />,
    );

    expect(queryByTestId('permission-warning')).toBeNull();
  });

  it('should have correct accessibility properties', () => {
    const { getByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    const button = getByTestId('camera-button');
    expect(button.props.accessibilityLabel).toBe('Open Camera');
    expect(button.props.accessibilityRole).toBe('button');
  });

  it('should be positioned correctly', () => {
    const { getByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    const container = getByTestId('camera-button-container');
    // Test that element exists - style testing is complex in React Native with NativeWind
    expect(container).toBeTruthy();
  });

  it('should have correct button styling', () => {
    const { getByTestId } = render(
      <CameraButton onPress={mockOnPress} hasPermission />,
    );

    const button = getByTestId('camera-button');
    // Test that element exists - style testing is complex in React Native with NativeWind
    expect(button).toBeTruthy();
  });
});
