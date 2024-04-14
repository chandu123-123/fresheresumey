/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        poppins: ["var(--font-poppins)"],
      }
    },
  },
  plugins: [daisyui],
};
