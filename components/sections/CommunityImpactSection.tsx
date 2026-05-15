// §IMPACT — Local partnerships, cultural events, tourism, grant categories
// Speaks to residents, city stakeholders, and media.

import SectionHeader from '@/components/ui/SectionHeader';

const partners = [
  { name: 'City of Las Cruces',       role: 'East Lohman Development Plan Endorsement' },
  { name: 'Elevate Las Cruces',        role: '2020 Community Economic Plan Alignment'   },
  { name: 'Visit Las Cruces',          role: 'Tourism Co-Marketing Partnership'          },
  { name: 'NMSU + DACC',              role: 'Workforce & Culinary Certificate Pipeline'  },
  { name: 'WESST New Mexico',          role: 'Entrepreneur Coaching & Business Training'  },
  { name: 'SCORE Southern NM',         role: 'Mentor Network & Financial Coaching'        },
  { name: 'Las Cruces SBDC',           role: 'Small Business Development Resources'       },
  { name: 'W. Picacho MRA',            role: 'Stantec Consulting 2026 Redevelopment Plan' },
];

const events = [
  {
    icon: '🌶️',
    title: 'Chile Harvest Festival',
    cadence: 'Annual · September',
    body: 'A celebration of New Mexico\'s iconic Hatch chile season — local vendors, roasting demos, live music, and family programming.',
  },
  {
    icon: '🎵',
    title: 'Live Music Fridays',
    cadence: 'Weekly · Year-Round',
    body: 'Every Friday evening, local Borderland artists take the stage — from flamenco and norteño to indie and jazz.',
  },
  {
    icon: '🌍',
    title: 'International Food Nights',
    cadence: 'Monthly · Rotating',
    body: 'Deep-dives into the cuisines vendors grew up with — from Oaxacan mole to Korean barbecue and beyond.',
  },
  {
    icon: '🌱',
    title: 'Farmers Market Crossover',
    cadence: 'Bi-Weekly · Spring–Fall',
    body: 'Partnering with local producers to bring fresh regional ingredients directly into the hub — supporting growers and chefs together.',
  },
  {
    icon: '🎓',
    title: 'Pop-Up Cooking Classes',
    cadence: 'Monthly · All Ages',
    body: 'Hands-on cooking workshops led by our vendors — open to the public, affordable, and designed for all skill levels.',
  },
  {
    icon: '🤝',
    title: 'Entrepreneurship Showcases',
    cadence: 'Quarterly',
    body: 'Pitch nights, vendor spotlights, and community investor meetups — showcasing the businesses incubating inside the hub.',
  },
];

const tourismStats = [
  { value: '45,000+',  label: 'Projected Annual Visitors'       },
  { value: '$2.8M',    label: 'Est. Tourism Multiplier Effect'  },
  { value: '15%',      label: 'Downtown Foot Traffic Increase'  },
  { value: '200 mi',   label: 'Nearest Food Hall Competitor'    },
];

const grantCategories = [
  { label: 'Community Development Block Grant (CDBG)', status: 'Eligible' },
  { label: 'NM MainStreet Capital Improvement',        status: 'Eligible' },
  { label: 'USDA Rural Business Development Grant',    status: 'Exploring' },
  { label: 'EDA Economic Development Assistance',      status: 'Eligible' },
  { label: 'SBA 7(a) Loan Pre-Qualification',          status: '$850K Pre-Qualified' },
];

export default function CommunityImpactSection() {
  return (
    <section id="impact" className="py-24 px-6 bg-[#1C1209]">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* ── Header ── */}
        <SectionHeader
          badge="Community Impact"
          title="Rooted in Las Cruces"
          subtitle="We're not just building a food hall — we're investing in the people, culture, and economy of the Borderland."
        />

        {/* ── Tourism & Economic Impact ── */}
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#F5ECD7] mb-2 text-center">
            Economic &amp; Tourism Impact
          </h3>
          <p className="font-sans text-sm text-[#F5ECD7] text-center mb-8 max-w-2xl mx-auto"
             style={{ opacity: 0.60 }}>
            Las Cruces sits at the center of a 215,000-person metro with zero food hall competitors within
            200 miles. Cider &amp; Spice is positioned to become a regional dining destination.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tourismStats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#F5ECD7]/10 bg-white/[0.03]
                           p-6 text-center hover:border-[#C4622D]/25 transition-colors"
              >
                <div className="font-serif text-3xl font-bold text-[#C4622D] mb-1">{value}</div>
                <div className="font-sans text-xs tracking-wide uppercase text-[#F5ECD7]"
                     style={{ opacity: 0.50 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Local Partners ── */}
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#F5ECD7] mb-2 text-center">
            Community Partners &amp; Endorsements
          </h3>
          <p className="font-sans text-sm text-[#F5ECD7] text-center mb-8 max-w-xl mx-auto"
             style={{ opacity: 0.60 }}>
            Cider &amp; Spice is endorsed by and actively collaborating with the following Las Cruces
            institutions and organizations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partners.map(({ name, role }) => (
              <div
                key={name}
                className="rounded-xl border border-[#F5ECD7]/10 bg-white/[0.03]
                           p-5 hover:border-[#C4622D]/25 hover:bg-white/[0.05]
                           transition-all duration-200"
              >
                <div className="font-serif text-sm font-semibold text-[#F5ECD7] mb-1.5">
                  {name}
                </div>
                <div className="font-sans text-xs text-[#F5ECD7] leading-snug"
                     style={{ opacity: 0.50 }}>
                  {role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cultural Events ── */}
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#F5ECD7] mb-2 text-center">
            Community Programming &amp; Cultural Events
          </h3>
          <p className="font-sans text-sm text-[#F5ECD7] text-center mb-8 max-w-xl mx-auto"
             style={{ opacity: 0.60 }}>
            Cider &amp; Spice is designed to be a living community space — not just a place to eat,
            but a destination for culture, learning, and connection.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map(({ icon, title, cadence, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#F5ECD7]/10 bg-white/[0.03]
                           p-6 hover:border-[#C4622D]/25 hover:bg-white/[0.05]
                           transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <div className="font-serif text-base font-semibold text-[#F5ECD7]">
                      {title}
                    </div>
                    <div className="font-sans text-[11px] tracking-wide uppercase text-[#C4622D]"
                         style={{ opacity: 0.85 }}>
                      {cadence}
                    </div>
                  </div>
                </div>
                <p className="font-sans text-sm leading-relaxed text-[#F5ECD7]"
                   style={{ opacity: 0.58 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Grant & Funding Categories ── */}
        <div className="rounded-2xl border border-[#F5ECD7]/10 bg-white/[0.03] p-8">
          <h3 className="font-serif text-2xl font-semibold text-[#F5ECD7] mb-2">
            Public Funding &amp; Grant Eligibility
          </h3>
          <p className="font-sans text-sm text-[#F5ECD7] mb-6" style={{ opacity: 0.60 }}>
            Cider &amp; Spice is structured to qualify for multiple public and federal funding streams
            that prioritize community economic development, workforce training, and small business incubation.
          </p>
          <ul className="space-y-3">
            {grantCategories.map(({ label, status }) => (
              <li
                key={label}
                className="flex items-center justify-between gap-4 py-3
                           border-b border-[#F5ECD7]/[0.07] last:border-0"
              >
                <span className="font-sans text-sm text-[#F5ECD7]" style={{ opacity: 0.75 }}>
                  {label}
                </span>
                <span
                  className="shrink-0 rounded-full border border-[#C4622D]/40
                             bg-[#C4622D]/10 px-3 py-1 font-sans text-xs
                             font-semibold text-[#C4622D]"
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
