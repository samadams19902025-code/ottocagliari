/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        otto: {
          purple: '#7B4FA0',
          yellow: '#F5C842',
          blue: '#5BB8D4',
          coral: '#E8836B',
          orange: '#E8812A',
          green: '#6BC5A0',
          white: '#FFFFFF',
          charcoal: '#2A2A2A',
        },
      },
      fontFamily: {
        script: ['Pacifico', 'cursive'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
