'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Serializer<T> = (value: T) => string;
type Deserializer<T> = (value: string) => T;

type StorageHookOptions<T> = {
  serializer?: Serializer<T>;
  deserializer?: Deserializer<T>;
};

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function createStorageHook(storage: StorageLike | undefined | null) {
  return function useStorageState<T>(
    key: string,
    initialValue: T | (() => T),
    options: StorageHookOptions<T> = {}
  ): [T, (value: T | ((prev: T) => T)) => void, () => void] {
    const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

    const getInitialValue = useCallback((): T => {
      const resolveInitial = (value: T | (() => T)) =>
        value instanceof Function ? value() : value;

      if (!storage) {
        return resolveInitial(initialValue);
      }

      const storedValue = storage.getItem(key);

      if (storedValue === null) {
        return resolveInitial(initialValue);
      }

      try {
        return deserializer(storedValue);
      } catch {
        return resolveInitial(initialValue);
      }
    }, [deserializer, initialValue, key]);

    const [state, setState] = useState<T>(getInitialValue);

    const isInitialMount = useRef(true);

    useEffect(() => {
      if (!storage) {
        return undefined;
      }

      if (isInitialMount.current) {
        isInitialMount.current = false;
        return undefined;
      }

      try {
        storage.setItem(key, serializer(state));
      } catch {
        // Swallow storage errors (e.g., quota exceeded) to avoid breaking the UI.
      }

      return undefined;
    }, [key, serializer, state]);

    const setValue = useCallback((value: T | ((prev: T) => T)) => {
      setState((prev) => (value instanceof Function ? value(prev) : value));
    }, []);

    const remove = useCallback(() => {
      if (!storage) {
        return;
      }
      storage.removeItem(key);
    }, [key]);

    return [state, setValue, remove];
  };
}

const localStorageLike = isBrowser() ? window.localStorage : undefined;
const sessionStorageLike = isBrowser() ? window.sessionStorage : undefined;

/**
 * Persists state to localStorage with JSON serialization by default.
 */
export const useLocalStorage = createStorageHook(localStorageLike);

/**
 * Persists state to sessionStorage with JSON serialization by default.
 */
export const useSessionStorage = createStorageHook(sessionStorageLike);
