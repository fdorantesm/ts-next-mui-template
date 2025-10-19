'use client';

import { useCallback, useState } from 'react';

/**
 * Generic boolean flag handler; expand with domain-specific cases as needed.
 */
export function useBoolean(initialState = false) {
  const [value, setValue] = useState(initialState);

  const onTrue = useCallback(() => setValue(true), []);
  const onFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return { value, onTrue, onFalse, toggle } as const;
}
