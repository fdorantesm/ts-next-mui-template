'use client';

import { useRef, useCallback } from 'react';

interface UseDoubleClickOptions {
  onSingle?: () => void;
  onDouble?: () => void;
  delay?: number;
}

/**
 * Hook to handle single and double click events
 */
export function useDoubleClick(options: UseDoubleClickOptions = {}) {
  const { onSingle, onDouble, delay = 200 } = options;
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    if (clickTimeout.current) {
      // Double click detected
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      onDouble?.();
    } else {
      // Set timeout for single click
      clickTimeout.current = setTimeout(() => {
        onSingle?.();
        clickTimeout.current = null;
      }, delay);
    }
  }, [onSingle, onDouble, delay]);

  return handleClick;
}