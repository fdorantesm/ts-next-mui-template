export function storageAvailable(
  type: "localStorage" | "sessionStorage"
): boolean {
  try {
    const storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch {
    return false;
  }
}

export function localStorageGetItem<T = unknown>(
  key: string,
  defaultValue?: T
): T | undefined {
  if (!storageAvailable("localStorage")) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function localStorageSetItem(key: string, value: unknown): void {
  if (!storageAvailable("localStorage")) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail
  }
}
