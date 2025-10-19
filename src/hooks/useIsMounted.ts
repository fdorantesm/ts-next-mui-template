'use client';

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a stable function that reports whether the component is currently mounted.
 */
export function useIsMounted(): () => boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}

