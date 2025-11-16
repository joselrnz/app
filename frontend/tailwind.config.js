/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gh-bg': 'var(--gh-bg)',
        'gh-bg-secondary': 'var(--gh-bg-secondary)',
        'gh-bg-hover': 'var(--gh-bg-hover)',
        'gh-card-bg': 'var(--gh-card-bg)',
        'gh-text': 'var(--gh-text)',
        'gh-text-secondary': 'var(--gh-text-secondary)',
        'gh-border': 'var(--gh-border)',
        'gh-link': 'var(--gh-link)',
        'gh-link-hover': 'var(--gh-link-hover)',
        'gh-success': 'var(--gh-success)',
        'gh-warning': 'var(--gh-warning)',
        'gh-danger': 'var(--gh-danger)',
      },
      borderRadius: {
        'gh-border-radius': 'var(--gh-border-radius)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'fadeInUp': 'fadeInUp 0.5s ease-in-out',
        'pulse': 'pulse 2s infinite',
        'blink': 'blink 1s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [],
}


