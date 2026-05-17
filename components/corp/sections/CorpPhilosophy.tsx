'use client';
// Large manifesto quote with GSAP scroll-triggered reveal.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CorpPhilosophy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          once: true,
        },
      });
      gsap.from('.phil-rule', {
        scaleX: 0,
        duration: 1.4,
        ease: 'power3.inOut',
        transformOrigin: 'left',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          once: true,
        },
      });
      gsap.from('.phil-caption', {
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="py-32 px-6 bg-corp-navy border-b border-corp-gold/10"
      aria-label="Our philosophy"
    >
      <div className="max-w-6xl mx-auto">
        {/* Gold rule top */}
        <div className="phil-rule block h-px w-full bg-corp-gold/20 mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Quote */}
          <div className="lg:col-span-9">
            <p className="font-corp-display font-light text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight text-corp-platinum">
              <span className="phil-line block">
                &ldquo;We do not follow capital —
              </span>
              <span className="phil-line block text-corp-gold">
                we shape the conditions
              </span>
              <span className="phil-line block">
                under which it flows.&rdquo;
              </span>
            </p>
          </div>

          {/* Attribution */}
          <div className="phil-caption lg:col-span-3 lg:text-right">
            <span className="block h-px w-8 bg-corp-gold mb-4 lg:ml-auto" />
            <p className="font-label text-xs tracking-[0.2em] uppercase text-corp-gold mb-1">
              Eleanor Ashworth
            </p>
            <p className="font-sans text-sm text-corp-steel">
              Chief Executive Officer
            </p>
            <p className="font-sans text-sm text-corp-steel/50">
              Nexus Capital Group
            </p>
          </div>
        </div>

        {/* Gold rule bottom */}
        <div className="phil-rule block h-px w-full bg-corp-gold/20 mt-16" />
      </div>
    </section>
  );
}
