import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Onboarding | Cider & Spice — Las Cruces Culinary Hub',
  description:
    'Learn how to apply, get selected, and launch your food concept at the Las Cruces Culinary Hub. Eight structured milestones from first outreach to graduation — with coaching at every stage.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Vendor Onboarding | Las Cruces Culinary Hub',
    description:
      'Apply, get selected, and launch your concept at Southern New Mexico\'s first food hall incubator. Semilla & Mariposa program pathways available.',
    url: 'https://lc-culinary-hub.vercel.app/vendors/onboarding',
    siteName: 'Cider & Spice — Las Cruces Culinary Hub',
    locale: 'en_US',
    type: 'website',
  },
};

export default function VendorOnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
