/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',     // Extra small devices
        sm: '640px',     // Small devices (phones)
        md: '768px',     // Medium devices (tablets)
        lg: '1024px',    // Large devices (laptops)
        xl: '1280px',    // Extra large devices (desktops)
        '2xl': '1536px', // 2x extra large devices
        '3xl': '1920px', // Ultra large screens
        '4k': '3840px',  // 4K screens
      },
    },
    animation: {
      spin: "spin 1s linear infinite",
      fadeIn: "fadeIn 0.3s ease-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0, transform: "scale(0.9)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'scale(0.9)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
      scroll: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.3s ease-out',
      scroll: 'scroll 30s linear infinite', // Adjust speed as needed
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

