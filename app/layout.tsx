import type { Metadata } from 'next'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'
import './globals.css'

/* ── Metadata (replaces <head> SEO tags) ─────────────────────── */
export const metadata: Metadata = {
  title: 'Las Cruces Culinary Innovation Hub | Food Hall, Craft Cider Bar & Culinary Incubator — Downtown Las Cruces, NM',
  description:
    "Las Cruces Culinary Innovation Hub — Southern New Mexico's only food hall, craft cider bar, and culinary incubator. 10–13 global concepts, 20–25 rotating cider taps, and a launchpad for NM food entrepreneurs. Opening Q1–Q2 2027 in downtown Las Cruces.",
  metadataBase: new URL('https://www.lccullinaryhub.com'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type:        'website',
    url:         'https://www.lccullinaryhub.com/',
    siteName:    'Las Cruces Culinary Innovation Hub',
    title:       'Las Cruces Culinary Innovation Hub | Food Hall & Craft Cider Bar',
    description: "Southern NM's first food hall, craft cider bar, and culinary incubator. 10–13 global concepts. Opening Q1–Q2 2027 in downtown Las Cruces.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@LCCulinaryHub',
    title:       'Las Cruces Culinary Innovation Hub',
    description: "Southern NM's first food hall, craft cider bar & culinary incubator. Opening 2027 in downtown Las Cruces.",
    images:      ['/og-image.jpg'],
  },
  other: {
    'theme-color':                        '#B83A2E',
    'apple-mobile-web-app-capable':       'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'geo.region':    'US-NM',
    'geo.placename': 'Las Cruces, New Mexico',
    'geo.position':  '32.3199;-106.7637',
    ICBM:            '32.3199, -106.7637',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts — preconnect then load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Josefin+Sans:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon placeholder */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌶</text></svg>"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'FoodEstablishment',
                  '@id': 'https://www.lccullinaryhub.com/#business',
                  name: 'Las Cruces Culinary Innovation Hub',
                  alternateName: 'LC Culinary Hub',
                  description:
                    "Southern New Mexico's premier food hall, craft cider bar, and culinary incubator. Features 10–13 global food concepts, 20–25 rotating cider taps, a shared commissary kitchen, and a structured pathway for food entrepreneurs.",
                  url: 'https://www.lccullinaryhub.com',
                  email: 'info@lccullinaryhub.com',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Las Cruces',
                    addressRegion: 'NM',
                    addressCountry: 'US',
                  },
                  geo: { '@type': 'GeoCoordinates', latitude: 32.3199, longitude: -106.7637 },
                  servesCuisine: ['New Mexican', 'Mexican', 'Mediterranean', 'Southern BBQ', 'Asian Fusion', 'American', 'International'],
                  priceRange: '$$',
                  sameAs: [
                    'https://www.instagram.com/lccullinaryhub',
                    'https://www.facebook.com/lccullinaryhub',
                    'https://www.tiktok.com/@lccullinaryhub',
                  ],
                },
                {
                  '@type': 'FAQPage',
                  '@id': 'https://www.lccullinaryhub.com/#faq',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'When does the Las Cruces Culinary Innovation Hub open?',
                      acceptedAnswer: { '@type': 'Answer', text: 'The Hub is targeting a Grand Opening in Q1–Q2 2027 in downtown Las Cruces, New Mexico.' },
                    },
                    {
                      '@type': 'Question',
                      name: 'What kind of food will be available at the Hub?',
                      acceptedAnswer: { '@type': 'Answer', text: 'The Hub will feature 10–13 distinct food concepts including New Mexican, Mexican street food, Southern BBQ, Mediterranean, Asian fusion, ramen, plant-forward cuisine, desserts, and rotating incubator stalls.' },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is the Cider Club membership?',
                      acceptedAnswer: { '@type': 'Answer', text: 'The Cider Club is a tiered monthly membership (Taster $25/mo, Enthusiast $45/mo, Connoisseur $85/mo) offering tasting flights, pour discounts, exclusive producer events, and reserved seating.' },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}

        {/* All DOM interaction (nav, FAQ, forms, lightbox, animations)
            runs after hydration via the existing vanilla-JS bundle.
            Strategy="afterInteractive" ensures it fires client-side only. */}
        <Script src="/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
