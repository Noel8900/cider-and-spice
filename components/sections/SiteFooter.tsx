// Visual rhyme: border-top uses same ember color at low opacity.
// Opacity hierarchy: brand name 100%, links 60%, legal 30%.
// id="contact" makes the /#contact navbar anchor land here.

import Link from 'next/link';

const footerLinks = [
  { label: 'Apply as Vendor', href: '/vendors'      },
  { label: 'The Cider Bar',   href: '/#cider-bar'   },
  { label: 'Cider Club',      href: '/cider-club'   },
  { label: 'The Hub',         href: '/#opportunity' },
  { label: 'FAQ',             href: '/#faq'         },
];

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="bg-bg border-t border-ember/20 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ── Contact strip ──────────────────────────────────────────── */}
        <div className="text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/35 mb-3">
            Get in Touch
          </p>
          <a
            href="mailto:info@lccullinaryhub.com"
            className="font-serif text-2xl font-bold text-cream/90 transition-colors
                       hover:text-ember"
          >
            info@lccullinaryhub.com
          </a>
          <p className="mt-2 font-sans text-sm text-cream/45">
            We respond to every inquiry within 48 hours.
          </p>
        </div>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div className="border-t border-cream/10" />

        {/* ── Bottom row ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand — full opacity anchor */}
          <div>
            <p className="font-serif text-xl font-bold text-cream">
              Cider &amp; Spice
            </p>
            <p className="font-sans text-xs text-cream/40 mt-1">
              Las Cruces Culinary Innovation Hub · Downtown Las Cruces, NM
            </p>
          </div>

          {/* Nav — 60% opacity, supporting */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {footerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-sans text-sm text-cream/60 hover:text-ember
                           transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Legal — 30% opacity, muted */}
          <p className="font-sans text-xs text-cream/30">
            © {new Date().getFullYear()} Cider &amp; Spice
          </p>
        </div>

        {/* ── Disclaimer ─────────────────────────────────────────────── */}
        <p className="text-center font-sans text-[10px] leading-relaxed text-cream/20">
          Forward-looking financial projections are for informational purposes only and do not
          constitute an offer of securities. Opening target Q1–Q2 2027.
        </p>

      </div>
    </footer>
  );
}
