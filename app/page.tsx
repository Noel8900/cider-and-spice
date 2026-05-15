/**
 * Homepage — Las Cruces Culinary Innovation Hub
 *
 * Server component: pure markup, no client state.
 * Client interactivity lives inside each section component.
 *
 * Section order (CLAUDE.md spec):
 *   HeroSection → TrustBar → GallerySection → FeaturesSection →
 *   HowItWorksSection → EntrepreneurSection → CommunityImpactSection →
 *   VendorCTA → GetInvolvedSection → FAQSection → SiteFooter
 *
 * Navbar is rendered globally in app/layout.tsx.
 * Hero image (bartender/craft cider) is the permanent visual foundation — do not change.
 */

import HeroSection           from '@/components/sections/HeroSection';
import TrustBar              from '@/components/sections/TrustBar';
import GallerySection        from '@/components/sections/GallerySection';
import FeaturesSection       from '@/components/sections/FeaturesSection';
import HowItWorksSection     from '@/components/sections/HowItWorksSection';
import EntrepreneurSection   from '@/components/sections/EntrepreneurSection';
import CommunityImpactSection from '@/components/sections/CommunityImpactSection';
import VendorCTA             from '@/components/sections/VendorCTA';
import GetInvolvedSection    from '@/components/sections/GetInvolvedSection';
import FAQSection            from '@/components/sections/FAQSection';
import SiteFooter            from '@/components/sections/SiteFooter';

export default function HomePage() {
  return (
    <>
      {/* LOCKED: hero image is the permanent visual foundation of this site */}
      <HeroSection />

      <TrustBar />

      {/* LOCKED: 9 images — 6 concept renderings + 3 tenant-vision stalls */}
      <GallerySection />

      <FeaturesSection />

      <HowItWorksSection />

      <EntrepreneurSection />

      <CommunityImpactSection />

      <VendorCTA />

      <GetInvolvedSection />

      <FAQSection />

      <SiteFooter />
    </>
  );
}
