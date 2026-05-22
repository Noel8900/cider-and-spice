import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Prevent Tailwind CSS PostCSS internals from being bundled into the browser.
  // Turbopack + tailwindcss@3 tries to resolve Node.js built-ins (fs, v8, etc.)
  // from the tailwindcss package into the client bundle. Externalizing it fixes
  // the build while keeping PostCSS processing intact server-side.
  serverExternalPackages: ['tailwindcss', 'jiti', '@nodelib/fs.scandir', '@nodelib/fs.stat', 'fast-glob'],
  // Security headers — applied by Vercel (vercel.json) and Netlify (netlify.toml).
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ]
  },
  // Allow images from the canonical domain
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.lccullinaryhub.com' },
    ],
  },
}

export default nextConfig
