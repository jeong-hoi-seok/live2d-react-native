/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          background: "#101415",
          error: "#ffb4ab",
          "error-container": "#93000a",
          "on-error": "#690005",
          "on-error-container": "#ffdad6",
          "on-primary": "#630e00",
          "on-primary-container": "#5e0d00",
          "on-secondary": "#2f3035",
          "on-secondary-container": "#b7b8be",
          "on-surface": "#e0e3e5",
          "on-surface-variant": "#e3beb7",
          outline: "#aa8982",
          "outline-variant": "#5a413b",
          primary: "#ffb4a4",
          "primary-container": "#ff5f3d",
          secondary: "#c6c6cc",
          "secondary-container": "#47494e",
          surface: "#101415",
          "surface-bright": "#363a3b",
          "surface-container": "#1d2022",
          "surface-container-high": "#272a2c",
          "surface-container-highest": "#323537",
          "surface-container-low": "#191c1e",
          "surface-container-lowest": "#0b0f10",
          "surface-dim": "#101415",
          "surface-tint": "#ffb4a4",
          "surface-variant": "#323537",
          tertiary: "#c3c6ce",
          "tertiary-container": "#91959c",
          text: "#e0e3e5",
          muted: "#e3beb7",
        },
      },
      fontFamily: {
        sans: ["Pretendard-Regular", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".font-medium": {
          fontFamily: "Pretendard-Medium",
        },
        ".font-semibold": {
          fontFamily: "Pretendard-SemiBold",
        },
        ".font-bold": {
          fontFamily: "Pretendard-Bold",
        },
      });
    },
  ],
};
