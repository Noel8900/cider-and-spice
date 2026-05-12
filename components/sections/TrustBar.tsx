// Calm muted social-proof band — Pagedone partner strip style.
// Text-based only — no image files required.

const partners = [
  { abbr: 'City of Las Cruces',  full: 'City of Las Cruces, NM'              },
  { abbr: 'WESST',               full: 'WESST Business Development Services'  },
  { abbr: 'SCORE',               full: 'SCORE Mentors'                         },
  { abbr: 'Sandia Labs',         full: 'Sandia National Laboratories'          },
  { abbr: 'NMSU',                full: 'New Mexico State University'           },
];

export default function TrustBar() {
  return (
    <section
      className="border-y border-[#F5ECD7]/10 bg-white/[0.02] py-10 px-6"
      aria-label="Community partners and supporters"
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-8 text-center font-sans text-xs font-semibold
                     uppercase tracking-widest text-[#F5ECD7]"
          style={{ opacity: 0.30 }}
        >
          Community Partners &amp; Supporters
        </p>

        <ul
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          role="list"
        >
          {partners.map(({ abbr, full }) => (
            <li key={abbr}>
              <span
                title={full}
                aria-label={full}
                className="inline-block rounded-xl border border-[#F5ECD7]/12 bg-white/5
                           px-5 py-2.5 font-sans text-sm font-semibold text-[#F5ECD7]
                           transition-colors hover:border-[#C4622D]/30 hover:bg-white/8"
                style={{ opacity: 0.55 }}
              >
                {abbr}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
