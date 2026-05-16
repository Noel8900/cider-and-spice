// Visual rhyme: ember orb reappears here (smaller) — connects back to hero star
// Depth: glass card wraps CTA — same material as feature cards

import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';

export default function VendorCTA() {
  return (
    <section className="py-24 px-6 bg-bg">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-12 text-center relative overflow-hidden" hover={false}>

          {/* Visual rhyme: smaller ember orb — echoes hero star, different scale */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #C4622D, transparent 70%)', /* ember — keep as CSS; can't express radial-gradient in Tailwind */
              opacity: 0.15,
              filter: 'blur(40px)',
            }}
            aria-hidden="true"
          />

          <span className="font-sans text-xs tracking-widest uppercase text-ember
                           font-semibold mb-4 block">
            Limited Spots Available
          </span>

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Ready to Grow Your<br />Food Business?
          </h2>

          <p className="font-sans text-cream/60 max-w-lg mx-auto mb-8">
            Join a community of passionate food entrepreneurs in the heart
            of Las Cruces. Apply today and lock in your spot.
          </p>

          <Link
            href="/vendors"
            className="inline-block px-10 py-4 bg-ember hover:bg-ember-hover
                       text-white font-semibold rounded-xl transition-colors duration-200"
          >
            Apply as a Vendor →
          </Link>
        </GlassCard>
      </div>
    </section>
  );
}
