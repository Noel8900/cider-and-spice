import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Security headers — applied by Vercel (vercel.json) and Netlify (netlify.toml).
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',         value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
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
