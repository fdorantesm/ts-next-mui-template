'use client';

import { useDebouncedValue } from './useDebouncedValue';

/**
 * Alias for useDebouncedValue to maintain compatibility
 */
export function useDebounce<T>(value: T, delay = 300) {
  return useDebouncedValue(value, delay);
}