// §INCUBATOR — Entrepreneur pathways + workforce development
// Speaks to food entrepreneurs AND community members interested in workforce opportunity.

import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';

const pillars = [
  {
    icon: '🛡️',
    title: 'Low-Risk Model',
    bullets: [
      'Flexible month-to-month licensing — no multi-year leases',
      'Shared overhead: utilities, WiFi, POS system included',
      '~60% lower startup cost vs. opening a standalone restaurant',
      'License can pause during slow seasons with 30-day notice',
    ],
  },
  {
    icon: '👩‍🍳',
    title: 'Workforce Pipeline',
    bullets: [
      '34 full-time equivalent jobs created in Year 1',
      'NMSU and DACC culinary certificate pathway integration',
      'Paid apprenticeships and front-of-house training placements',
      'Priority hiring for Las Cruces residents and DACA recipients',
    ],
  },
  {
    icon: '🧠',
    title: 'Mentorship & Resources',
    bullets: [
      'Weekly WESST New Mexico business coaching sessions',
      'SCORE mentor match — marketing, finance, and operations',
      'Las Cruces SBDC access for licensing and loan prep',
      'Elevate Las Cruces entrepreneur network and peer cohort',
    ],
  },
];

const stats = [
  { value: '34',    label: 'FTE Jobs, Year 1'         },
  { value: '12+',   label: 'Vendor Stalls Available'   },
  { value: '~60%',  label: 'Cost Savings vs. Solo'     },
  { value: '$0',    label: 'Franchise Fees Ever'        },
];

export default function EntrepreneurSection() {
  return (
    /* Keep CSS gradient — can't express two-stop bg-bg gradient in Tailwind without arbitrary values */
    <section id="incubator" className="py-24 px-6" style={{ background: 'linear-gradient(to bottom, #1C1209 0%, #12100a 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Entrepreneur Pathways"
          title="Built for Borderland Food Makers"
          subtitle="Southern New Mexico's first culinary incubator — lowering barriers so local food entrepreneurs can build real, lasting businesses."
        />

        {/* Stat row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-ember/20 bg-ember/5 p-6 text-center"
            >
              <div className="font-serif text-4xl font-bold text-ember mb-1">
                {value}
              </div>
              <div className="font-sans text-xs tracking-wider uppercase text-cream/55">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-cream/10 bg-white/[0.03]
                         p-8 hover:border-ember/30 hover:bg-white/[0.05]
                         transition-all duration-300"
            >
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <h3 className="font-serif text-xl font-semibold text-cream mb-4">
                {p.title}
              </h3>
              <ul className="space-y-3">
                {p.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 font-sans text-sm text-cream/65"
                  >
                    <span className="mt-0.5 text-ember shrink-0" aria-hidden="true">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Workforce callout */}
        <div
          className="rounded-2xl border border-grove/40 bg-grove/10 p-8
                     flex flex-col md:flex-row items-center gap-6"
        >
          <div className="text-4xl shrink-0" aria-hidden="true">🎓</div>
          <div className="flex-1">
            <h3 className="font-serif text-xl font-semibold text-cream mb-2">
              NMSU &amp; DACC Workforce Partnership
            </h3>
            <p className="font-sans text-sm leading-relaxed text-cream/65">
              Cider &amp; Spice is partnering with New Mexico State University and Doña Ana Community College
              to create a formal culinary certificate pipeline. Students gain real-world experience inside the
              hub; vendors gain trained staff. The program launches in coordination with our Q1–Q2 2027 opening.
            </p>
          </div>
          <Link
            href="/vendors"
            className="shrink-0 rounded-xl bg-ember px-6 py-3 text-sm font-semibold
                       text-white hover:bg-ember-hover transition-colors whitespace-nowrap"
          >
            Apply as a Vendor →
          </Link>
        </div>
      </div>
    </section>
  );
}
