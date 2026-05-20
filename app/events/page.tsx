import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllEvents, getFeaturedEvents, CATEGORY_LABELS, EventCategory, CATEGORY_COLOR } from '@/lib/events';
import EventCard from '@/components/events/EventCard';
import MonthFilter from '@/components/events/MonthFilter';

export const metadata: Metadata = {
  title: 'Events | Las Cruces Culinary Innovation Hub',
  description:
    'Live Music Fridays, Chile Harvest tastings, cooking classes, entrepreneur pitch nights, and monthly makers markets at the Las Cruces Culinary Innovation Hub.',
  alternates: { canonical: '/events' },
  openGraph: {
    title:       'Events — LC Culinary Hub',
    description: 'Live music, cider tastings, cooking classes, and more. See what's on at the Hub.',
    url:         'https://www.lccullinaryhub.com/events',
  },
};

function EventsContent({ cat }: { cat: string | undefined }) {
  const all      = getAllEvents();
  const featured = getFeaturedEvents();
  const filtered = cat && cat !== 'all'
    ? all.filter(e => e.category === cat)
    : all;
  const activeCategory = (cat && cat !== 'all' ? cat : 'all') as EventCategory | 'all';

  return (
    <main className="min-h-screen" style={{ background: '#100E0A' }}>

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="relative px-6 pb-12 pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,168,75,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-5xl relative">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 hover:text-gold transition-colors duration-500"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to the Hub
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-8 mb-2">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="block h-px w-12 shrink-0" style={{ background: 'linear-gradient(90deg, #C97A3E, #D4A84B)' }} />
                <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#C97A3E' }}>Las Cruces Culinary Hub · Programming</span>
              </div>
              <h1 className="font-corp-display text-5xl sm:text-6xl font-light leading-[0.92]" style={{ color: '#E8D3A5' }}>Events &amp; Programming</h1>
              <p className="mt-4 font-sans text-sm leading-relaxed max-w-md" style={{ color: 'rgba(232,211,165,0.40)' }}>
                Live music, cider tastings, cooking classes, pitch nights, and the Sunday Makers Market — all inside the Hub.
              </p>
            </div>
            <div
              className="px-8 py-5 text-center"
              style={{
                border: '1px solid rgba(212,168,75,0.18)',
                background: 'linear-gradient(135deg, rgba(212,168,75,0.06) 0%, rgba(201,122,62,0.04) 100%)',
              }}
            >
              <div className="font-corp-display text-4xl font-light" style={{ color: '#D4A84B' }}>{all.length}</div>
              <div className="font-label text-[8px] tracking-[0.3em] uppercase mt-1.5" style={{ color: 'rgba(232,211,165,0.35)' }}>Upcoming Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured strip ───────────────────────────────────────────── */}
      {featured.length > 0 && !cat && (
        <div
          className="px-6 py-6"
          style={{ borderTop: '1px solid rgba(232,211,165,0.07)', borderBottom: '1px solid rgba(232,211,165,0.07)', background: 'rgba(212,168,75,0.02)' }}
        >
          <div className="mx-auto max-w-5xl">
            <span className="font-label text-[8px] tracking-[0.3em] uppercase mb-4 block" style={{ color: 'rgba(212,168,75,0.45)' }}>Featured</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map(event => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Category filter ──────────────────────────────────────────── */}
      <div
        className="px-6 py-5"
        style={{ borderBottom: '1px solid rgba(232,211,165,0.07)' }}
      >
        <div className="mx-auto max-w-5xl">
          <MonthFilter active={activeCategory} />
        </div>
      </div>

      {/* ── Event grid ───────────────────────────────────────────────── */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-corp-display text-2xl font-light" style={{ color: 'rgba(232,211,165,0.25)' }}>No events in this category yet.</p>
              <p className="mt-3 font-label text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(232,211,165,0.15)' }}>Check back soon or browse all events.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map(event => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Private hire CTA ────────────────────────────────────────── */}
      <div
        className="px-6 py-16"
        style={{ borderTop: '1px solid rgba(232,211,165,0.07)' }}
      >
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-corp-display text-3xl font-light" style={{ color: '#E8D3A5' }}>Host Your Event at the Hub</h2>
            <p className="mt-3 font-sans text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(232,211,165,0.40)' }}>
              The event stage seats 40, the full atrium accommodates 80–120. Available for private hire — weddings, corporate events, cultural programming, and producer nights.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #C97A3E 0%, #D4A84B 100%)', padding: '13px 28px', color: '#100E0A', fontWeight: 600 }}
          >
            Inquire About Private Hire
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function EventsPage({ searchParams }: { searchParams: { cat?: string } }) {
  return (
    <Suspense>
      <EventsContent cat={searchParams.cat} />
    </Suspense>
  );
}
