// SiteFooter — Direction 3: Artisan Collective
// Walnut/chestnut bg, terracotta accents, Cormorant wordmark, Josefin labels.
// All nav links, social links, and legal copy preserved + grammar-fixed.

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

      {/* Terracotta top rule */}
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${D3.terracotta}, transparent)`, opacity: 0.5 }} />

      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '5rem 1.5rem' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', marginBottom: '4rem' }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 4' }}>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '0.75rem', textDecoration: 'none' }}>
              <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.85rem', fontWeight: 300, color: D3.parchment, transition: 'color 0.3s', lineHeight: 1.1 }}
                onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
                onMouseLeave={e => (e.currentTarget.style.color = D3.parchment)}>
                Cider &amp; Spice
              </p>
            </Link>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}40`, marginBottom: '0.25rem' }}>
              Las Cruces Culinary Innovation Hub
            </p>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: `${D3.terracotta}70`, marginBottom: '1.5rem' }}>
              Opening Q1&ndash;Q2 2027 &middot; Downtown Las Cruces, NM
            </p>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.45, lineHeight: 1.8, maxWidth: '18rem', marginBottom: '2rem' }}>
              &ldquo;Las Cruces has always had great food. Now it has everything else too.&rdquo;
            </p>

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
          <div style={{ gridColumn: 'span 8', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
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
          <a href="#top" aria-label="Return to top of page"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}30`, textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
            onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}30`)}
          >
            <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', color: 'inherit' }} aria-hidden="true">◈</span>
            Back to Top
          </a>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', color: `${D3.wheat}28` }}>
            Opening Q1&ndash;Q2 2027
          </p>
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
