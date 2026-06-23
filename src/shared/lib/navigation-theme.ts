import { DarkTheme } from "@react-navigation/native";

import { DESIGN_COLORS } from "./design-system";

export const APP_BACKGROUND = DESIGN_COLORS.background;
export const APP_SURFACE = DESIGN_COLORS.surfaceContainer;

export const APP_DARK_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: DESIGN_COLORS.primary,
    background: APP_BACKGROUND,
    card: APP_SURFACE,
    text: DESIGN_COLORS.onSurface,
    border: DESIGN_COLORS.outlineVariant,
    notification: DESIGN_COLORS.error,
  },
};
