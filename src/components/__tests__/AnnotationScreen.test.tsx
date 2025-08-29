import { renderHook } from '@testing-library/react-native';

import { useAnnotation } from '../../hooks/useAnnotation';

describe('AnnotationScreen related tests', () => {
  it('useAnnotation hook works correctly', () => {
    const { result } = renderHook(() => useAnnotation());

    expect(result.current.paths).toEqual([]);
    expect(result.current.currentPath).toBe('');
    expect(result.current.isDrawing).toBe(false);
    expect(typeof result.current.startDrawing).toBe('function');
    expect(typeof result.current.updateDrawing).toBe('function');
    expect(typeof result.current.endDrawing).toBe('function');
    expect(typeof result.current.clearCanvas).toBe('function');
  });
});
