import { useCallback, useState } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface PathData {
  id: string;
  path: string;
}

export const useAnnotation = () => {
  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = useCallback((x: number, y: number) => {
    setIsDrawing(true);
    const newPath = `M${x},${y}`;
    setCurrentPath(newPath);
  }, []);

  const updateDrawing = useCallback(
    (x: number, y: number) => {
      if (!isDrawing) return;

      setCurrentPath((prevPath) => `${prevPath} L${x},${y}`);
    },
    [isDrawing],
  );

  const endDrawing = useCallback(() => {
    if (!isDrawing || !currentPath) return;

    setIsDrawing(false);
    setPaths((prevPaths) => [
      ...prevPaths,
      { id: `path-${Date.now()}-${Math.random()}`, path: currentPath },
    ]);
    setCurrentPath('');
  }, [isDrawing, currentPath]);

  const clearCanvas = useCallback(() => {
    setPaths([]);
    setCurrentPath('');
    setIsDrawing(false);
  }, []);

  return {
    paths,
    currentPath,
    isDrawing,
    startDrawing,
    updateDrawing,
    endDrawing,
    clearCanvas,
  };
};
