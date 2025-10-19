/**
 * Creates a new object including only the selected keys.
 */
export function pick<T extends object, K extends keyof T>(
  source: T,
  keys: readonly K[]
): Pick<T, K> {
  return keys.reduce<Pick<T, K>>((acc, key) => {
    if (key in source) {
      acc[key] = source[key];
    }

    return acc;
  }, {} as Pick<T, K>);
}

/**
 * Creates a new object without the provided keys.
 */
export function omit<T extends object, K extends keyof T>(
  source: T,
  keys: readonly K[]
): Omit<T, K> {
  const result = { ...source } as Omit<T, K>;

  for (const key of keys) {
    delete (result as Record<keyof T, unknown>)[key];
  }

  return result;
}
