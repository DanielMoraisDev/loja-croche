/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alexandria: ["Alexandria", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      colors: {
        wine: "#950031",
        raspberry: "#9E2D5A",
        plum: "#381020",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
