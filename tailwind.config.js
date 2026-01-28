/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées
        primary: {
          DEFAULT: '#E1FF00', // Jaune Fluo
          50: '#FEFFE6',
          100: '#FEFFCC',
          200: '#FCFF99',
          300: '#FAFF66',
          400: '#F8FF33',
          500: '#E1FF00', // Principal
          600: '#B8CC00',
          700: '#8F9900',
          800: '#666600',
          900: '#3D3300',
        },
        secondary: {
          DEFAULT: '#6D071A', // Bordeaux
          50: '#F5E5E8',
          100: '#EBCCD1',
          200: '#D799A3',
          300: '#C36675',
          400: '#AF3347',
          500: '#6D071A', // Principal
          600: '#570614',
          700: '#41050F',
          800: '#2B030A',
          900: '#150205',
        },
        tertiary: {
          DEFAULT: '#0596DE', // Bleu Doctolib
          50: '#E6F5FC',
          100: '#CCEBF9',
          200: '#99D7F3',
          300: '#66C3ED',
          400: '#33AFE7',
          500: '#0596DE', // Principal
          600: '#0478B2',
          700: '#035A85',
          800: '#023C59',
          900: '#011E2C',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #E1FF00, #B8CC00)',
        'gradient-secondary': 'linear-gradient(to right, #6D071A, #570614)',
        'gradient-tertiary': 'linear-gradient(to right, #0596DE, #0478B2)',
        'gradient-mixed': 'linear-gradient(to right, #E1FF00, #0596DE)', // Jaune vers Bleu
        'gradient-hero': 'linear-gradient(to bottom right, #E6F5FC, #FFFFFF, #FEFFE6)', // Bleu clair vers blanc vers jaune clair
      },
    },
  },
  plugins: [],
}
