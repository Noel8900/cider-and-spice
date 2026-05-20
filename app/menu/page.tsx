import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllItems, getVendorNames, DietaryTag } from '@/lib/menu';
import DishCard from '@/components/menu/DishCard';
import DietaryFilter from '@/components/menu/DietaryFilter';

export const metadata: Metadata = {
  title: 'Menu | Las Cruces Culinary Innovation Hub',
  description:
    'Explore the full menu at the LC Culinary Hub — birria tacos, Vietnamese pho, Mediterranean shawarma, NM craft cider flights, desserts, and more from 10–13 food vendors.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title:       'Menu — LC Culinary Hub',
    description: 'Global food concepts, NM craft cider, and culinary incubator dishes all under one roof in downtown Las Cruces.',
    url:         'https://www.lccullinaryhub.com/menu',
  },
};

function MenuContent({ vendor, diet }: { vendor: string; diet: string }) {
  const allItems  = getAllItems();
  const vendors   = getVendorNames();

  let filtered = allItems;
  if (vendor && vendor !== 'all') filtered = filtered.filter(i => i.vendorSlug === vendor);
  if (diet   && diet   !== 'all') filtered = filtered.filter(i => i.dietary.includes(diet as DietaryTag));

  // Group by vendor for display
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
    if (!acc[item.vendorSlug]) acc[item.vendorSlug] = [];
    acc[item.vendorSlug].push(item);
    return acc;
  }, {});

  const activeVendor = vendor || 'all';
  const activeDiet   = diet   || 'all';

  return (
    <main className="min-h-screen" style={{ background: '#100E0A' }}>

      {/* ── Page header */}
      <div className="relative px-6 pb-12 pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,75,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl relative">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 hover:text-gold transition-colors duration-500"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to the Hub
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-8 mb-2">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="block h-px w-12 shrink-0" style={{ background: 'linear-gradient(90deg, #C97A3E, #D4A84B)' }} />
                <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#C97A3E' }}>Las Cruces Culinary Hub · Menu</span>
              </div>
              <h1 className="font-corp-display text-5xl sm:text-6xl font-light leading-[0.92]" style={{ color: '#E8D3A5' }}>The Menu</h1>
              <p className="mt-4 font-sans text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(232,211,165,0.40)' }}>
                Global food concepts, NM craft cider, and incubator dishes — all under one roof. Filter by vendor or dietary need.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="px-6 py-4 text-center" style={{ border: '1px solid rgba(212,168,75,0.18)', background: 'rgba(212,168,75,0.05)' }}>
                <div className="font-corp-display text-3xl font-light" style={{ color: '#D4A84B' }}>{allItems.length}</div>
                <div className="font-label text-[7.5px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(232,211,165,0.30)' }}>Dishes</div>
              </div>
              <div className="px-6 py-4 text-center" style={{ border: '1px solid rgba(212,168,75,0.18)', background: 'rgba(212,168,75,0.05)' }}>
                <div className="font-corp-display text-3xl font-light" style={{ color: '#D4A84B' }}>{vendors.length}</div>
                <div className="font-label text-[7.5px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(232,211,165,0.30)' }}>Vendors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter bar */}
      <div className="px-6 py-6" style={{ borderTop: '1px solid rgba(232,211,165,0.07)', borderBottom: '1px solid rgba(232,211,165,0.07)' }}>
        <div className="mx-auto max-w-6xl">
          <DietaryFilter activeVendor={activeVendor} activeDiet={activeDiet} vendors={vendors} />
        </div>
      </div>

      {/* ── Menu grid */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          {Object.keys(grouped).length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-corp-display text-2xl font-light" style={{ color: 'rgba(232,211,165,0.25)' }}>No dishes match these filters.</p>
              <p className="mt-3 font-label text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(232,211,165,0.15)' }}>Try adjusting vendor or dietary selection.</p>
            </div>
          ) : (
            <div className="space-y-14">
              {Object.entries(grouped).map(([vendorSlug, items]) => (
                <section key={vendorSlug}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="block h-px w-8 shrink-0" style={{ background: 'linear-gradient(90deg, #C97A3E44, transparent)' }} />
                    <Link
                      href={`/vendors/${vendorSlug}`}
                      className="font-label text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 hover:text-gold"
                      style={{ color: 'rgba(201,122,62,0.60)' }}
                    >{items[0].vendorName} ↗</Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                      <DishCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Vendor CTA */}
      <div className="px-6 py-16" style={{ borderTop: '1px solid rgba(232,211,165,0.07)' }}>
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-corp-display text-3xl font-light" style={{ color: '#E8D3A5' }}>Want Your Concept on This Menu?</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(232,211,165,0.40)' }}>
              The founding vendor cohort of 10–13 concepts is being selected now. Applications open — Q3–Q4 2026 decision timeline.
            </p>
          </div>
          <Link
            href="/vendors"
            className="shrink-0 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #C97A3E 0%, #D4A84B 100%)', padding: '13px 28px', color: '#100E0A', fontWeight: 600 }}
          >
            Apply as a Vendor
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function MenuPage({ searchParams }: { searchParams: { vendor?: string; diet?: string } }) {
  return (
    <Suspense>
      <MenuContent vendor={searchParams.vendor ?? 'all'} diet={searchParams.diet ?? 'all'} />
    </Suspense>
  );
}
