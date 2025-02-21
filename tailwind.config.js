/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#FFBF00',  // Tech Yellow
          blue: '#0059B2',    // Freedom Blue
          red: '#FF2626',     // Victory Red
          white: '#FFFFFF',   // Passion White
          grey: '#333333',    // Integrity Grey
          DEFAULT: '#0059B2', // Default primary color (using Freedom Blue)
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}