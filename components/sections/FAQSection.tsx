'use client';
// Luxury FAQ accordion — no GlassCard, flat bordered panel.
// Cormorant Garamond questions. Gold chevron. GSAP entrance.

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'When does the Hub open?',
    answer:
      'We are targeting a Grand Opening in Q1–Q2 2027 in downtown Las Cruces, New Mexico. Pre-register for the Cider Club or sign up for our newsletter to be the first to hear when we announce the exact date.',
  },
  {
    question: 'What cuisines will be available?',
    answer:
      'The Hub will feature 10–13 distinct food concepts: traditional New Mexican, Mexican street food, Southern BBQ, Mediterranean and plant-forward cuisine, Asian fusion and ramen, desserts and baked goods, and 2–3 rotating incubator stalls showcasing emerging local chefs. Every visit offers something new.',
  },
  {
    question: 'What is the Cider Club and how do I join?',
    answer:
      'The Cider Club is our tiered monthly membership — Taster ($25/mo) for tasting flights and discounts, Enthusiast ($45/mo) for reserved seating and producer events, and Founding Member ($85/mo) for unlimited flights, a private-label seasonal bottle, and quarterly pairing dinners. Visit our Cider Club page to sign up before we open.',
  },
  {
    question: 'How do I apply for a vendor or incubator stall?',
    answer:
      'Incubator stalls start at $2,000–$2,500/month and include a private, fully equipped commercial kitchen. Every vendor receives weekly coaching, NMED permitting guidance, POS training, and a clear three-stage pathway from concept to independence. 70% of stalls are reserved for first-time, minority, veteran, or immigrant entrepreneurs. Apply on our Vendors page.',
  },
  {
    question: 'Where exactly will the Hub be located?',
    answer:
      'The Hub will be located in downtown Las Cruces within a zoning area designated as Urban Character under the Realize Las Cruces 2025 Zoning Code — directly within an active MRA zone. The exact address will be announced once the lease is executed.',
  },
  {
    question: 'How can I invest or provide grant funding?',
    answer:
      'The Hub is seeking $1,505,000 in total project capital through an SBA 7(a) loan and non-dilutive grant funding. The project simultaneously qualifies for six distinct grant categories — incubator, workforce, downtown revitalization, agriculture, equity, and tourism. Visit our Investors page to request the full Appendix F Cashflow Model and capital stack detail.',
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 flex-shrink-0 text-gold/60 transition-all duration-300
                  ${open ? 'rotate-180 text-gold' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-panel-${index}`;

  return (
    <div className="faq-item border-b border-cream/[0.07] last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left
                   hover:bg-white/[0.025] transition-colors duration-300 group"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-corp-display text-xl font-light text-cream/85
                         group-hover:text-cream transition-colors duration-300">
          {question}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        id={answerId}
        role="region"
        aria-hidden={!open}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? '500px' : '0px' }}
      >
        <p className="px-8 pb-7 pt-1 font-sans text-sm leading-relaxed text-cream/50 max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        opacity: 0, y: 20, duration: 0.75, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-32 px-6 bg-bg"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          id="faq-heading"
          badge="Questions"
          title="Frequently Asked"
          subtitle="Everything you need to know about the Hub, the Cider Bar, and how to get involved before we open."
        />

        <div className="border border-cream/[0.08] overflow-hidden">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center font-sans text-sm text-cream/40">
          Still have questions?{' '}
          <a
            href="mailto:info@lccullinaryhub.com"
            className="text-cream/60 border-b border-cream/20 pb-px
                       hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            Email us directly.
          </a>
        </p>
      </div>
    </section>
  );
}
