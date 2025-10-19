/**
 * Reads Next.js environment variables, providing optional defaults for unset keys.
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`Missing required environment variable: ${key}`);
}
