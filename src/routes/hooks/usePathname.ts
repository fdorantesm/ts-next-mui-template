"use client";

import { usePathname as useNextPathname } from "next/navigation";

/**
 * Get the current pathname.
 * Must be used in Client Components only.
 */
export function usePathname() {
  return useNextPathname();
}
