/**
 * Homepage — Las Cruces Culinary Innovation Hub
 *
 * Server component: pure markup, no client state.
 * Client interactivity lives inside each section component.
 *
 * Section order (CLAUDE.md spec):
 *   HeroSection → TrustBar → GallerySection → FeaturesSection →
 *   VendorCTA → FAQSection → SiteFooter
 *
 * Navbar is rendered globally in app/layout.tsx.
 * Scroll-smooth is set on <html> in app/layout.tsx.
 */

import HeroSection    from '@/components/sections/HeroSection';
import TrustBar       from '@/components/sections/TrustBar';
import GallerySection from '@/components/sections/GallerySection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import VendorCTA      from '@/components/sections/VendorCTA';
import FAQSection     from '@/components/sections/FAQSection';
import SiteFooter     from '@/components/sections/SiteFooter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <GallerySection />
      <FeaturesSection />
      <VendorCTA />
      <FAQSection />
      <SiteFooter />
    </>
  );
}
