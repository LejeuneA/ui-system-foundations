/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./components/**/*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-soft": "var(--color-primary-soft)",
        border: "var(--color-border)",
        surface: "var(--color-surface)",
        danger: "var(--color-danger)"
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 16px 40px rgba(43, 47, 80, 0.08)"
      }
    }
  },
  plugins: []
};
