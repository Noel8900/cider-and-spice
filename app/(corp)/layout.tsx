// Corporate route group layout — Nexus Capital Group
// Renders corp navbar + footer; root layout\'s ConditionalCulinaryUI
// returns null on /home, /about, /services so no culinary chrome appears here.

import type { Metadata } from 'next';
import CorpNavbar from '@/components/corp/CorpNavbar';
import CorpFooter from '@/components/corp/CorpFooter';

export const metadata: Metadata = {
  title: {
    default:  'Nexus Capital Group | Global Investment Advisory',
    template: '%s | Nexus Capital Group',
  },
  description:
    'Nexus Capital Group is a world-leading investment advisory and strategic capital management firm with $2.8 trillion in assets under advisory across 47 global offices.',
  metadataBase: new URL('https://nexuscapitalgroup.com'),
  openGraph: {
    type:     'website',
    siteName: 'Nexus Capital Group',
    locale:   'en_US',
  },
};

export default function CorpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-corp-navy min-h-screen font-sans text-corp-platinum antialiased">
      <CorpNavbar />
      <main>{children}</main>
      <CorpFooter />
    </div>
  );
}
