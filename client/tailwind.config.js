/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary" : "#00946D",
      },
      fontFamily:{
        "logo" : ["Roboto Slab", "serif"],
        "sans": ["Poppins", "sans-serif"]
      },
      screens:{
        "xs" : "500px",
        "md" : "900px"
      },
      animation:{
        "spin-slow" : "spin 2s linear infinite",
      }
    },
  },
  plugins: [],
}