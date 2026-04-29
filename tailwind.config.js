/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#775a19",
          dark: "#5d4201",
          light: "#ffdea5",
        },
        background: {
          DEFAULT: "#fff8f3",
          light: "#fdfbf7",
          dark: "#1a1f1b",
        },
        surface: {
          DEFAULT: "#fff8f3",
          dim: "#e1d9d0",
          bright: "#fff8f3",
          container: {
            low: "#fbf2e9",
            DEFAULT: "#f5ede4",
            high: "#efe7de",
            highest: "#e9e1d8",
            lowest: "#ffffff",
          },
        },
        on: {
          surface: "#1e1b16",
          background: "#1e1b16",
          primary: "#ffffff",
          secondary: "#ffffff",
        },
        secondary: {
          DEFAULT: "#546253",
          light: "#e2e8df",
          dark: "#2d3730",
        },
        text: {
          light: "#333333",
          dark: "#f8f6f0",
        },
        accent: {
          gold: {
            DEFAULT: "#d4af37",
            light: "#e5c566",
          },
        },
        outline: {
          DEFAULT: "#7f7667",
          variant: "#d1c5b4",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-noto-serif)", "serif"],
        logo: ["var(--font-parisienne)", "cursive"],
        "body-md": ["var(--font-inter)"],
        "headline-lg": ["var(--font-noto-serif)"],
        "headline-md": ["var(--font-noto-serif)"],
        "display-xl": ["var(--font-noto-serif)"],
      },
      spacing: {
        unit: "4px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        xxl: "80px",
        gutter: "24px",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-50%, 0, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
