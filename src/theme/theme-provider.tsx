"use client";

import type { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { createTheme } from "./create-theme";

import type {} from "./extend-theme-types";
import type { ThemeOptions } from "./types";

export type ThemeProviderProps = Partial<MuiThemeProviderProps> & {
  themeOverrides?: ThemeOptions;
};

/**
 * Theme provider component. Must be a Client Component.
 */
export function ThemeProvider({
  themeOverrides = {},
  children,
  ...other
}: ThemeProviderProps) {
  const theme = createTheme({
    themeOverrides,
  });

  return (
    <MuiThemeProvider theme={theme} {...other}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
}
