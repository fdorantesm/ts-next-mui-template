'use client';

import { useEffect, useRef } from "react";

/**
 * Persists the previous value of a variable across renders.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
