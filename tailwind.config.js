/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./index.ts", "./src/**/*.{js,jsx,ts,tsx}"],
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
    },
  },
  plugins: [],
};
