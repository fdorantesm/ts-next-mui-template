import createCache from "@emotion/cache";
import type { EmotionCache } from "@emotion/cache";

/**
 * Creates a fresh emotion cache. Use per-request during SSR to avoid leaking styles between users.
 */
export function createEmotionCache(): EmotionCache {
  return createCache({ key: "mui", prepend: true });
}
