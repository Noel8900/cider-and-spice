import type { Metadata, Viewport } from 'next'
import { Inter, Josefin_Sans, Cormorant_Garamond } from 'next/font/google'
import ConditionalCulinaryUI from '@/components/layout/ConditionalCulinaryUI'
import './globals.css'

/* ── next/font ────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-josefin',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

/* ── Metadata ──────────────────────────────────────────────────────────── */
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
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card:        'summary_large_image',
    site:        '@LCCulinaryHub',
    title:       'Las Cruces Culinary Innovation Hub',
    description: "Southern NM's first food hall, craft cider bar & culinary incubator. Opening 2027 in downtown Las Cruces.",
    images:      ['/opengraph-image'],
  },
  other: {
    'apple-mobile-web-app-capable':          'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'geo.region':    'US-NM',
    'geo.placename': 'Las Cruces, New Mexico',
    'geo.position':  '32.3199;-106.7637',
    ICBM:            '32.3199, -106.7637',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C1209',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      id="top"
      className={`scroll-smooth ${inter.variable} ${josefinSans.variable} ${cormorantGaramond.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png"
          type="image/png"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231C1209'/><text y='.85em' x='12' font-size='76' fill='%23d4a84b'>&#9672;</text></svg>"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['FoodEstablishment', 'LocalBusiness'],
                  '@id': 'https://www.lccullinaryhub.com/#business',
                  name: 'Las Cruces Culinary Innovation Hub',
                  alternateName: ['LC Culinary Hub', 'Cider & Spice'],
                  description:
                    "Southern New Mexico's premier food hall, craft cider bar, and culinary incubator. Features 10–13 global food concepts, 20–25 rotating cider taps, a shared commissary kitchen, and a structured pathway for food entrepreneurs.",
                  url: 'https://www.lccullinaryhub.com',
                  email: 'info@lccullinaryhub.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'East Lohman Ave Corridor',
                    addressLocality: 'Las Cruces',
                    addressRegion: 'NM',
                    postalCode: '88001',
                    addressCountry: 'US',
                  },
                  geo: { '@type': 'GeoCoordinates', latitude: 32.3199, longitude: -106.7637 },
                  openingHoursSpecification: [
                    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday','Wednesday','Thursday'], opens: '11:00', closes: '21:00' },
                    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday','Saturday'], opens: '11:00', closes: '23:00' },
                    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:00', closes: '20:00' },
                  ],
                  servesCuisine: ['New Mexican','Mexican','Mediterranean','Southern BBQ','Asian Fusion','American','International'],
                  priceRange: '$$',
                  hasMap: 'https://maps.google.com/?q=32.3199,-106.7637',
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
                    {
                      '@type': 'Question',
                      name: 'How can I invest in the Las Cruces Culinary Innovation Hub?',
                      acceptedAnswer: { '@type': 'Answer', text: 'Investor inquiries are open. Visit the Investor Overview page or contact info@lccullinaryhub.com to request the full investment brief.' },
                    },
                    {
                      '@type': 'Question',
                      name: 'How do I apply as a food vendor?',
                      acceptedAnswer: { '@type': 'Answer', text: 'Vendor applications are open at lccullinaryhub.com/vendors. The founding cohort of 10–13 vendors will be selected in Q3–Q4 2026.' },
                    },
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.lccullinaryhub.com/#website',
                  url: 'https://www.lccullinaryhub.com',
                  name: 'Las Cruces Culinary Innovation Hub',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: { '@type': 'EntryPoint', urlTemplate: 'https://www.lccullinaryhub.com/?s={search_term_string}' },
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
                     focus:bg-bg focus:border focus:border-gold/60 focus:px-4 focus:py-2
                     focus:font-label focus:text-[10px] focus:tracking-[0.2em] focus:uppercase
                     focus:text-gold"
        >
          Skip to main content
        </a>

        <ConditionalCulinaryUI />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
