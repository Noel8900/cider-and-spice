import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Cider & Spice — culinary hub palette ────────────────────────────
        bg:    '#1C1209',                          // Dark background (midnight ember)
        ember: { DEFAULT: '#C4622D', hover: '#a8521f' }, // Terracotta accent
        cream: '#F5ECD7',                          // Off-white text / parchment
        grove: '#2D5016',                          // Deep sage green
        gold: {
          DEFAULT: '#d4a84b',
          light:   '#e8d5a0',
          muted:   'rgba(212,168,75,0.22)',
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
        sans:           ['var(--font-inter)', 'system-ui', 'sans-serif'],
        label:          ['var(--font-josefin)', 'system-ui', 'sans-serif'],
        'corp-display': ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
