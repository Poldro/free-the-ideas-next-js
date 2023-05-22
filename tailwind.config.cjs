/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#5D9764",
        "dark": "#15162c",
        "dark-secondary": "#3a1442"
    }
  },
},
  plugins: [require("@tailwindcss/forms"),require('tailwind-scrollbar-hide')],
};
