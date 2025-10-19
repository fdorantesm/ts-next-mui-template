import type { JSX, PropsWithChildren } from "react";

/**
 * Base application shell to centralize shared UI chrome (headers, sidebars, etc.).
 * Extend this component when wiring real layout elements.
 */
export function AppLayout({ children }: PropsWithChildren): JSX.Element {
  return <>{children}</>;
}
