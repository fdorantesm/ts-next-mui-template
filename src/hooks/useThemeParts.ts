'use client';

import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import type {
  Theme,
  Palette,
  Breakpoints,
  Transitions,
  ZIndex,
  Mixins,
} from "@mui/material/styles";

/**
 * Hook para obtener partes específicas del theme de Material-UI
 * Proporciona acceso fácil y tipado a diferentes secciones del theme
 */

type ThemeParts = {
  palette: Palette;
  typography: Theme["typography"];
  spacing: Theme["spacing"];
  breakpoints: Breakpoints;
  transitions: Transitions;
  zIndex: ZIndex;
  mixins: Mixins;
  shape: Theme["shape"];
  shadows: Theme["shadows"];
  direction: Theme["direction"];
};

type UseThemePartsReturn<T extends keyof ThemeParts> = {
  [K in T]: ThemeParts[K];
} & {
  theme: Theme;
};

/**
 * Hook que permite obtener partes específicas del theme
 *
 * @param parts - Array de las partes del theme que quieres obtener
 * @returns Objeto con las partes solicitadas del theme más el theme completo
 *
 * @example
 * ```tsx
 * // Obtener solo palette y typography
 * const { palette, typography } = useThemeParts(['palette', 'typography']);
 *
 * // Obtener spacing y breakpoints
 * const { spacing, breakpoints } = useThemeParts(['spacing', 'breakpoints']);
 *
 * // Obtener todas las partes
 * const themeParts = useThemeParts([
 *   'palette', 'typography', 'spacing', 'breakpoints',
 *   'transitions', 'zIndex', 'mixins', 'shape', 'shadows'
 * ]);
 * ```
 */
export function useThemeParts<T extends keyof ThemeParts>(
  parts: readonly T[]
): UseThemePartsReturn<T> {
  const theme = useTheme();

  const themeParts = useMemo(() => {
    const result = { theme } as UseThemePartsReturn<T>;

    for (const part of parts) {
      (result as Record<string, unknown>)[part] = theme[part];
    }

    return result;
  }, [theme, parts]);

  return themeParts;
}

/**
 * Hook específico para obtener solo la palette del theme
 *
 * @returns Objeto con la palette del theme
 *
 * @example
 * ```tsx
 * const { palette } = useThemePalette();
 * const primaryColor = palette.primary.main;
 * ```
 */
export function useThemePalette() {
  return useThemeParts(["palette"] as const);
}

/**
 * Hook específico para obtener solo la typography del theme
 *
 * @returns Objeto con la typography del theme
 *
 * @example
 * ```tsx
 * const { typography } = useThemeTypography();
 * const h1FontSize = typography.h1.fontSize;
 * ```
 */
export function useThemeTypography() {
  return useThemeParts(["typography"] as const);
}

/**
 * Hook específico para obtener spacing y breakpoints (útil para layouts)
 *
 * @returns Objeto con spacing y breakpoints del theme
 *
 * @example
 * ```tsx
 * const { spacing, breakpoints } = useThemeLayout();
 * const padding = spacing(2); // 16px por defecto
 * const isMobile = breakpoints.down('sm');
 * ```
 */
export function useThemeLayout() {
  return useThemeParts(["spacing", "breakpoints"] as const);
}

/**
 * Hook específico para obtener propiedades de animación y transiciones
 *
 * @returns Objeto con transitions y shape del theme
 *
 * @example
 * ```tsx
 * const { transitions, shape } = useThemeAnimation();
 * const duration = transitions.duration.short;
 * const borderRadius = shape.borderRadius;
 * ```
 */
export function useThemeAnimation() {
  return useThemeParts(["transitions", "shape"] as const);
}

/**
 * Hook específico para obtener propiedades de elevación y capas
 *
 * @returns Objeto con shadows y zIndex del theme
 *
 * @example
 * ```tsx
 * const { shadows, zIndex } = useThemeElevation();
 * const cardShadow = shadows[2];
 * const modalZIndex = zIndex.modal;
 * ```
 */
export function useThemeElevation() {
  return useThemeParts(["shadows", "zIndex"] as const);
}
