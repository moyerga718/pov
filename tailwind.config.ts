import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        text: "var(--text)",
      },
      fontFamily: {
        CutiveMono: ["Cutive Mono", "monospace"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
