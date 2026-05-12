// Visual rhyme: border-top uses same ember color at low opacity
// Opacity hierarchy: brand name 100%, links 60%, legal 30%

import Link from 'next/link';

const navLinks = [
  { label: 'Vendor Apply', href: '/vendors' },
  { label: 'The Cider Bar', href: '#cider-bar' },
  { label: 'Investors',     href: '#investors' },
  { label: 'Contact',       href: '#contact' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#1C1209] border-t border-[#C4622D]/20 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between
                      items-center gap-6">

        {/* Brand — 100% opacity anchor */}
        <div>
          <p className="font-serif text-xl font-bold text-[#F5ECD7]" style={{ opacity: 1 }}>
            Cider &amp; Spice
          </p>
          <p className="font-sans text-xs text-[#F5ECD7] mt-1" style={{ opacity: 0.40 }}>
            Las Cruces, New Mexico
          </p>
        </div>

        {/* Nav — 60% opacity, supporting */}
        <nav className="flex flex-wrap gap-6 justify-center">
          {navLinks.map(({ label, href }) => (
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
          © {new Date().getFullYear()} Cider &amp; Spice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
