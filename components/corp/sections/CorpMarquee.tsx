// Pure CSS infinite-scroll trusted-by marquee — no GSAP needed.

const CLIENTS = [
  'BLACKROCK', 'VANGUARD', 'GOLDMAN SACHS', 'JP MORGAN', 'APPLE INC',
  'MICROSOFT', 'SAUDI ARAMCO', 'SHELL PLC', 'BERKSHIRE HATHAWAY',
  'TOYOTA', 'SAMSUNG', 'ALIBABA GROUP', 'SOFTBANK', 'LVMH', 'SOVEREIGN WEALTH',
];

export default function CorpMarquee() {
  return (
    <section
      className="py-10 border-y border-corp-gold/10 bg-corp-ink overflow-hidden"
      aria-label="Trusted by leading institutions"
    >
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #060910, transparent)' }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #060910, transparent)' }}
          aria-hidden="true"
        />

        {/* Scrolling track — two copies for seamless loop */}
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'corp-marquee 40s linear infinite' }}
          aria-hidden="true"
        >
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 mx-8"
            >
              <span className="font-label text-[11px] tracking-[0.3em] uppercase text-corp-steel/50 hover:text-corp-steel/80 transition-colors duration-300 cursor-default">
                {name}
              </span>
              <span className="text-corp-gold/30 text-xs">·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes corp-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
