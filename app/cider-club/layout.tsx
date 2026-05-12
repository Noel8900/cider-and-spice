import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cider Club | Las Cruces Culinary Innovation Hub',
  description:
    'Join the Cider Club — three membership tiers starting at $25/mo. Tasting flights, pour discounts, exclusive producer events, and reserved seating at Southern NM\'s first specialty craft cider bar. Founding member pricing available now.',
  robots: { index: true, follow: true },
};

export default function CiderClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
