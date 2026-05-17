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
        // ── Core brand palette ──────────────────────────────────────────────
        bg:    '#1C1209',                          // Dark background (midnight ember)
        ember: { DEFAULT: '#C4622D', hover: '#a8521f' }, // Terracotta accent
        cream: '#F5ECD7',                          // Off-white text / parchment
        grove: '#2D5016',                          // Deep sage green
        // ── Supporting palette ──────────────────────────────────────────────
        gold: {
          DEFAULT: '#d4a84b',
          light:   '#e8d5a0',
          muted:   'rgba(212,168,75,0.22)',
        },
        sage: {
          DEFAULT: '#5A7A5F',
          light:   '#7A9E80',
        },
        sand: {
          DEFAULT: '#F5EDE0',
          dark:    '#EAD9C5',
        },
        // ── Nexus Capital Group — corporate palette ─────────────────────────
        corp: {
          ink:      '#060910',   // Deepest background (hero, footer)
          navy:     '#0C1420',   // Primary surface
          card:     '#111D2E',   // Card background
          gold: {
            DEFAULT: '#C9A84C', // Champagne gold — primary accent
            light:   '#E8D5A0', // Light gold
            muted:   'rgba(201,168,76,0.12)', // Subtle fill
          },
          platinum: '#E8EAEF',  // Primary text
          steel:    '#8896B3',  // Secondary text / labels
          azure:    '#1A3F7A',  // Deep blue hover surface
        },
      },
      fontFamily: {
        sans:           ['Inter', 'system-ui', 'sans-serif'],
        label:          ['"Josefin Sans"', 'system-ui', 'sans-serif'],
        'corp-display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
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
