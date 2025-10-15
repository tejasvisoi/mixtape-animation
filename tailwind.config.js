/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'vintage-cream': '#f7f3e9',
        'vintage-brown': '#8b4513',
        'vintage-gold': '#daa520',
        'vintage-red': '#dc143c',
        'vintage-blue': '#4169e1'
      },
      fontFamily: {
        'retro': ['Courier New', 'monospace'],
      },
      boxShadow: {
        'vintage': '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'tape': '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}
