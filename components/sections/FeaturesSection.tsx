// Visual rhyme: terracotta arrow → same as hero CTA, same as card hover
// Glass cards: depth without competing with hero orb
// Opacity hierarchy on card text: title 100%, body 60%

import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';

const features = [
  {
    icon: '🍽️',
    title: 'Vendor Opportunities',
    body: 'Affordable booths and shared kitchen space designed for food entrepreneurs ready to scale without risk.',
  },
  {
    icon: '🌿',
    title: 'Community Dining',
    body: 'A gathering place where Las Cruces comes together over authentic, locally-made food from our own backyard.',
  },
  {
    icon: '🍎',
    title: 'The Cider Bar',
    body: 'A curated craft cider and beverage experience anchoring the heart of the hub with a social, approachable vibe.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="opportunity" className="py-24 px-6 bg-[#1C1209]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="The Opportunity"
          title="Built for Food Makers"
          subtitle="Designed for makers, growers, and culinary innovators in the Borderland."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <GlassCard key={f.title} className="p-8 group">
              <span className="text-4xl mb-5 block">{f.icon}</span>

              {/* Title — 100% opacity, anchor font, primary attention */}
              <h3 className="font-serif text-xl font-semibold text-[#F5ECD7] mb-3"
                  style={{ opacity: 1 }}>
                {f.title}
              </h3>

              {/* Body — 60% opacity, support font, secondary */}
              <p className="font-sans text-sm leading-relaxed text-[#F5ECD7] mb-5"
                 style={{ opacity: 0.60 }}>
                {f.body}
              </p>

              {/* Visual rhyme: same terracotta arrow as hero CTA */}
              <span
                className="text-[#C4622D] text-sm font-semibold
                           group-hover:translate-x-1 transition-transform duration-200 inline-block"
              >
                Learn more →
              </span>
            </GlassCard>
          ))}
        </div>

        {/* Floor Plan featured card — full-width, elevated prominence */}
        <Link href="/floor-plan/" className="group block mt-6">
          <GlassCard className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6
                                border-[#C4622D]/30 hover:border-[#C4622D]/70
                                transition-colors duration-300">
            <span className="text-5xl shrink-0" aria-hidden="true">🗺</span>

            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold text-[#F5ECD7] mb-2">
                The Layout
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#F5ECD7]/60">
                22,400 sq ft across two levels — explore every vendor stall, dining zone,
                private event room, and BOH space interactively. Filter by seating, vendor,
                event, or operations view.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 rounded-full bg-[#C4622D]/15
                            border border-[#C4622D]/40 px-6 py-3 font-sans text-sm
                            font-semibold text-[#C4622D] group-hover:bg-[#C4622D]/25
                            group-hover:border-[#C4622D]/70 transition-all duration-200
                            group-hover:gap-3 whitespace-nowrap">
              View Interactive Floor Plan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </GlassCard>
        </Link>
      </div>
    </section>
  );
}
