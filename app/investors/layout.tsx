import type { Metadata } from 'next';
import CorpNavbar from '@/components/corp/CorpNavbar';
import CorpFooter from '@/components/corp/CorpFooter';

export const metadata: Metadata = {
  title: 'Investor Overview | Las Cruces Culinary Innovation Hub',
  description:
    'Request the full investor package for the Las Cruces Culinary Innovation Hub. $1.5M total capital, 17–20% illustrative IRR, Month 18–20 cash-flow breakeven. SBA 7(a) pre-qualification in progress.',
  robots: { index: true, follow: true },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: '#2c2416' }}>
      <CorpNavbar />
      <main>{children}</main>
      <CorpFooter />
    </div>
  );
}
