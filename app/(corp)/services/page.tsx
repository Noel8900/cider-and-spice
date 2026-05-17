import type { Metadata } from 'next';
import CorpServicesHero from '@/components/corp/sections/CorpServicesHero';
import CorpServicesGrid from '@/components/corp/sections/CorpServicesGrid';
import CorpCTASection   from '@/components/corp/sections/CorpCTASection';

export const metadata: Metadata = {
  title:       'Services',
  description: 'Six integrated advisory practice areas — Capital Markets, Strategic Transformation, Private Equity, Risk Management, Digital Excellence, and Global Expansion.',
  alternates:  { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <CorpServicesHero />
      <CorpServicesGrid />
      <CorpCTASection />
    </>
  );
}
