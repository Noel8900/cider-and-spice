// Calm muted social-proof band — Pagedone partner strip style.
// Text-based only — no image files required.

const partners = [
  { abbr: 'City of Las Cruces',  full: 'City of Las Cruces, NM'              },
  { abbr: 'WESST',               full: 'WESST Business Development Services'  },
  { abbr: 'SCORE',               full: 'SCORE Mentors'                        },
  { abbr: 'Sandia Labs',         full: 'Sandia National Laboratories'         },
  { abbr: 'NMSU',                full: 'New Mexico State University'          },
];

export default function TrustBar() {
  return (
    <section
      className="border-y border-cream/10 bg-white/[0.02] py-10 px-6"
      aria-label="Community partners and supporters"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center font-sans text-xs font-semibold
                      uppercase tracking-widest text-cream/30">
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
                className="inline-block rounded-xl border border-cream/[0.12] bg-white/5
                           px-5 py-2.5 font-sans text-sm font-semibold text-cream/55
                           transition-colors hover:border-ember/30 hover:bg-white/[0.08]
                           hover:text-cream/80"
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
