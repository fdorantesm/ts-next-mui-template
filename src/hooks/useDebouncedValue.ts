'use client';

import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of a value to help throttle expensive reactions.
 */
export function useDebouncedValue<T>(input: T, delay = 300) {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const handle = window.setTimeout(() => setValue(input), delay);
    return () => window.clearTimeout(handle);
  }, [input, delay]);

  return value;
}
