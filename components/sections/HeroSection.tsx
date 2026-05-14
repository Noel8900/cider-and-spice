// Star of the show: terracotta radial orb (abstract, connected to brand story).
// Depth: noise texture layer — subtle, never competing.
// Visual rhyme: terracotta arrow → repeats on every CTA across the site.
// Opacity hierarchy: headline 100%, sub 70%, stat labels 40%.

import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Typed as tuple array so destructuring yields string, not string | undefined
const stats: [string, string][] = [
  ['12+',  'Vendor Spots'],
  ['$2M+', 'Projected Revenue'],
  ['2027', 'Opening'],
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center
                        overflow-hidden px-6 py-24 bg-bg">

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

        {/* Anchor headline — full opacity, Playfair Display, commands full attention */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight
                       text-cream mt-6 mb-6">
          Where Bold Flavors<br />
          <em className="not-italic text-ember">Find a Home</em>
        </h1>

        {/* Subheadline — 70% opacity, Inter, supporting role */}
        <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed
                      text-cream/70">
          Cider &amp; Spice is an incubator food hall in Las Cruces, NM —
          giving local food entrepreneurs the kitchen, the space, and the
          community to grow.
        </p>

        {/* Stat row — 40% opacity, muted, purely supporting */}
        <div className="flex justify-center gap-10 mb-12">
          {stats.map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-serif text-3xl font-bold text-ember">{val}</div>
              <div className="font-sans text-xs tracking-widest uppercase text-cream/40">{label}</div>
            </div>
          ))}
        </div>

        {/* CTAs — visual rhyme: terracotta arrow → same arrow used on all cards/links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" href="/vendors">
            Apply as a Vendor →
          </Button>
          <Button variant="secondary" size="lg" href="#opportunity">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
