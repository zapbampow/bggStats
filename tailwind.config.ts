import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "425px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
} satisfies Config;
