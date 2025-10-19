'use client';

import { useEffect, useRef } from "react";

type UseIntervalOptions = {
  /** Run the callback immediately on mount before starting the interval. */
  immediate?: boolean;
};

/**
 * Declaratively manages a window interval tied to the component lifecycle.
 */
export function useInterval(callback: () => void, delay: number | null, options: UseIntervalOptions = {}): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return undefined;
    }

    if (options.immediate) {
      savedCallback.current();
    }

    const id = window.setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => window.clearInterval(id);
  }, [delay, options.immediate]);
}

