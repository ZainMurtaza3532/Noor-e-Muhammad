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
          deep: '#031713',       // Slightly warmer deep dark
          primary: '#094233',    // Richer primary green
          emerald: '#107a5f',    // Vibrant emerald
          accent: '#10b981',     // Tailwind emerald-500
          darkGreen: '#011510',
          gold: '#dfb342',       // More vibrant gold
          goldLight: '#fae39b',
          cream: '#fffdf5',      // Softer cream
          white: '#ffffff',
          card: 'rgba(9, 66, 51, 0.65)',
          border: 'rgba(223, 179, 66, 0.25)',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
        urdu: ['Noto Naskh Arabic', 'Urdu Typesetting', 'serif'],
      },
      backgroundImage: {
        'madinah-sky': 'radial-gradient(ellipse at top, #087A5B 0%, #063B2E 40%, #021C16 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F1D98B 0%, #D4AF37 50%, #997A15 100%)',
        'emerald-card': 'linear-gradient(180deg, rgba(8, 122, 91, 0.15) 0%, rgba(2, 28, 22, 0.8) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'emerald-glow': '0 0 30px rgba(8, 122, 91, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.8))' },
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
