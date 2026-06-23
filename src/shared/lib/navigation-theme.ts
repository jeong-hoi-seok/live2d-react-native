import { DarkTheme } from "@react-navigation/native";

export const APP_BACKGROUND = "#1a1a1a";
export const APP_SURFACE = "#1f1f1f";

export const APP_DARK_THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#dadada",
    background: APP_BACKGROUND,
    card: APP_SURFACE,
    text: "#dadada",
    border: "#2a2a2a",
    notification: "#ef4444",
  },
};
