"use client";

import { useRouter as useNextRouter } from "next/navigation";
import { useMemo } from "react";

type Router = ReturnType<typeof useNextRouter>;

export type IRouter = Router & {
  back: VoidFunction;
  forward: VoidFunction;
  reload: VoidFunction;
  push: (href: string, options?: { scroll?: boolean }) => void;
  replace: (href: string, options?: { scroll?: boolean }) => void;
};

/**
 * Wrapper around Next.js router with consistent API.
 * Must be used in Client Components only.
 */
export function useRouter(): IRouter {
  const router = useNextRouter();

  return useMemo(
    () => ({
      ...router,
      back: () => router.back(),
      forward: () => router.forward(),
      reload: () => router.refresh(),
      push: (href: string, options?: { scroll?: boolean }) =>
        router.push(href, options),
      replace: (href: string, options?: { scroll?: boolean }) =>
        router.replace(href, options),
    }),
    [router]
  );
}
