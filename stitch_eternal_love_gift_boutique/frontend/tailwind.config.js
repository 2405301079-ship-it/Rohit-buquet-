/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#570013",
        "on-primary": "#ffffff",
        "primary-container": "#800020",
        "on-primary-container": "#ff828a",
        "primary-fixed": "#ffdada",
        "primary-fixed-dim": "#ffb3b5",
        "on-primary-fixed": "#40000b",
        "on-primary-fixed-variant": "#8e0f28",
        "inverse-primary": "#ffb3b5",

        "secondary": "#735c00",
        "on-secondary": "#ffffff",
        "secondary-container": "#fed65b",
        "on-secondary-container": "#745c00",
        "secondary-fixed": "#ffe088",
        "secondary-fixed-dim": "#e9c349",
        "on-secondary-fixed": "#241a00",
        "on-secondary-fixed-variant": "#574500",

        "tertiary": "#2c2627",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#423c3c",
        "on-tertiary-container": "#afa6a6",
        "tertiary-fixed": "#ebe0e0",
        "tertiary-fixed-dim": "#cec4c4",
        "on-tertiary-fixed": "#1f1a1b",
        "on-tertiary-fixed-variant": "#4c4546",

        "surface": "#fbf9f1",
        "on-surface": "#1b1c17",
        "surface-dim": "#dcdad2",
        "surface-bright": "#fbf9f1",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f4ec",
        "surface-container": "#f0eee6",
        "surface-container-high": "#eae8e0",
        "surface-container-highest": "#e4e3db",
        "on-surface-variant": "#584141",
        "surface-variant": "#e4e3db",
        "surface-tint": "#af2b3e",

        "background": "#fbf9f1",
        "on-background": "#1b1c17",

        "inverse-surface": "#30312c",
        "inverse-on-surface": "#f3f1e9",

        "outline": "#8c7071",
        "outline-variant": "#e0bfbf",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        "gold": "#D4AF37",
        "blush": "#FDF2F2",
        "ivory": "#FFFDF5"
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"],
        "body": ["Montserrat", "sans-serif"],
        "display-lg": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "title-sm": ["Playfair Display", "serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "body-md": ["Montserrat", "sans-serif"],
        "label-caps": ["Montserrat", "sans-serif"]
      },
      spacing: {
        "section-padding": "80px",
        "container-max": "1280px",
        "margin-desktop": "64px",
        "margin-mobile": "16px",
        "unit": "8px",
        "gutter": "24px"
      },
      boxShadow: {
        "premium": "0px 4px 20px rgba(128, 0, 32, 0.04)",
        "hover-glow": "0px 8px 24px rgba(212, 175, 55, 0.2)",
        "modal": "0 20px 40px rgba(87, 0, 19, 0.15)"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "full": "9999px"
      }
    },
  },
  plugins: [],
}
