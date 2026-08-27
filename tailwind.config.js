/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mahris: {
          purple: {
            DEFAULT: '#8B5CF6',
            light: '#A78BFA',
            dark: '#7C3AED',
            glow: 'rgba(139, 92, 246, 0.4)',
          },
          dark: {
            950: '#050507',
            900: '#0a0a0e',
            800: '#111116',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-down': 'scrollDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.95)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateY(200%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
