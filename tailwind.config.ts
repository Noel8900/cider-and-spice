import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Brand token palette — matches styles/tokens.css source of truth
      colors: {
        // Core palette
        bg:    '#1C1209',                          // Dark background
        ember: { DEFAULT: '#C4622D', hover: '#a8521f' }, // Terracotta accent
        cream: '#F5ECD7',                          // Off-white text
        grove: '#2D5016',                          // Deep sage green
        // Supporting palette
        gold:  { DEFAULT: '#d4a84b', light: '#e8d5a0' },
        sage:  { DEFAULT: '#5A7A5F', light: '#7A9E80' },
        sand:  { DEFAULT: '#F5EDE0', dark:  '#EAD9C5' },
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
