import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitchen Policies | Cider & Spice — Las Cruces Culinary Hub',
  description:
    'Commercial kitchen zone standards, house rules, and the full vendor onboarding compliance checklist. Governed by NMED 7.6.2 NMAC and the 2017 FDA Food Code.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Kitchen Policies | Las Cruces Culinary Hub',
    description:
      'Zone-by-zone standards, NM regulatory framework (7.6.2 NMAC), house rules, and the complete pre-access compliance checklist for shared kitchen vendors.',
    url: 'https://lc-culinary-hub.vercel.app/kitchen-policies',
    siteName: 'Cider & Spice — Las Cruces Culinary Hub',
    locale: 'en_US',
    type: 'website',
  },
};

export default function KitchenPoliciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
