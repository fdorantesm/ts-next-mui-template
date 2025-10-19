"use client";

import type { JSX, PropsWithChildren } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider } from "@/theme/theme-provider";
import type { ThemeOptions } from "@/theme/types";
import { SnackbarProvider } from "./SnackbarProvider";
import type { SnackbarProviderConfig } from "./SnackbarContext";

type AppProvidersProps = PropsWithChildren<{
  themeOverrides?: ThemeOptions;
  snackbarConfig?: SnackbarProviderConfig;
}>;

/**
 * Central registry for context providers shared across the application shell.
 * This component must be a Client Component due to context providers.
 */
export function AppProviders({
  children,
  themeOverrides,
  snackbarConfig,
}: AppProvidersProps): JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider themeOverrides={themeOverrides}>
        <SnackbarProvider {...snackbarConfig}>{children}</SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
