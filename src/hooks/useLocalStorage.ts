'use client';

import { useState, useCallback } from 'react';

import { localStorageGetItem, localStorageSetItem } from 'src/utils/storage-available';

/**
 * Get data from localStorage
 */
export function getStorage<T>(key: string): T | null {
  return localStorageGetItem(key, null);
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    return localStorageGetItem(key, initialValue);
  });

  const update = useCallback(
    (updateValue: T | ((prevValue: T) => T)) => {
      const newValue = updateValue instanceof Function ? updateValue(state) : updateValue;

      setState(newValue);
      localStorageSetItem(key, newValue);
    },
    [key, state]
  );

  const reset = useCallback(() => {
    setState(initialValue);
    localStorageSetItem(key, initialValue);
  }, [key, initialValue]);

  return {
    state,
    update,
    reset,
  };
}
