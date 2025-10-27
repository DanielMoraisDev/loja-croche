/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        soft_light_yellow: "#FFF4C7",
        warm_peachy_orange: "#FFAB6F",
        soft_fresh_green: "#C0DDAD",
        very_light_saturated_orange: "#FFDEA3",
        deep_orange: "#B06338",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
