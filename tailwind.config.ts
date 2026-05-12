import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Mirror the brand token palette from styles.css for Tailwind use
      colors: {
        ember: {
          DEFAULT: '#1a0f08',
          deep: 'rgba(14,12,10,0.97)',
        },
        chile: {
          DEFAULT: '#B83A2E',
          dark:    '#8C2820',
          light:   '#D4534A',
        },
        gold: {
          DEFAULT: '#d4a84b',
          light:   '#e8d5a0',
          muted:   'rgba(212,168,75,0.22)',
        },
        amber: {
          DEFAULT: '#C4872A',
          light:   '#E6A94A',
        },
        sage: {
          DEFAULT: '#5A7A5F',
          light:   '#7A9E80',
        },
        sand: {
          DEFAULT: '#F5EDE0',
          dark:    '#EAD9C5',
        },
        cream: '#FDFAF5',
      },
      fontFamily: {
        display: ['"Abril Fatface"', 'Georgia', 'serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        label:   ['"Josefin Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg:      '0.75rem',
        xl:      '1rem',
      },
    },
  },
  plugins: [],
}

export default config
