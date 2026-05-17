'use client';
// Six-step incubator pathway — luxury editorial style.
// Large step numbers as design elements. No emoji.
// GSAP scroll-triggered stagger reveal.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Apply for a Stall',
    body: 'Submit your concept — cuisine type, booth size, and vision. No prior restaurant experience required. Every application is reviewed personally.',
  },
  {
    number: '02',
    title: 'Access the Kitchen',
    body: 'Use our fully-equipped commercial prep kitchen at a fraction of the cost of building your own — certified, inspected, and ready to go.',
  },
  {
    number: '03',
    title: 'Get Coached',
    body: 'Weekly sessions with WESST New Mexico and SCORE mentors — covering bookkeeping, food safety, marketing, and menu pricing.',
  },
  {
    number: '04',
    title: 'Host Events',
    body: 'Live music nights, cultural markets, and seasonal festivals are built around your food — giving you built-in marketing and foot traffic from day one.',
  },
  {
    number: '05',
    title: 'Grow with the Cider Bar',
    body: 'Cross-promote with our craft cider bar, participate in shared event revenue, and reach a broader audience through Cider Club members.',
  },
  {
    number: '06',
    title: 'Graduate to Your Own Space',
    body: 'Our alumni network, Las Cruces SBDC connections, and banking partnerships help you secure financing when ready for a permanent location.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spine line draws in
      gsap.from('.hiw-spine', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.4,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      });
      // Step cards stagger
      gsap.from('.hiw-step', {
        opacity: 0, x: -24, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="concept" ref={ref} className="py-32 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="How It Works"
          title="Your Path from Pop-Up to Permanent"
          subtitle="Six steps from home-kitchen dream to thriving downtown Las Cruces business."
        />

        <div className="relative">
          {/* Vertical spine — desktop only */}
          <div
            className="hiw-spine hidden lg:block absolute left-[3.25rem] top-4 bottom-4
                        w-px bg-cream/[0.08]"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="hiw-step group relative flex gap-10 lg:gap-16
                           border-b border-cream/[0.06] last:border-0
                           py-10 hover:bg-white/[0.02] transition-colors duration-400 px-4"
              >
                {/* Step number + spine dot */}
                <div className="relative shrink-0 w-10 text-right pt-1">
                  {/* Dot on spine */}
                  <div
                    className="hidden lg:block absolute right-[-1.65rem] top-2.5 w-2.5 h-2.5
                               rounded-full border border-gold/40 bg-bg
                               group-hover:border-gold group-hover:bg-gold/20
                               transition-all duration-300"
                    aria-hidden="true"
                  />
                  <span
                    className="font-corp-display text-3xl font-light text-gold/40
                               group-hover:text-gold transition-colors duration-400"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-corp-display text-2xl font-light text-cream mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-cream/55 max-w-xl">
                    {step.body}
                  </p>
                </div>

                {/* Hover arrow */}
                <div
                  className="hidden lg:flex items-center shrink-0 opacity-0
                             group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span className="font-corp-display text-gold text-xl">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
