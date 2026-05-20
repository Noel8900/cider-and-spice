import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEvent, getAllEvents, CATEGORY_LABELS, CATEGORY_COLOR } from '@/lib/events';

export async function generateStaticParams() {
  return getAllEvents().map(e => ({ slug: e.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const event = getEvent(params.slug);
  if (!event) return {};
  return {
    title:       `${event.title} | LC Culinary Hub Events`,
    description: event.description,
    alternates:  { canonical: `/events/${event.slug}` },
    openGraph: {
      title:       `${event.title} — LC Culinary Hub`,
      description: event.description,
      url:         `https://www.lccullinaryhub.com/events/${event.slug}`,
    },
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);
  if (!event) notFound();

  const color   = CATEGORY_COLOR[event.category];
  const dateObj = new Date(event.date + 'T12:00:00');
  const fullDate = dateObj.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const month    = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day      = dateObj.getDate();

  return (
    <main className="min-h-screen text-cream" style={{ background: '#100E0A' }}>

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="relative px-6 pb-12 pt-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color}12 0%, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-5xl relative">
          <Link
            href="/events"
            className="mb-12 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 hover:text-gold transition-colors duration-500"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Events
          </Link>

          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
            {/* Date block */}
            <div
              className="shrink-0 flex flex-col items-center justify-center"
              style={{
                width: 80, minHeight: 88,
                background: `${color}11`,
                border: `1px solid ${color}44`,
              }}
            >
              <span className="font-label text-[9px] tracking-[0.25em] uppercase" style={{ color }}>{month}</span>
              <span className="font-corp-display text-5xl font-light leading-none mt-1" style={{ color: '#E8D3A5' }}>{day}</span>
            </div>

            {/* Title block */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="font-label text-[7.5px] tracking-[0.22em] uppercase px-2.5 py-1"
                  style={{ color, border: `1px solid ${color}33`, background: `${color}0D` }}
                >{CATEGORY_LABELS[event.category]}</span>
                {event.featured && (
                  <span
                    className="font-label text-[7px] tracking-[0.2em] uppercase px-2.5 py-1"
                    style={{ color: 'rgba(212,168,75,0.60)', border: '1px solid rgba(212,168,75,0.18)', background: 'rgba(212,168,75,0.06)' }}
                  >Featured</span>
                )}
              </div>
              <h1 className="font-corp-display text-4xl sm:text-5xl font-light leading-[0.95]" style={{ color: '#E8D3A5' }}>{event.title}</h1>
              <p className="mt-3 font-label text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,122,62,0.65)' }}>{event.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div
        className="px-6 py-12"
        style={{ borderTop: `1px solid ${color}22` }}
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

          {/* Story */}
          <div className="md:col-span-2">
            <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: 'rgba(232,211,165,0.55)' }}>{event.story}</p>

            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="font-label text-[7.5px] tracking-[0.2em] uppercase px-3 py-1"
                    style={{ border: '1px solid rgba(232,211,165,0.10)', color: 'rgba(232,211,165,0.30)' }}
                  >{tag}</span>
                ))}
              </div>
            )}

            {event.ticketUrl ? (
              <Link
                href={event.ticketUrl}
                className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${color} 0%, #D4A84B 100%)`, padding: '13px 28px', color: '#100E0A', fontWeight: 600 }}
              >
                {event.price === 'Free' ? 'Reserve a Spot' : `Get Tickets · ${event.price}`}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            ) : (
              <div
                className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase"
                style={{ border: `1px solid ${color}44`, background: `${color}0D`, padding: '13px 28px', color }}
              >
                Free Entry · No Ticket Required
              </div>
            )}
          </div>

          {/* Details sidebar */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-px self-start" style={{ background: 'rgba(232,211,165,0.06)' }}>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-base font-light" style={{ color: '#D4A84B' }}>{fullDate}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Date</div>
            </div>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-base font-light" style={{ color: '#D4A84B' }}>Doors {event.doors} · Show {event.time}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Time</div>
            </div>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-base font-light" style={{ color: event.price === 'Free' ? '#8BAF6A' : '#D4A84B' }}>{event.price}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Price</div>
            </div>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-base font-light" style={{ color: '#D4A84B' }}>{event.capacity}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Capacity</div>
            </div>
            <div className="col-span-2 md:col-span-1" style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-sm font-light" style={{ color: '#D4A84B' }}>Event Stage · LC Culinary Hub</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Venue</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floor plan link ──────────────────────────────────────────── */}
      <div
        className="px-6 py-10"
        style={{ borderTop: '1px solid rgba(232,211,165,0.07)' }}
      >
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-label text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(232,211,165,0.25)' }}>Venue</p>
            <p className="font-corp-display text-xl font-light" style={{ color: '#E8D3A5' }}>Event Stage &amp; Atrium · 8,000 Sq Ft</p>
            <p className="font-sans text-xs mt-1" style={{ color: 'rgba(232,211,165,0.35)' }}>East Lohman Ave Corridor · Las Cruces, NM 88001</p>
          </div>
          <Link
            href="/floor-plan"
            className="shrink-0 inline-flex items-center gap-2.5 font-label text-[8.5px] tracking-[0.22em] uppercase transition-all duration-300"
            style={{ border: '1px solid rgba(212,168,75,0.25)', background: 'rgba(212,168,75,0.05)', padding: '11px 22px', color: 'rgba(212,168,75,0.70)' }}
          >
            View Floor Plan
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
