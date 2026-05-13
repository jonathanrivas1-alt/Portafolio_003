import type { Config } from 'tailwindcss';

/**
 * Design system — Jonathan Rivas Portfolio
 *
 * Paleta cinematográfica:
 *   - ink       → negro profundo (#050505)
 *   - graphite  → gris grafito profundo
 *   - mist      → blanco suave / off-white
 *   - silver    → metálico sutil
 *
 * Sin neones, sin RGB. Solo tonalidades sobrias y metálicas.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#050505',
          50: '#0a0a0a',
          100: '#0e0e10',
          200: '#121214',
          300: '#16161a',
          400: '#1c1c20',
        },
        graphite: {
          DEFAULT: '#2a2a2e',
          50: '#1f1f23',
          100: '#26262a',
          200: '#2a2a2e',
          300: '#3a3a40',
          400: '#48484f',
          500: '#5a5a62',
          600: '#7a7a82',
        },
        mist: {
          DEFAULT: '#f5f5f7',
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#c7c7cc',
          400: '#a1a1aa',
        },
        silver: {
          DEFAULT: '#9ca0a8',
          metal: '#bcc0c8',
        },
      },
      fontFamily: {
        // Editorial serif para titulares (descargada vía next/font en layout.tsx)
        display: ['var(--font-display)', 'serif'],
        // Sans para body
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        // Mono para terminal/about
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        wider: '0.08em',
        widest: '0.18em',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.55' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '30%': { transform: 'translate(3%, -8%)' },
          '50%': { transform: 'translate(-8%, 5%)' },
          '70%': { transform: 'translate(8%, 3%)' },
          '90%': { transform: 'translate(-3%, 8%)' },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 60%)',
        'metal-gradient': 'linear-gradient(135deg, #f5f5f7 0%, #9ca0a8 50%, #f5f5f7 100%)',
        'noise': "url('/textures/noise.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
