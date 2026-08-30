/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        islamic: {
          deep: '#064A2B',       // Primary Deep Forest Green
          primary: '#085431',    // Slightly lighter primary
          accent: '#EFF7F2',     // Light green tint for backgrounds
          darkGreen: '#04361e',
          gold: '#D9A21B',       // Primary Gold CTA
          goldLight: '#F1D27A',  // Gold hover state
          cream: '#FCFBF7',      // Warm Off-White/Beige for sections
          white: '#ffffff',
          card: '#ffffff',
          border: 'rgba(217, 162, 27, 0.2)', // Soft gold border
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
        urdu: ['Noto Naskh Arabic', 'Urdu Typesetting', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #064A2B 0%, #04361e 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D9A21B 0%, #F1D27A 100%)',
        'green-gradient': 'linear-gradient(135deg, #085431 0%, #064A2B 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(217, 162, 27, 0.3)',
        'card-soft': '0 10px 40px -10px rgba(6, 74, 43, 0.08)',
        'card-hover': '0 20px 40px -10px rgba(6, 74, 43, 0.12)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
