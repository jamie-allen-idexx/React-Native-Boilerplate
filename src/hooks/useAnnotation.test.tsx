import { act, renderHook } from '@testing-library/react-native';

import { useAnnotation } from './useAnnotation';

describe('useAnnotation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useAnnotation());

    expect(result.current.paths).toEqual([]);
    expect(result.current.currentPath).toBe('');
    expect(result.current.isDrawing).toBe(false);
  });

  it('starts drawing correctly', () => {
    const { result } = renderHook(() => useAnnotation());

    act(() => {
      result.current.startDrawing(10, 20);
    });

    expect(result.current.isDrawing).toBe(true);
    expect(result.current.currentPath).toBe('M10,20');
  });

  it('updates drawing path when drawing', () => {
    const { result } = renderHook(() => useAnnotation());

    act(() => {
      result.current.startDrawing(10, 20);
    });

    act(() => {
      result.current.updateDrawing(15, 25);
    });

    expect(result.current.currentPath).toBe('M10,20 L15,25');
  });

  it('does not update path when not drawing', () => {
    const { result } = renderHook(() => useAnnotation());

    act(() => {
      result.current.updateDrawing(15, 25);
    });

    expect(result.current.currentPath).toBe('');
  });

  it('ends drawing and saves path', () => {
    const { result } = renderHook(() => useAnnotation());

    act(() => {
      result.current.startDrawing(10, 20);
    });

    act(() => {
      result.current.updateDrawing(15, 25);
    });

    act(() => {
      result.current.endDrawing();
    });

    expect(result.current.isDrawing).toBe(false);
    expect(result.current.currentPath).toBe('');
    expect(result.current.paths).toHaveLength(1);
    expect(result.current.paths[0]?.path).toBe('M10,20 L15,25');
    expect(result.current.paths[0]?.id).toMatch(/^path-/);
  });

  it('does not save path when ending drawing without current path', () => {
    const { result } = renderHook(() => useAnnotation());

    act(() => {
      result.current.endDrawing();
    });

    expect(result.current.paths).toEqual([]);
  });

  it('clears canvas and resets all state', () => {
    const { result } = renderHook(() => useAnnotation());

    // Draw something first
    act(() => {
      result.current.startDrawing(10, 20);
    });

    act(() => {
      result.current.updateDrawing(15, 25);
    });

    act(() => {
      result.current.endDrawing();
    });

    // Now clear
    act(() => {
      result.current.clearCanvas();
    });

    expect(result.current.paths).toEqual([]);
    expect(result.current.currentPath).toBe('');
    expect(result.current.isDrawing).toBe(false);
  });

  it('handles multiple drawing sessions', () => {
    const { result } = renderHook(() => useAnnotation());

    // First drawing
    act(() => {
      result.current.startDrawing(0, 0);
    });

    act(() => {
      result.current.updateDrawing(10, 10);
    });

    act(() => {
      result.current.endDrawing();
    });

    // Second drawing
    act(() => {
      result.current.startDrawing(20, 20);
    });

    act(() => {
      result.current.updateDrawing(30, 30);
    });

    act(() => {
      result.current.endDrawing();
    });

    expect(result.current.paths).toHaveLength(2);
    expect(result.current.paths[0]?.path).toBe('M0,0 L10,10');
    expect(result.current.paths[1]?.path).toBe('M20,20 L30,30');
    expect(result.current.paths[0]?.id).toMatch(/^path-/);
    expect(result.current.paths[1]?.id).toMatch(/^path-/);
  });
});
