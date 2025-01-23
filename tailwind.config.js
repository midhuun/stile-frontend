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
      scroll: 'scroll 15s linear infinite',
    },
    keyframes: {
      scroll: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
  },
  plugins: [],
}

