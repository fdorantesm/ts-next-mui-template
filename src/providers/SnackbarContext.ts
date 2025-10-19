"use client";

import { createContext } from "react";

type SnackbarPosition = {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
};

interface SnackbarOptions {
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
}

interface SnackbarProviderConfig {
  maxSnackbars?: number;
  position?: SnackbarPosition;
  spacing?: number; // Spacing between stacked notifications
}

interface SnackbarContextType {
  enqueueSnackbar: (message: string, options?: SnackbarOptions) => void;
  closeSnackbar: (id: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
export type {
  SnackbarOptions,
  SnackbarContextType,
  SnackbarProviderConfig,
  SnackbarPosition,
};
