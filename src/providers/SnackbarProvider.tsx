"use client";

import React, { useState, useCallback } from "react";
import { Box, Alert, IconButton, Slide, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  SnackbarContext,
  type SnackbarOptions,
  type SnackbarContextType,
  type SnackbarProviderConfig,
} from "./SnackbarContext";

interface SnackbarMessage {
  id: string;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
  variant?: "filled" | "outlined" | "standard";
  timestamp: number;
}

interface SnackbarProviderProps extends SnackbarProviderConfig {
  children: React.ReactNode;
}

const defaultConfig: Required<SnackbarProviderConfig> = {
  maxSnackbars: 5,
  position: { vertical: "top", horizontal: "right" },
  spacing: 8,
};

export function SnackbarProvider({
  children,
  maxSnackbars = defaultConfig.maxSnackbars,
  position = defaultConfig.position,
  spacing = defaultConfig.spacing,
}: SnackbarProviderProps) {
  const [allSnackbars, setAllSnackbars] = useState<SnackbarMessage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const closeSnackbar = useCallback((id: string) => {
    setAllSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const enqueueSnackbar = useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newSnackbar: SnackbarMessage = {
        id,
        message,
        severity: "success",
        autoHideDuration: 3000,
        timestamp: Date.now(),
        ...options,
      };

      setAllSnackbars((prev) => [...prev, newSnackbar]);

      // Auto-close the notification if autoHideDuration is set
      if (newSnackbar.autoHideDuration && newSnackbar.autoHideDuration > 0) {
        setTimeout(() => {
          closeSnackbar(id);
        }, newSnackbar.autoHideDuration);
      }
    },
    [closeSnackbar]
  );

  const contextValue: SnackbarContextType = {
    enqueueSnackbar,
    closeSnackbar,
  };

  // Calculate visible notifications
  const visibleSnackbars = isExpanded
    ? allSnackbars
    : allSnackbars.slice(-maxSnackbars);
  const hiddenCount = allSnackbars.length - maxSnackbars;
  const hasHiddenNotifications = !isExpanded && hiddenCount > 0;

  // Calculate container position
  const getContainerStyles = () => {
    const styles: Record<string, string | number> = {
      position: "fixed",
      zIndex: 1400,
      maxWidth: 400,
      width: "100%",
      maxHeight: isExpanded ? "calc(100vh - 48px)" : "auto", // Allow more height when expanded
      overflowY: isExpanded ? "auto" : "visible", // Enable scroll when expanded
    };

    // Vertical positioning
    if (position.vertical === "top") {
      styles.top = 24;
    } else {
      styles.bottom = 24;
    }

    // Horizontal positioning
    if (position.horizontal === "left") {
      styles.left = 24;
    } else if (position.horizontal === "center") {
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
    } else {
      styles.right = 24;
    }

    return styles;
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      {allSnackbars.length > 0 && (
        <Box sx={getContainerStyles()}>
          <Box
            sx={{
              display: "flex",
              flexDirection:
                position.vertical === "top" ? "column" : "column-reverse",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Scrollable notifications container */}
            <Box
              sx={{
                display: "flex",
                flexDirection:
                  position.vertical === "top" ? "column" : "column-reverse",
                gap: spacing / 8,
                width: "100%",
                flex: 1,
                overflowY: isExpanded ? "auto" : "visible",
                maxHeight: isExpanded ? "calc(100vh - 120px)" : "auto",
                // Custom scrollbar styling
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "3px",
                  "&:hover": {
                    background: "rgba(0,0,0,0.3)",
                  },
                },
              }}
            >
              {/* Visible notifications */}
              {visibleSnackbars.map((snackbar) => (
                <Slide
                  key={snackbar.id}
                  direction={position.horizontal === "left" ? "right" : "left"}
                  in={true}
                  timeout={300}
                >
                  <Alert
                    variant={snackbar.variant || "filled"}
                    severity={snackbar.severity}
                    onClose={() => closeSnackbar(snackbar.id)}
                    action={
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => closeSnackbar(snackbar.id)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{
                      width: "100%",
                      boxShadow: 2,
                      "& .MuiAlert-message": {
                        width: "100%",
                      },
                    }}
                  >
                    {snackbar.message}
                  </Alert>
                </Slide>
              ))}
            </Box>

            {/* Toggle button at bottom */}
            {hasHiddenNotifications && (
              <Box
                sx={{
                  mt: position.vertical === "top" ? spacing / 8 : 0,
                  mb: position.vertical === "bottom" ? spacing / 8 : 0,
                  display: "flex",
                  justifyContent:
                    position.horizontal === "center"
                      ? "center"
                      : position.horizontal === "left"
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={toggleExpanded}
                  startIcon={
                    isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  }
                  sx={{
                    minWidth: "auto",
                    px: 1,
                    py: 0.5,
                    fontSize: "0.75rem",
                    borderColor: "divider",
                    color: "text.secondary",
                    backgroundColor: "background.paper",
                    backdropFilter: "blur(8px)",
                    boxShadow: 1,
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "action.hover",
                      boxShadow: 2,
                    },
                  }}
                >
                  {isExpanded ? "Colapsar" : `+${hiddenCount} más`}
                </Button>
              </Box>
            )}

            {/* Collapse button when expanded (for better UX) */}
            {isExpanded &&
              !hasHiddenNotifications &&
              allSnackbars.length > maxSnackbars && (
                <Box
                  sx={{
                    mt: position.vertical === "top" ? spacing / 8 : 0,
                    mb: position.vertical === "bottom" ? spacing / 8 : 0,
                    display: "flex",
                    justifyContent:
                      position.horizontal === "center"
                        ? "center"
                        : position.horizontal === "left"
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleExpanded}
                    startIcon={<ExpandLessIcon />}
                    sx={{
                      minWidth: "auto",
                      px: 1,
                      py: 0.5,
                      fontSize: "0.75rem",
                      borderColor: "divider",
                      color: "text.secondary",
                      backgroundColor: "background.paper",
                      backdropFilter: "blur(8px)",
                      boxShadow: 1,
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "action.hover",
                        boxShadow: 2,
                      },
                    }}
                  >
                    Colapsar
                  </Button>
                </Box>
              )}
          </Box>
        </Box>
      )}
    </SnackbarContext.Provider>
  );
}
