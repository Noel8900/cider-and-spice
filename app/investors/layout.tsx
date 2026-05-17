import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investor Overview | Cider & Spice — Las Cruces Culinary Hub',
  description:
    'Request the full investor package for the Las Cruces Culinary Innovation Hub. $1.5M total capital, 17–20% illustrative IRR, Month 18–20 cash-flow breakeven. SBA 7(a) pre-qualification in progress.',
  robots: { index: true, follow: true },
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
