import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllTaps, getTapsByStyle, getFeaturedTaps,
  STYLE_LABELS, STYLE_COLOR, LAST_UPDATED,
  CiderStyle,
} from '@/lib/taps';

export const metadata: Metadata = {
  title: 'Tap List | Cider & Spice Bar · LC Culinary Hub',
  description:
    '22 rotating NM craft cider taps at the LC Culinary Hub Cider & Spice Bar — bone-dry, hopped, barrel-aged, heritage, fruit, and seasonal pours from 8 New Mexico cideries.',
  alternates: { canonical: '/cider-club/taps' },
  openGraph: {
    title:       'Tap List — Cider & Spice Bar · LC Culinary Hub',
    description: '22 rotating NM craft cider taps. Bone-dry to barrel-aged. All New Mexico.',
    url:         'https://www.lccullinaryhub.com/cider-club/taps',
  },
};

const ALL_STYLES: CiderStyle[] = ['bone-dry','off-dry','hopped','barrel-aged','heritage','fruit','seasonal'];

function TapCard({ tap }: { tap: ReturnType<typeof getAllTaps>[number] }) {
  const color = STYLE_COLOR[tap.style];
  return (
    <div
      className="flex gap-4 p-4"
      style={{
        background: 'linear-gradient(160deg, #1A1510 0%, #13110D 100%)',
        border: '1px solid rgba(232,211,165,0.07)',
      }}
    >
      {/* Tap number */}
      <div
        className="shrink-0 flex items-center justify-center"
        style={{ width: 40, height: 40, background: `${color}11`, border: `1px solid ${color}33` }}
      >
        <span className="font-corp-display text-base font-light" style={{ color }}>{tap.tap}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-0.5">
          <h3 className="font-corp-display text-base font-light leading-snug" style={{ color: '#E8D3A5' }}>{tap.name}</h3>
          <span className="font-corp-display text-sm font-light shrink-0" style={{ color: '#D4A84B' }}>{tap.abv}%</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="font-label text-[7.5px] tracking-[0.2em] uppercase" style={{ color: 'rgba(201,122,62,0.65)' }}>{tap.cidery}</span>
          <span className="font-label text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(232,211,165,0.22)' }}>{tap.region}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-sans text-xs leading-relaxed" style={{ color: 'rgba(232,211,165,0.38)', maxWidth: '42ch' }}>{tap.notes}</p>
          <span
            className="shrink-0 font-label text-[7px] tracking-[0.2em] uppercase px-2 py-0.5"
            style={{ color, border: `1px solid ${color}33`, background: `${color}0D` }}
          >{STYLE_LABELS[tap.style]}</span>
        </div>
      </div>

      {tap.featured && (
        <div className="shrink-0 self-start">
          <span
            className="font-label text-[6.5px] tracking-[0.2em] uppercase px-1.5 py-0.5"
            style={{ color: 'rgba(212,168,75,0.55)', border: '1px solid rgba(212,168,75,0.18)', background: 'rgba(212,168,75,0.06)' }}
          >♥</span>
        </div>
      )}
    </div>
  );
}

