/**
 * Returns a new array of unique values based on the provided mapper.
 */
export function uniqBy<T, Key>(items: readonly T[], mapper: (item: T) => Key): T[] {
  const seen = new Set<Key>();
  const result: T[] = [];

  for (const item of items) {
    const key = mapper(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

/**
 * Breaks an array into chunks of the given size.
 */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("chunk size must be greater than 0");
  }

  const result: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }

  return result;
}

