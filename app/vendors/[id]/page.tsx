import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllVendorProfiles, getVendorProfile } from '@/lib/vendors';

export async function generateStaticParams() {
  return getAllVendorProfiles().map(v => ({ id: v.slug }));
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const vendor = getVendorProfile(params.id);
  if (!vendor) return {};
  return {
    title:       `${vendor.name} | LC Culinary Hub`,
    description: vendor.tagline,
    alternates:  { canonical: `/vendors/${vendor.slug}` },
    openGraph: {
      title:       `${vendor.name} — LC Culinary Hub`,
      description: vendor.tagline,
      url:         `https://www.lccullinaryhub.com/vendors/${vendor.slug}`,
    },
  };
}

const STATUS_COLOR: Record<string, string> = {
  confirmed: '#4F98A3',
  reserved:  '#C45D2A',
  open:      '#D4A84B',
};

const STATUS_LABEL: Record<string, string> = {
  confirmed: 'Confirmed',
  reserved:  'Reserved',
  open:      'Open — Accepting Applications',
};

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  const vendor = getVendorProfile(params.id);
  if (!vendor) notFound();

  const color = STATUS_COLOR[vendor.status];

  return (
    <main className="min-h-screen text-cream" style={{ background: '#100E0A' }}>

      {/* Header */}
      <div className="relative px-6 pb-12 pt-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color}10 0%, transparent 70%)` }} aria-hidden="true" />
        <div className="mx-auto max-w-5xl relative">
          <Link href="/vendors" className="mb-12 inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 hover:text-gold transition-colors duration-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            All Vendors
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <span className="block h-px w-12 shrink-0" style={{ background: 'linear-gradient(90deg, #C97A3E, #D4A84B)' }} />
            <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#C97A3E' }}>LC Culinary Hub · {vendor.stallLabel}</span>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-label text-[7.5px] tracking-[0.22em] uppercase px-2.5 py-1" style={{ color, border: `1px solid ${color}44`, background: `${color}11` }}>{STATUS_LABEL[vendor.status]}</span>
                {vendor.featured && <span className="font-label text-[7px] tracking-[0.2em] uppercase px-2.5 py-1" style={{ color: 'rgba(212,168,75,0.60)', border: '1px solid rgba(212,168,75,0.18)', background: 'rgba(212,168,75,0.06)' }}>Hub Anchor</span>}
              </div>
              <h1 className="font-corp-display text-4xl sm:text-5xl font-light leading-[0.95] mb-3" style={{ color: '#E8D3A5' }}>{vendor.name}</h1>
              <p className="font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: 'rgba(201,122,62,0.65)' }}>{vendor.cuisineType}</p>
            </div>
            <div className="px-8 py-5 text-center shrink-0" style={{ border: '1px solid rgba(212,168,75,0.18)', background: 'linear-gradient(135deg, rgba(212,168,75,0.06) 0%, rgba(201,122,62,0.04) 100%)' }}>
              <div className="font-corp-display text-3xl font-light" style={{ color: '#D4A84B' }}>{vendor.sqft.toLocaleString()}</div>
              <div className="font-label text-[8px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(232,211,165,0.35)' }}>Sq Ft</div>
              <div className="mt-4 font-corp-display text-xl font-light" style={{ color: '#D4A84B' }}>{vendor.rent}</div>
              <div className="font-label text-[8px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(232,211,165,0.35)' }}>Est. Rent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-12" style={{ borderTop: `1px solid ${color}22` }}>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="md:col-span-2">
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'rgba(232,211,165,0.55)' }}>{vendor.story}</p>
            <p className="font-label text-[8px] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(232,211,165,0.22)' }}>Cuisine & Concept Tags</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {vendor.cuisineTags.map(tag => (
                <span key={tag} className="font-label text-[7.5px] tracking-[0.2em] uppercase px-3 py-1" style={{ border: '1px solid rgba(232,211,165,0.10)', color: 'rgba(232,211,165,0.35)' }}>{tag}</span>
              ))}
            </div>
            {vendor.status === 'open' && (
              <Link href={`/vendors?stall=${vendor.stallId}`} className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300" style={{ background: 'linear-gradient(135deg, #C97A3E 0%, #D4A84B 100%)', padding: '13px 28px', color: '#100E0A', fontWeight: 600 }}>
                Apply for This Stall
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            )}
            {vendor.status === 'reserved' && (
              <Link href="/vendors" className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase transition-all duration-300" style={{ border: '1px solid rgba(196,93,42,0.30)', background: 'rgba(196,93,42,0.06)', padding: '13px 28px', color: 'rgba(196,93,42,0.75)' }}>Join the Waitlist →</Link>
            )}
            {vendor.status === 'confirmed' && (
              <div className="inline-flex items-center gap-2.5 font-label text-[9px] tracking-[0.28em] uppercase" style={{ border: '1px solid rgba(79,152,163,0.30)', background: 'rgba(79,152,163,0.06)', padding: '13px 28px', color: 'rgba(79,152,163,0.75)' }}>Hub Anchor · Opening 2027</div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-px self-start" style={{ background: 'rgba(232,211,165,0.06)' }}>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-xl font-light" style={{ color: '#D4A84B' }}>{vendor.zone.charAt(0).toUpperCase() + vendor.zone.slice(1)}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Zone</div>
            </div>
            <div style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-corp-display text-xl font-light" style={{ color: '#D4A84B' }}>{vendor.sqft.toLocaleString()} sq ft</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Space</div>
            </div>
            <div className="col-span-2 md:col-span-1" style={{ background: '#13110D', padding: '16px 18px' }}>
              <div className="font-sans text-xs font-light leading-relaxed" style={{ color: 'rgba(212,168,75,0.70)' }}>{vendor.hours}</div>
              <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-0.5" style={{ color: 'rgba(232,211,165,0.28)' }}>Hours</div>
            </div>
            {(vendor.social.instagram || vendor.social.website) && (
              <div className="col-span-2 md:col-span-1" style={{ background: '#13110D', padding: '16px 18px' }}>
                <div className="flex flex-wrap gap-3">
                  {vendor.social.instagram && <a href={vendor.social.instagram} target="_blank" rel="noopener noreferrer" className="font-label text-[7.5px] tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,75,0.50)' }}>Instagram ↗</a>}
                  {vendor.social.website && <a href={vendor.social.website} target="_blank" rel="noopener noreferrer" className="font-label text-[7.5px] tracking-[0.2em] uppercase" style={{ color: 'rgba(212,168,75,0.50)' }}>Website ↗</a>}
                </div>
                <div className="font-label text-[7.5px] tracking-[0.22em] uppercase mt-1" style={{ color: 'rgba(232,211,165,0.28)' }}>Links</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floor plan deep-link */}
      <div className="px-6 py-10" style={{ borderTop: '1px solid rgba(232,211,165,0.07)' }}>
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-label text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(232,211,165,0.25)' }}>Location</p>
            <p className="font-corp-display text-xl font-light" style={{ color: '#E8D3A5' }}>{vendor.stallLabel} · {vendor.sqft} Sq Ft</p>
            <p className="font-sans text-xs mt-1" style={{ color: 'rgba(232,211,165,0.35)' }}>East Lohman Ave Corridor · Las Cruces, NM 88001</p>
          </div>
          <Link href={`/floor-plan#${vendor.stallId}`} className="shrink-0 inline-flex items-center gap-2.5 font-label text-[8.5px] tracking-[0.22em] uppercase transition-all duration-300" style={{ border: '1px solid rgba(212,168,75,0.25)', background: 'rgba(212,168,75,0.05)', padding: '11px 22px', color: 'rgba(212,168,75,0.70)' }}>
            View on Floor Plan
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
