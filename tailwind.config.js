/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- CRITICAL: Enables manual dark mode toggling via the button
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}