function TapsContent({ style }: { style: string }) {
  const activeStyle = (style && style !== 'all' ? style : 'all') as CiderStyle | 'all';
  const taps = activeStyle === 'all' ? getAllTaps() : getTapsByStyle(activeStyle);
  const featured = getFeaturedTaps();

  const updatedDate = new Date(LAST_UPDATED + 'T12:00:00').toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <main className="min-h-screen" style={{ background: '#100E0A' }}>

      {/* ── Header */}
      <div className="relative px-4 sm:px-6 pb-10 pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(196,93,42,0.09) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl relative">
          <Link
            href="/cider-club"
            className="mb-10 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 hover:text-gold transition-colors duration-500"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Cider Club
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="block h-px w-12 shrink-0" style={{ background: 'linear-gradient(90deg, #C45D2A, #D4A84B)' }} />
            <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#C45D2A' }}>Cider & Spice Bar · On Tap Now</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-corp-display text-4xl sm:text-5xl font-light leading-[0.92]" style={{ color: '#E8D3A5' }}>Tap List</h1>
              <p className="mt-3 font-sans text-xs leading-relaxed" style={{ color: 'rgba(232,211,165,0.38)' }}>
                {getAllTaps().length} taps on · {getCideriesCount()} NM cideries · All New Mexico
              </p>
            </div>
            <div className="text-right">
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase" style={{ color: 'rgba(232,211,165,0.22)' }}>Last updated</div>
              <div className="font-corp-display text-sm font-light mt-0.5" style={{ color: 'rgba(212,168,75,0.60)' }}>{updatedDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Style filter */}
      <div className="px-4 sm:px-6 py-4" style={{ borderTop: '1px solid rgba(232,211,165,0.07)', borderBottom: '1px solid rgba(232,211,165,0.07)' }}>
        <div className="mx-auto max-w-3xl">
          <StyleFilter active={activeStyle} />
        </div>
      </div>

      {/* ── Featured strip (all-view only) */}
      {activeStyle === 'all' && featured.length > 0 && (
        <div className="px-4 sm:px-6 py-6" style={{ borderBottom: '1px solid rgba(232,211,165,0.07)', background: 'rgba(212,168,75,0.02)' }}>
          <div className="mx-auto max-w-3xl">
            <span className="font-label text-[8px] tracking-[0.3em] uppercase mb-4 block" style={{ color: 'rgba(212,168,75,0.40)' }}>Staff Picks</span>
            <div className="flex flex-col gap-2">
              {featured.map(tap => <TapCard key={tap.tap} tap={tap} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── Full tap list */}
      <div className="px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-3xl">
          {taps.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-corp-display text-xl font-light" style={{ color: 'rgba(232,211,165,0.25)' }}>No taps in this style right now.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {taps.map(tap => <TapCard key={tap.tap} tap={tap} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Cider Club CTA */}
      <div className="px-4 sm:px-6 py-14" style={{ borderTop: '1px solid rgba(232,211,165,0.07)' }}>
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-corp-display text-2xl font-light" style={{ color: '#E8D3A5' }}>Drink More for Less</h2>
            <p className="mt-2 font-sans text-sm leading-relaxed max-w-md" style={{ color: 'rgba(232,211,165,0.38)' }}>
              Cider Club members get monthly pour credits, exclusive tap previews, and reserved bar-top seating. Starting at $25/mo.
            </p>
          </div>
          <Link
            href="/cider-club"
            className="shrink-0 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #C45D2A 0%, #D4A84B 100%)', padding: '13px 28px', color: '#100E0A', fontWeight: 600 }}
          >
            Join the Cider Club
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

function getCideriesCount() {
  const { getCideries } = require('@/lib/taps');
  return getCideries().length;
}

function StyleFilter({ active }: { active: CiderStyle | 'all' }) {
  return (
    <div className="flex flex-wrap gap-2">
      <StylePill id="all" label="All" active={active === 'all'} color="#D4A84B" />
      {ALL_STYLES.map(s => (
        <StylePill key={s} id={s} label={STYLE_LABELS[s]} active={active === s} color={STYLE_COLOR[s]} />
      ))}
    </div>
  );
}

function StylePill({ id, label, active, color }: { id: string; label: string; active: boolean; color: string }) {
  return (
    <a
      href={id === 'all' ? '/cider-club/taps' : `/cider-club/taps?style=${id}`}
      aria-current={active ? 'page' : undefined}
      className="px-3 py-1.5 font-label text-[7.5px] tracking-[0.2em] uppercase transition-all duration-300"
      style={{
        border:     active ? `1px solid ${color}55` : '1px solid rgba(232,211,165,0.09)',
        background: active ? `${color}12`           : 'transparent',
        color:      active ? color                  : 'rgba(232,211,165,0.28)',
      }}
    >{label}</a>
  );
}

export default function TapsPage({ searchParams }: { searchParams: { style?: string } }) {
  return (
    <Suspense>
      <TapsContent style={searchParams.style ?? 'all'} />
    </Suspense>
  );
}
