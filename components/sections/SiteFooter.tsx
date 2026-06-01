'use client';
// SiteFooter — Direction 3: Artisan Collective
// Luxury upgrades:
//   • Pre-footer editorial band — full-width terracotta radial glow, Cormorant
//     display headline, two CTAs, opening date chip.
//   • Brand column pull-quote wrapped in a decorative ❝ opener with terracotta tint.
//   • Bottom-bar legal text refined to 3-col flex with centred copyright symbol.
//   • Grain overlay on the pre-footer band via .grain utility class.

import Link from 'next/link';

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const footerColumns = [
  {
    heading: 'The Space',
    links: [
      { label: 'The Hub',                href: '/#opportunity'   },
      { label: 'How It Works',           href: '/#concept'       },
      { label: 'Cider Bar',              href: '/#cider-bar'     },
      { label: 'Interactive Floor Plan', href: '/floor-plan/'    },
    ],
  },
  {
    heading: 'Join Us',
    links: [
      { label: 'Apply as a Vendor',  href: '/vendors'              },
      { label: 'Vendor Onboarding',  href: '/vendors/onboarding'   },
      { label: 'Kitchen Policies',   href: '/kitchen-policies'     },
      { label: 'Incubator Program',  href: '/incubator'            },
      { label: 'Cider Club',         href: '/cider-club'           },
      { label: 'Get Involved',       href: '/#newsletter'          },
    ],
  },
  {
    heading: 'Invest',
    links: [
      { label: 'Investor Overview', href: '/investors'       },
      { label: 'FAQ',               href: '/#faq'            },
      { label: 'Contact Us',        href: '#footer-contact'  },
    ],
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lccullinaryhub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/lccullinaryhub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@lccullinaryhub',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.79 1.53V6.76a4.85 4.85 0 01-1.02-.07z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer id="contact" style={{ background: D3.walnut, borderTop: `1px solid rgba(232,193,141,0.1)` }}>
      <style>{`
        .footer-main-grid  { display: grid; grid-template-columns: repeat(12, 1fr); gap: 2rem; margin-bottom: 4rem; }
        .footer-brand-col  { grid-column: span 4; }
        .footer-links-col  { grid-column: span 8; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        @media (max-width: 768px) {
          .footer-main-grid  { grid-template-columns: 1fr; }
          .footer-brand-col  { grid-column: span 1; }
          .footer-links-col  { grid-column: span 1; grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .footer-links-col  { grid-template-columns: 1fr; }
        }
        .footer-pre-footer-pad { padding: 6rem 1.5rem; }
        .footer-body-pad       { padding: 5rem 1.5rem; }
        @media (max-width: 640px) {
          .footer-pre-footer-pad { padding: 4rem 1.25rem; }
          .footer-body-pad       { padding: 3.5rem 1.25rem; }
        }
      `}</style>

      {/* ── Pre-footer editorial band ──────────────────────────────────────── */}
      <div
        className="grain footer-pre-footer-pad"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, #1a1108 0%, #2c2416 45%, #1e1409 100%)`,
          borderBottom: '1px solid rgba(232,193,141,0.08)',
          textAlign: 'center',
        }}
      >
        {/* Terracotta radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 100% at 50% 60%, rgba(192,98,42,0.13) 0%, transparent 70%)',
        }} aria-hidden="true" />
        {/* Top rule */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '120px', height: '1px',
          background: `linear-gradient(to right, transparent, ${D3.terracotta}, transparent)`,
          opacity: 0.55,
        }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '42rem', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.25rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, opacity: 0.7 }} />
            <span style={{
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase',
              color: D3.terracotta,
            }}>Opening Q1–Q2 2027 · Downtown Las Cruces</span>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, opacity: 0.7 }} />
          </div>

          {/* Display headline */}
          <h2 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            fontWeight: 300, lineHeight: 0.97, letterSpacing: '-0.01em',
            color: D3.parchment, marginBottom: '1.5rem',
          }}>
            The Borderland&rsquo;s Table<br />
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Is Almost Set</em>
          </h2>

          {/* Wheat rule */}
          <div style={{
            width: '48px', height: '1px', margin: '0 auto 1.75rem',
            background: `linear-gradient(to right, transparent, ${D3.wheat}, transparent)`,
            opacity: 0.4,
          }} />

          <p style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.925rem', color: D3.wheat, opacity: 0.55,
            lineHeight: 1.85, marginBottom: '2.75rem',
          }}>
            Founding vendor spots, Cider Club memberships, and investor positions
            are open now — before the doors ever open.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.875rem' }}>
            <Link href="/vendors"
              style={{
                background: D3.terracotta, color: D3.parchment,
                padding: '13px 32px',
                fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', fontWeight: 600,
                transition: 'opacity 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >Apply as a Vendor</Link>

            <Link href="/investors"
              style={{
                border: '1px solid rgba(247,243,236,0.2)',
                color: `${D3.wheat}bb`, padding: '12px 32px',
                fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.6)'; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}bb`; }}
            >Investor Overview</Link>

            <Link href="/cider-club"
              style={{
                border: '1px solid rgba(247,243,236,0.2)',
                color: `${D3.wheat}bb`, padding: '12px 32px',
                fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.6)'; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}bb`; }}
            >Join Cider Club</Link>
          </div>
        </div>
      </div>

      {/* Terracotta top rule */}
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${D3.terracotta}, transparent)`, opacity: 0.45 }} />

      <div style={{ maxWidth: '75rem', margin: '0 auto' }} className="footer-body-pad">

        {/* Main grid */}
        <div className="footer-main-grid">

          {/* Brand column */}
          <div className="footer-brand-col">
            <Link href="/" style={{ display: 'inline-block', marginBottom: '0.75rem', textDecoration: 'none' }}>
              <p
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.85rem', fontWeight: 300, color: D3.parchment, transition: 'color 0.3s', lineHeight: 1.1 }}
                onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
                onMouseLeave={e => (e.currentTarget.style.color = D3.parchment)}
              >
                Cider &amp; Spice
              </p>
            </Link>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}40`, marginBottom: '0.25rem' }}>
              Las Cruces Culinary Innovation Hub
            </p>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: `${D3.terracotta}70`, marginBottom: '1.75rem' }}>
              Opening Q1&ndash;Q2 2027 &middot; Downtown Las Cruces, NM
            </p>

            {/* Pull-quote with decorative opener */}
            <blockquote style={{
              position: 'relative',
              borderLeft: `2px solid rgba(192,98,42,0.3)`,
              paddingLeft: '1.25rem',
              marginBottom: '2rem',
            }}>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '-0.5rem', left: '0.75rem',
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '3rem', lineHeight: 1, color: D3.terracotta,
                  opacity: 0.25, userSelect: 'none',
                }}
              >&ldquo;</span>
              <p style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.875rem', color: D3.wheat, opacity: 0.5,
                lineHeight: 1.85, fontStyle: 'italic', paddingTop: '0.75rem',
              }}>
                Las Cruces has always had great food. Now it has everything else too.
              </p>
            </blockquote>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              {socialLinks.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '2rem', height: '2rem',
                    border: `1px solid rgba(232,193,141,0.15)`,
                    color: `${D3.wheat}55`,
                    transition: 'color 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = D3.terracotta; (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(192,98,42,0.5)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}55`; (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(232,193,141,0.15)`; }}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div id="footer-contact">
              <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}35`, marginBottom: '0.5rem' }}>
                Get in Touch
              </p>
              <a href="mailto:info@lccullinaryhub.com"
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: `${D3.wheat}80`, textDecoration: 'none', display: 'block', marginBottom: '0.25rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
                onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}80`)}
              >
                info@lccullinaryhub.com
              </a>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', color: `${D3.wheat}30` }}>
                We typically respond within one business day.
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="footer-links-col">
            {footerColumns.map(({ heading, links }) => (
              <div key={heading}>
                <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '1.5rem' }}>
                  {heading}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }} role="list">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href}
                        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: `${D3.wheat}55`, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = D3.parchment)}
                        onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}55`)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid rgba(232,193,141,0.07)`, marginBottom: '2rem' }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', color: `${D3.wheat}28` }}>
            &copy; {new Date().getFullYear()} Cider &amp; Spice &middot; Downtown Las Cruces, NM
          </p>
          <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}22`, textAlign: 'center' }}>
            <span style={{ color: D3.terracotta, opacity: 0.4, marginRight: '0.6rem' }} aria-hidden="true">✦</span>
            Opening Q1&ndash;Q2 2027
            <span style={{ color: D3.terracotta, opacity: 0.4, marginLeft: '0.6rem' }} aria-hidden="true">✦</span>
          </p>
          <a href="#top" aria-label="Return to top of page"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}30`, textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
            onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}30`)}
          >
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', color: 'inherit' }} aria-hidden="true">◈</span>
            Back to Top
          </a>
        </div>

        {/* Legal */}
        <p style={{ marginTop: '2rem', textAlign: 'center', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.65rem', lineHeight: 1.75, color: `${D3.wheat}18`, maxWidth: '40rem', margin: '2rem auto 0' }}>
          Forward-looking financial projections are for informational purposes only and do not constitute an offer of securities.
          Vendor brands, pricing, and layouts are subject to change. Target opening: Q1&ndash;Q2 2027.
        </p>

      </div>
    </footer>
  );
}
