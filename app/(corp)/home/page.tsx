import type { Metadata } from 'next';
import CorpHero              from '@/components/corp/sections/CorpHero';
import CorpMarquee           from '@/components/corp/sections/CorpMarquee';
import CorpPhilosophy        from '@/components/corp/sections/CorpPhilosophy';
import CorpStats             from '@/components/corp/sections/CorpStats';
import CorpServicesSnapshot  from '@/components/corp/sections/CorpServicesSnapshot';
import CorpLeadershipPreview from '@/components/corp/sections/CorpLeadershipPreview';
import CorpPerspectives      from '@/components/corp/sections/CorpPerspectives';
import CorpContactSection    from '@/components/corp/sections/CorpContactSection';

export const metadata: Metadata = {
  title:       'Nexus Capital Group | Global Investment Advisory',
  description: 'Nexus Capital Group — $2.8 trillion in assets under advisory. Global investment advisory and strategic capital management across 47 offices worldwide.',
  alternates:  { canonical: '/home' },
};

export default function CorpHomePage() {
  return (
    <>
      <CorpHero />
      <CorpMarquee />
      <CorpPhilosophy />
      <CorpStats />
      <CorpServicesSnapshot />
      <CorpLeadershipPreview />
      <CorpPerspectives />
      <CorpContactSection />
    </>
  );
}
