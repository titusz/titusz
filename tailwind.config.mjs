import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Readex Pro Variable", ...defaultTheme.fontFamily.sans],
        serif: ["Newsreader Variable", ...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: "1.5",
            "h2": {
              fontSize: "1.15em",
              marginTop: "1.4em",
            },
            "h3": {
              fontSize: "1.05em",
              marginTop: "1.2em",
            },
            "li": {
              marginTop: "0.3em",
              marginBottom: "0.3em",
            },
            "code": {
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.65em",
              fontWeight: "100",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            "pre": {
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.85em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
