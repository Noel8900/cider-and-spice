// Star of the show: terracotta radial orb (abstract, connected to brand story)
// Depth: noise texture layer — subtle, never competing
// Visual rhyme: terracotta arrow → repeats on every CTA across the site
// Opacity hierarchy: headline 100%, sub 70%, body 50%

import Link from 'next/link';
import Badge from '@/components/ui/Badge';

// Typed as tuple array so destructuring yields string, not string | undefined
const stats: [string, string][] = [
  ['12+',  'Vendor Spots'],
  ['$2M+', 'Projected Revenue'],
  ['2026', 'Opening'],
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center
                        overflow-hidden px-6 py-24 bg-[#1C1209]">

      {/* ★ Star of the show — abstract ember orb, story-connected to warmth + community */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #C4622D 0%, #2D5016 50%, transparent 75%)',
          opacity: 0.18,
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Depth layer — noise texture, never competes with star */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url(/images/noise.png)', backgroundRepeat: 'repeat' }}
        aria-hidden="true"
      />

      {/* Depth layer 2 — subtle vignette to ground the content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #1C1209 100%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Visual rhyme: ember pill badge — same shape as CTA arrows, feature badges */}
        <Badge variant="ember">Las Cruces&apos; First Culinary Hub</Badge>

        {/* Anchor headline — 100% opacity, Playfair Display, commands full attention */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight
                       text-[#F5ECD7] mt-6 mb-6"
            style={{ opacity: 1 }}>
          Where Bold Flavors<br />
          <em className="not-italic text-[#C4622D]">Find a Home</em>
        </h1>

        {/* Subheadline — 70% opacity, Inter, supporting role */}
        <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed
                      text-[#F5ECD7]"
           style={{ opacity: 0.70 }}>
          Cider &amp; Spice is an incubator food hall in Las Cruces, NM —
          giving local food entrepreneurs the kitchen, the space, and the
          community to grow.
        </p>

        {/* Stat row — 50% opacity, muted, purely supporting */}
        <div className="flex justify-center gap-10 mb-12">
          {stats.map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-serif text-3xl font-bold text-[#C4622D]">{val}</div>
              <div className="font-sans text-xs tracking-widest uppercase text-[#F5ECD7]"
                   style={{ opacity: 0.40 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* CTAs — visual rhyme: terracotta arrow → same arrow used on all cards/links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/vendors"
            className="px-8 py-4 bg-[#C4622D] hover:bg-[#a8521f] text-white
                       font-semibold rounded-xl transition-colors duration-200 text-base"
          >
            Apply as a Vendor →
          </Link>
          <Link
            href="#opportunity"
            className="px-8 py-4 border border-[#F5ECD7]/20 hover:border-[#F5ECD7]/50
                       text-[#F5ECD7] font-semibold rounded-xl transition-all duration-200
                       text-base backdrop-blur-sm"
            style={{ opacity: 0.80 }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
