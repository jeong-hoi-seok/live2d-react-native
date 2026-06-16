/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          accent: "#2563eb",
          "accent-soft": "#dbeafe",
          background: "#f8fafc",
          muted: "#475569",
          surface: "#ffffff",
          text: "#0f172a",
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
