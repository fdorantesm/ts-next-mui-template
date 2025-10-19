"use client";

import { useCallback } from "react";
import { usePathname } from "./usePathname";

export function useActiveLink(path: string, deep = true): boolean {
  const pathname = usePathname();

  const checkPath = useCallback(
    (itemPath: string) => {
      if (!pathname) return false;

      if (deep) {
        return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
      }
      return pathname === itemPath;
    },
    [pathname, deep]
  );

  return checkPath(path);
}
