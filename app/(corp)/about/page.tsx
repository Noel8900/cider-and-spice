import type { Metadata } from 'next';
import CorpAboutHero      from '@/components/corp/sections/CorpAboutHero';
import CorpTimeline       from '@/components/corp/sections/CorpTimeline';
import CorpLeadershipFull from '@/components/corp/sections/CorpLeadershipFull';
import CorpCTASection     from '@/components/corp/sections/CorpCTASection';

export const metadata: Metadata = {
  title:       'About',
  description: 'Founded in 1994, Nexus Capital Group is a privately held, partner-owned global investment advisory firm with $2.8T in assets under advisory and 47 offices worldwide.',
  alternates:  { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <CorpAboutHero />
      <CorpTimeline />
      <CorpLeadershipFull />
      <CorpCTASection />
    </>
  );
}
