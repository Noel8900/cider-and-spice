import type { Metadata } from 'next';
import CorpInsightsHero from '@/components/corp/sections/CorpInsightsHero';
import CorpInsightsGrid from '@/components/corp/sections/CorpInsightsGrid';
import CorpCTASection   from '@/components/corp/sections/CorpCTASection';

export const metadata: Metadata = {
  title:       'Insights',
  description: 'Nexus Perspectives — rigorous analysis and actionable intelligence from Nexus Capital Group\'s advisory leadership on capital markets, strategy, risk, and global expansion.',
  alternates:  { canonical: '/insights' },
};

export default function InsightsPage() {
  return (
    <>
      <CorpInsightsHero />
      <CorpInsightsGrid />
      <CorpCTASection />
    </>
  );
}
