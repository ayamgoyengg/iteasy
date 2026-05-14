import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0CC0DF',
        'primary-dark': '#0891b2',
        secondary: '#A855F7',
        'secondary-dark': '#9333EA',
        accent: '#F59E0B',
        background: '#030712',
        'surface': '#0d0d1a',
        'surface-2': '#13131f',
        foreground: '#F8FAFC',
        muted: '#0d0d1a',
        'muted-foreground': '#64748B',
        border: '#1e1e30',
        input: '#0d0d1a',
        ring: '#0CC0DF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, rgba(12,192,223,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(168,85,247,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(12,192,223,0.06) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(168,85,247,0.06) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(12,192,223,0.08) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'glow-pulse-purple': 'glow-pulse-purple 3s ease-in-out 1s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradient-x 5s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scan': 'scan 4s linear infinite',
        'border-spin': 'border-spin 6s linear infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'scale-up': 'scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'particle': 'particle 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(12,192,223,0.2), 0 0 60px rgba(12,192,223,0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(12,192,223,0.5), 0 0 80px rgba(12,192,223,0.15)' },
        },
        'glow-pulse-purple': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(168,85,247,0.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%', backgroundSize: '200% 200%' },
          '50%': { backgroundPosition: '100% 50%', backgroundSize: '200% 200%' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'border-spin': {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        particle: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)', opacity: '0.3' },
          '33%': { transform: 'translate(15px,-25px) scale(1.2)', opacity: '0.8' },
          '66%': { transform: 'translate(-10px,-50px) scale(0.8)', opacity: '0.5' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(12,192,223,0.25)',
        'glow': '0 0 30px rgba(12,192,223,0.35)',
        'glow-lg': '0 0 50px rgba(12,192,223,0.4), 0 0 100px rgba(12,192,223,0.15)',
        'glow-purple': '0 0 30px rgba(168,85,247,0.35)',
        'glow-purple-lg': '0 0 50px rgba(168,85,247,0.4)',
        'card': '0 4px 30px rgba(0,0,0,0.6)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(12,192,223,0.1)',
        'inner-glow': 'inset 0 0 40px rgba(12,192,223,0.05)',
      },
    },
  },
  plugins: [],
}

export default config
