'use client';
// Full-width CTA section with GSAP reveal.

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CorpCTASection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-item', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
      gsap.from('.cta-rule', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        transformOrigin: 'center',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0C1420 0%, #060910 100%)' }}
      aria-label="Begin your partnership"
    >
      {/* Ambient orb */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Gold rule */}
        <div className="cta-rule block h-px w-24 bg-corp-gold mx-auto mb-12" />

        {/* Eyebrow */}
        <div className="cta-item flex items-center justify-center gap-3 mb-8">
          <span className="font-label text-xs tracking-[0.3em] uppercase text-corp-gold">
            Begin Your Partnership
          </span>
        </div>

        {/* Headline */}
        <h2 className="cta-item font-corp-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-corp-platinum leading-tight mb-8">
          The right advisory<br />
          <em className="not-italic text-corp-gold">relationship</em> changes<br />
          everything.
        </h2>

        {/* Sub */}
        <p className="cta-item font-sans text-lg text-corp-steel leading-relaxed mb-12 max-w-xl mx-auto">
          Nexus Capital Group works with a selective roster of institutional partners.
          We invite you to explore whether our approach aligns with your strategic ambitions.
        </p>

        {/* CTAs */}
        <div className="cta-item flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#"
            className="font-label text-xs tracking-[0.25em] uppercase px-10 py-4
                       bg-corp-gold text-corp-ink hover:bg-corp-gold-light
                       transition-all duration-300"
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/services"
            className="font-label text-xs tracking-[0.25em] uppercase px-10 py-4
                       border border-corp-platinum/25 text-corp-platinum
                       hover:border-corp-gold hover:text-corp-gold
                       transition-all duration-300"
          >
            Explore Our Services
          </Link>
        </div>

        {/* Footer detail */}
        <div className="cta-item mt-16 flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          {[
            { label: 'New York',   value: '+1 212 555 0100' },
            { label: 'London',     value: '+44 20 7946 0200' },
            { label: 'Singapore',  value: '+65 6508 0300' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-label text-[9px] tracking-[0.3em] uppercase text-corp-steel/50 mb-1">{label}</p>
              <p className="font-sans text-sm text-corp-steel">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
