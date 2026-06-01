import type { Metadata } from 'next';

import HeroSection           from '@/components/sections/HeroSection';
import TrustBar              from '@/components/sections/TrustBar';
import GallerySection        from '@/components/sections/GallerySection';
import HallOSSection         from '@/components/sections/HallOSSection';
import FeaturesSection       from '@/components/sections/FeaturesSection';
import HowItWorksSection     from '@/components/sections/HowItWorksSection';
import CommunityImpactSection from '@/components/sections/CommunityImpactSection';
import EntrepreneurSection   from '@/components/sections/EntrepreneurSection';
import MilestoneTimeline     from '@/components/sections/MilestoneTimeline';
import FAQSection            from '@/components/sections/FAQSection';
import GetInvolvedSection    from '@/components/sections/GetInvolvedSection';
import VendorSpotsBar        from '@/components/sections/VendorSpotsBar';
import SiteFooter            from '@/components/sections/SiteFooter';

export const metadata: Metadata = {
  title: 'Cider & Spice — Las Cruces Culinary Innovation Hub',
  description:
    'Opening Q1–Q2 2027 in downtown Las Cruces, NM. A food hall, craft cider bar, commissary kitchen, and culinary incubator — all under one roof.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cider & Spice — Las Cruces Culinary Innovation Hub',
    description:
      "Southern New Mexico's first food hall and specialty craft cider bar. 10–13 global food concepts, 25 rotating cider taps, live events, and an incubator for local food entrepreneurs.",
    url: 'https://www.lccullinaryhub.com',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <GallerySection />
      <HallOSSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CommunityImpactSection />
      <EntrepreneurSection />
      <MilestoneTimeline />
      <FAQSection />
      <GetInvolvedSection />
      <VendorSpotsBar />
      <SiteFooter />
    </main>
  );
}
