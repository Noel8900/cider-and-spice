import Link from 'next/link';

const serviceLinks = [
  { label: 'Capital Advisory',       href: '/services/capital-advisory' },
  { label: 'Strategic Transformation', href: '/services/strategic-transformation' },
  { label: 'Private Equity',         href: '/services/private-equity' },
  { label: 'Risk Management',        href: '/services/risk-management' },
  { label: 'Digital Excellence',     href: '/services/digital-excellence' },
  { label: 'Global Expansion',       href: '/services/global-expansion' },
];

const companyLinks = [
  { label: 'About Nexus',        href: '/about'    },
  { label: 'Leadership',         href: '/about'    },
  { label: 'Perspectives',       href: '/insights' },
  { label: 'Careers',            href: '#'         },
  { label: 'Investor Relations', href: '#'         },
];

const offices = ['New York', 'London', 'Singapore', 'Hong Kong', 'Dubai', 'Frankfurt'];

export default function CorpFooter() {
  return (
    <footer className="bg-corp-ink border-t border-corp-gold/20">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-6">
              <span className="font-corp-display text-2xl md:text-3xl font-medium text-corp-platinum">
                NEXUS
              </span>
              <span className="font-label text-[9px] tracking-[0.35em] uppercase text-corp-steel mt-0.5">
                Capital Group
              </span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-corp-steel max-w-xs">
              Global investment advisory and strategic capital management.
              Trusted by the world&apos;s most consequential institutions since 1994.
            </p>
            <div className="mt-8">
              <p className="font-label text-[10px] tracking-widest uppercase text-corp-steel/60 mb-3">
                Global Offices
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {offices.map(city => (
                  <span key={city} className="font-label text-[10px] tracking-wider uppercase text-corp-steel/50">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-corp-steel hover:text-corp-platinum transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-corp-steel hover:text-corp-platinum transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="font-label text-[10px] tracking-[0.25em] uppercase text-corp-gold mb-6">
              Connect
            </h3>
            <p className="font-sans text-sm text-corp-steel leading-relaxed mb-6">
              Ready to discuss your strategic objectives? Our advisory teams are available across all major time zones.
            </p>
            <a
              href="mailto:advisory@nexuscapitalgroup.com"
              className="font-label text-xs tracking-widest uppercase text-corp-platinum hover:text-corp-gold transition-colors duration-200"
            >
              advisory@nexuscapitalgroup.com
            </a>
            <div className="mt-6">
              <Link
                href="#contact"
                className="inline-block font-label text-xs tracking-[0.2em] uppercase
                           px-6 py-3 border border-corp-gold/50 text-corp-gold
                           hover:bg-corp-gold hover:text-corp-ink
                           transition-all duration-300"
              >
                Schedule a Conversation
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-corp-gold/15 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="font-label text-[10px] tracking-widest uppercase text-corp-steel/40">
              © 2024 Nexus Capital Group LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Privacy Policy', 'Terms of Use', 'Regulatory Disclosures', 'Cookie Policy'].map(item => (
                <Link
                  key={item}
                  href="#"
                  className="font-label text-[10px] tracking-wider uppercase text-corp-steel/40 hover:text-corp-steel transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-4 font-sans text-[11px] text-corp-steel/30 leading-relaxed max-w-4xl">
            Nexus Capital Group LLC is a registered investment adviser. Past performance is not indicative of future results.
            All advisory services are subject to applicable regulatory requirements. This website is for informational
            purposes only and does not constitute investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
