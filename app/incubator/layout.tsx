import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Incubator Program | Cider & Spice — Las Cruces Culinary Hub',
  description:
    'Explore the Las Cruces Culinary Hub incubator program — Semilla and Mariposa pathways, phased launch strategy, performance KPIs, and the complete 8-step vendor journey from first idea to graduation.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Incubator Program | Las Cruces Culinary Hub',
    description:
      'Southern New Mexico\'s first food hall incubator. Semilla (early-stage) and Mariposa (scale) pathways, 5-phase launch strategy, and a performance dashboard built for sustainable operators.',
    url: 'https://lc-culinary-hub.vercel.app/incubator',
    siteName: 'Cider & Spice — Las Cruces Culinary Hub',
    locale: 'en_US',
    type: 'website',
  },
};

export default function IncubatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
