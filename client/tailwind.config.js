/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        "blue-dark": "#001e4e",
        "blue-light": "#0f6fd4",
      },
      colors: {
        "dark-charcoal": "#333333",
        "granite-gray": "#666666",
        "spanish-gray": "#999999",
        "chinese-silver": "#CCCCCC",
        "bright-gray": "#EEEEEE",
      },
    },
  },
  plugins: [],
};
