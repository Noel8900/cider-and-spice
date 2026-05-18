import IncubatorProgramSection from '@/components/sections/IncubatorProgramSection';
import VendorOnboardingSection from '@/components/sections/VendorOnboardingSection';
import SiteFooter from '@/components/sections/SiteFooter';
import TrustBar from '@/components/sections/TrustBar';

export default function IncubatorPage() {
  return (
    <main>
      <IncubatorProgramSection />
      <VendorOnboardingSection />
      <TrustBar />
      <SiteFooter />
    </main>
  );
}
