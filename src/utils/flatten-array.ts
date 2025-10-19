export function flattenArray<T>(arr: T[] | null | undefined): T[] {
  if (!arr || !Array.isArray(arr)) {
    return [];
  }

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(flattenArray(val));
    }
    return acc.concat(val);
  }, [] as T[]);
}
