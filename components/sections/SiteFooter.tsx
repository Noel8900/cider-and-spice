// Visual rhyme: border-top uses same ember color at low opacity.
// Opacity hierarchy: brand name 100%, links 60%, legal 30%.
// id="contact" makes the /#contact navbar anchor land here.

import Link from 'next/link';

const footerLinks = [
  { label: 'Apply as Vendor', href: '/vendors'     },
  { label: 'The Cider Bar',   href: '/#cider-bar'  },
  { label: 'Cider Club',      href: '/cider-club'  },
  { label: 'The Hub',         href: '/#opportunity' },
  { label: 'FAQ',             href: '/#faq'        },
];

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      className="bg-[#1C1209] border-t border-[#C4622D]/20 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ── Contact strip ──────────────────────────────────────────── */}
        <div className="text-center">
          <p
            className="font-sans text-xs font-semibold uppercase tracking-widest text-[#F5ECD7] mb-3"
            style={{ opacity: 0.35 }}
          >
            Get in Touch
          </p>
          <a
            href="mailto:info@lccullinaryhub.com"
            className="font-serif text-2xl font-bold text-[#F5ECD7] transition-colors
                       hover:text-[#C4622D]"
            style={{ opacity: 0.90 }}
          >
            info@lccullinaryhub.com
          </a>
          <p
            className="mt-2 font-sans text-sm text-[#F5ECD7]"
            style={{ opacity: 0.45 }}
          >
            We respond to every inquiry within 48 hours.
          </p>
        </div>

        {/* ── Divider ────────────────────────────────────────────────── */}
        <div className="border-t border-[#F5ECD7]/10" />

        {/* ── Bottom row ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Brand — 100% opacity anchor */}
          <div>
            <p className="font-serif text-xl font-bold text-[#F5ECD7]" style={{ opacity: 1 }}>
              Cider &amp; Spice
            </p>
            <p className="font-sans text-xs text-[#F5ECD7] mt-1" style={{ opacity: 0.40 }}>
              Las Cruces Culinary Innovation Hub · Downtown Las Cruces, NM
            </p>
          </div>

          {/* Nav — 60% opacity, supporting */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {footerLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-sans text-sm text-[#F5ECD7] hover:text-[#C4622D]
                           transition-colors duration-200"
                style={{ opacity: 0.60 }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Legal — 30% opacity, muted */}
          <p className="font-sans text-xs text-[#F5ECD7]" style={{ opacity: 0.30 }}>
            © {new Date().getFullYear()} Cider &amp; Spice
          </p>
        </div>

        {/* ── Disclaimer ─────────────────────────────────────────────── */}
        <p
          className="text-center font-sans text-[10px] leading-relaxed text-[#F5ECD7]"
          style={{ opacity: 0.20 }}
        >
          Forward-looking financial projections are for informational purposes only and do not
          constitute an offer of securities. Opening target Q1–Q2 2027.
        </p>

      </div>
    </footer>
  );
}
