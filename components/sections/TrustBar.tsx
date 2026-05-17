// Refined luxury partner strip.
// Horizontal layout with pipe separators on desktop.
// No rounded pills — clean editorial presentation.

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
      className="border-y border-cream/[0.07] bg-white/[0.015] py-8 px-6"
      aria-label="Community partners and supporters"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-center">

          <p className="font-label text-[9px] tracking-[0.3em] uppercase text-cream/30 md:mr-10 shrink-0">
            Endorsed By
          </p>

          <ul
            className="flex flex-wrap items-center justify-center gap-y-4"
            role="list"
          >
            {partners.map(({ abbr, full }, i) => (
              <li key={abbr} className="flex items-center">
                {i > 0 && (
                  <span className="mx-6 md:mx-8 h-3 w-px bg-cream/20 shrink-0" aria-hidden="true" />
                )}
                <span
                  title={full}
                  aria-label={full}
                  className="font-label text-[11px] tracking-[0.2em] uppercase text-cream/40
                             hover:text-cream/70 transition-colors duration-300 cursor-default"
                >
                  {abbr}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
