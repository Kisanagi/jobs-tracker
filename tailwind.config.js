/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif']
      },
      colors: {
        brand: {
          50: '#F1F2F0', 100: '#DCE7D5', 200: '#B0C5A8', 300: '#94AE8B',
          400: '#5E7E58', 500: '#3C6339', 600: '#234B22', 700: '#1B3A1A',
          800: '#122611', 900: '#0A160A', 950: '#030503'
        },
        cream: '#F1F2F0',
        ink: '#030503',
        muted: '#5B6058',
        ochre: '#CE923A'
      }
    }
  }
}
