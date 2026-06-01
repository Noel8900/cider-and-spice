import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Plan | Cider & Spice',
  robots: { index: false, follow: false },
};

export default function BusinessPlanPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#1C1209', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'Georgia, serif', color: 'rgba(245,236,215,0.4)', fontSize: '1rem' }}>
        Business plan review — coming soon.
      </p>
    </main>
  );
}
