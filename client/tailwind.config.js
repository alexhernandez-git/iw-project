/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...colors,
      "esan-color": "#0096af",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
