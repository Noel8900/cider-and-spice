// §CONCEPT — Six-step incubator pathway
// Shows residents exactly how Cider & Spice turns a food idea into a real business.

import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    number: '01',
    icon: '🏪',
    title: 'Apply for a Stall',
    body: 'Submit your concept — cuisine type, booth size, and vision. No prior restaurant experience required. We review every application personally.',
  },
  {
    number: '02',
    icon: '🍳',
    title: 'Access the Kitchen',
    body: 'Use our fully-equipped commercial prep kitchen at a fraction of the cost of building your own — certified, inspected, and ready to go.',
  },
  {
    number: '03',
    icon: '🤝',
    title: 'Get Coached',
    body: 'Weekly sessions with WESST New Mexico and SCORE mentors — covering bookkeeping, food safety, marketing, and menu pricing.',
  },
  {
    number: '04',
    icon: '🎉',
    title: 'Host & Participate in Events',
    body: 'Live music nights, cultural markets, and seasonal festivals are built around your food — giving you built-in marketing and foot traffic from day one.',
  },
  {
    number: '05',
    icon: '🍺',
    title: 'Grow with the Cider Bar',
    body: 'Cross-promote with our craft cider bar, participate in shared event revenue, and reach a broader audience through Cider Club members.',
  },
  {
    number: '06',
    icon: '🚀',
    title: 'Graduate to Your Own Space',
    body: 'Our alumni network, Las Cruces SBDC connections, and banking partnerships help you secure financing when you\'re ready for a permanent location.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="concept" className="py-24 px-6 bg-[#1C1209]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="How It Works"
          title="Your Path from Pop-Up to Permanent"
          subtitle="Six steps that take a home-kitchen dream to a thriving downtown Las Cruces business."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-[#F5ECD7]/10
                         bg-white/[0.03] p-7 hover:bg-white/[0.06]
                         hover:border-[#C4622D]/30 transition-all duration-300"
            >
              {/* Step number — decorative, fades into background */}
              <span
                className="absolute top-5 right-6 font-serif text-5xl font-bold
                           text-[#F5ECD7] select-none pointer-events-none"
                style={{ opacity: 0.06 }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              <span className="text-3xl mb-4 block">{step.icon}</span>

              <h3
                className="font-serif text-lg font-semibold text-[#F5ECD7] mb-3"
              >
                {step.title}
              </h3>

              <p
                className="font-sans text-sm leading-relaxed text-[#F5ECD7]"
                style={{ opacity: 0.62 }}
              >
                {step.body}
              </p>

              {/* Hover accent line */}
              <div
                className="mt-5 h-0.5 w-0 bg-[#C4622D] rounded-full
                           group-hover:w-10 transition-all duration-300"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
