// Luxury multi-column footer — architectural layout.
// 4-column grid: brand + 3 link groups.
// Gold top rule. Cormorant brand name. Refined legal.

import Link from 'next/link';

const footerColumns = [
  {
    heading: 'The Space',
    links: [
      { label: 'The Hub',        href: '/#opportunity'  },
      { label: 'How It Works',   href: '/#concept'      },
      { label: 'Cider Bar',      href: '/#cider-bar'    },
      { label: 'Interactive Floor Plan', href: '/floor-plan/'  },
    ],
  },
  {
    heading: 'Join Us',
    links: [
      { label: 'Apply as Vendor', href: '/vendors'       },
      { label: 'Cider Club',      href: '/cider-club'    },
      { label: 'Community',       href: '/#impact'       },
      { label: 'Get Involved',    href: '/#newsletter'   },
    ],
  },
  {
    heading: 'Invest',
    links: [
      { label: 'Investor Overview', href: '/investors'   },
      { label: 'FAQ',               href: '/#faq'        },
      { label: 'Contact',           href: '#footer-contact' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-bg border-t border-gold/20">

      {/* Gold top rule accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <p className="font-corp-display text-3xl font-light text-cream hover:text-gold
                             transition-colors duration-300">
                Cider &amp; Spice
              </p>
            </Link>
            <p className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/35 mb-6">
              Las Cruces Culinary Innovation Hub
            </p>
            <p className="font-sans text-sm text-cream/45 leading-relaxed max-w-xs mb-8">
              A next-generation food hall, culinary incubator, and Southern New Mexico&apos;s only
              craft cider bar — opening Q1–Q2 2027 in downtown Las Cruces.
            </p>

            {/* Contact */}
            <div id="footer-contact">
              <p className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/30 mb-2">
                Get in Touch
              </p>
              <a
                href="mailto:info@lccullinaryhub.com"
                className="font-sans text-sm text-cream/70 hover:text-gold
                           transition-colors duration-200 block mb-1"
              >
                info@lccullinaryhub.com
              </a>
              <p className="font-sans text-xs text-cream/35">
                We respond within 48 hours.
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
            {footerColumns.map(({ heading, links }) => (
              <div key={heading}>
                <p className="font-label text-[9px] tracking-[0.3em] uppercase text-gold mb-6">
                  {heading}
                </p>
                <ul className="space-y-3.5" role="list">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="font-sans text-sm text-cream/50 hover:text-cream/90
                                   transition-colors duration-200"
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

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="border-t border-cream/[0.07] mb-8" />

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream/25">
            © {new Date().getFullYear()} Cider &amp; Spice · Downtown Las Cruces, NM
          </p>
          <a
            href="#top"
            aria-label="Return to top of page"
            className="group flex items-center gap-2 font-label text-[9px] tracking-[0.25em]
                       uppercase text-cream/25 hover:text-gold transition-colors duration-300"
          >
            <span className="font-corp-display text-gold/30 group-hover:text-gold transition-colors duration-300 text-base">◈</span>
            Return to top
          </a>
          <p className="font-sans text-xs text-cream/25">
            Opening Q1–Q2 2027
          </p>
        </div>

        {/* ── Legal ──────────────────────────────────────────────────── */}
        <p className="mt-8 text-center font-sans text-[10px] leading-relaxed text-cream/15 max-w-2xl mx-auto">
          Forward-looking financial projections are for informational purposes only and do not
          constitute an offer of securities. Vendor brands, pricing, and layouts are subject to change.
          Opening target Q1–Q2 2027.
        </p>

      </div>
    </footer>
  );
}
