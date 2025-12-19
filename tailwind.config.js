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
        // Light mode colors
        light: {
          bg: {
            primary: 'var(--color-light-bg-primary)',
            secondary: 'var(--color-light-bg-secondary)',
            accent: 'var(--color-light-bg-accent)',
          },
          text: {
            primary: 'var(--color-light-text-primary)',
            secondary: 'var(--color-light-text-secondary)',
            accent: 'var(--color-light-text-accent)',
          },
        },
        // Dark mode colors
        dark: {
          bg: {
            primary: 'var(--color-dark-bg-primary)',
            secondary: 'var(--color-dark-bg-secondary)',
            accent: 'var(--color-dark-bg-accent)',
          },
          text: {
            primary: 'var(--color-dark-text-primary)',
            secondary: 'var(--color-dark-text-secondary)',
            accent: 'var(--color-dark-text-accent)',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 20px -5px rgba(0, 0, 0, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 12px 48px -12px rgba(0, 0, 0, 0.12), 0 6px 16px -4px rgba(0, 0, 0, 0.08)',
        'luxury': '0 24px 72px -12px rgba(0, 0, 0, 0.18), 0 12px 24px -6px rgba(0, 0, 0, 0.12)',
        'luxury-hover': '0 32px 96px -16px rgba(0, 0, 0, 0.22), 0 16px 32px -8px rgba(0, 0, 0, 0.14)',
        'inner-soft': 'inset 0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

