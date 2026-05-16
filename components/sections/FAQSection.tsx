'use client';
// Accordion FAQ — terracotta chevron, GlassCard wrapper.
// CSS max-height transition avoids layout thrash (no JS height measurement).
// Added below VendorCTA in app/page.tsx.

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';

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

// ── Chevron icon — rotates 180° when accordion is open ───────────────────────
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 flex-shrink-0 text-ember transition-transform duration-300 ${
        open ? 'rotate-180' : ''
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ── Single accordion item ─────────────────────────────────────────────────────
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-panel-${index}`;

  return (
    <div className="border-b border-cream/10 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left
                   transition-colors hover:bg-white/[0.03]"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-serif text-base font-semibold text-cream/90">
          {question}
        </span>
        <ChevronIcon open={open} />
      </button>

      {/* CSS max-height accordion — no layout thrash */}
      <div
        id={answerId}
        role="region"
        aria-hidden={!open}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '2000px' : '0px' }}
      >
        <p className="px-6 pb-5 font-sans text-sm leading-relaxed text-cream/60">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-24 px-6 bg-bg"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          id="faq-heading"
          badge="Questions?"
          title="Frequently Asked"
          subtitle="Everything you need to know about the Hub, the Cider Bar, and how to get involved before we open."
        />

        <GlassCard hover={false} className="overflow-hidden">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              index={i}
            />
          ))}
        </GlassCard>

        <p
          className="mt-8 text-center font-sans text-sm text-cream/45"
        >
          Still have questions?{' '}
          <a
            href="mailto:info@lccullinaryhub.com"
            className="underline underline-offset-2 transition-colors hover:text-ember"
          >
            Email us directly.
          </a>
        </p>
      </div>
    </section>
  );
}
