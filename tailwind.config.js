/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'black1': "#000000",
        'blue1': "#14213D",
        'yellow1': "#FCA311",
        'gray1': "#E5E5E5",
        'white1': "#FFFFFF"
      },
    },
  },
  plugins: [],
}
