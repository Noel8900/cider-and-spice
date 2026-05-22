'use client';
// Direction 3 — Artisan Collective: FAQ accordion.
// Luxury upgrades:
//   • Answer panel height animates via GSAP (0 → auto) instead of conditional render.
//   • Chevron gains terracotta box-shadow glow when open.
//   • Open row gets a 3px terracotta left-border accent.

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const faqs = [
  {
    question: 'When does the Hub open?',
    answer: 'We\'re targeting a Grand Opening in Q1–Q2 2027 in downtown Las Cruces, New Mexico. Pre-register for the Cider Club or sign up for our newsletter to be the first to know when we announce the exact date.',
  },
  {
    question: 'What cuisines will be available?',
    answer: 'The Hub will feature 10–13 distinct food concepts: traditional New Mexican, Mexican street food, Southern BBQ, Mediterranean and plant-forward cuisine, Asian fusion and ramen, desserts and baked goods, and 2–3 rotating incubator stalls showcasing emerging local chefs. Every visit offers something new.',
  },
  {
    question: 'What is the Cider Club and how do I join?',
    answer: 'The Cider Club is our tiered monthly membership — Taster ($25/mo) for tasting flights and discounts, Enthusiast ($45/mo) for reserved seating and producer events, and Founding Member ($85/mo) for unlimited flights, a private-label seasonal bottle, and quarterly pairing dinners. Visit the Cider Club page to sign up before we open.',
  },
  {
    question: 'How do I apply for a vendor or incubator stall?',
    answer: 'Incubator stalls start at $2,000–$2,500/month and include access to a fully equipped commercial kitchen. Every vendor receives weekly coaching, NMED permitting guidance, POS training, and a clear three-stage pathway from concept to independence. 70% of stalls are reserved for first-time, minority, veteran, or immigrant entrepreneurs. Apply on the Vendors page.',
  },
  {
    question: 'Where exactly will the Hub be located?',
    answer: 'The Hub will be located in downtown Las Cruces within a zoning area designated as Urban Character under the Realize Las Cruces 2025 Zoning Code — directly within an active MRA zone. The exact address will be announced when the lease is finalized.',
  },
  {
    question: 'How can I invest or provide grant funding?',
    answer: 'The Hub is seeking $1,505,000 in total project capital through an SBA 7(a) loan and complementary grant sources including CDBG, NM MainStreet, EDA, and USDA Rural Development. Visit the Investors page for the full capital stack overview, or contact us directly at info@lccullinaryhub.com.',
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body  = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;
    if (isOpen) {
      gsap.fromTo(body,
        { height: 0, opacity: 0 },
        { height: inner.offsetHeight, opacity: 1, duration: 0.45, ease: 'power2.out',
          onComplete: () => { body.style.height = 'auto'; } }
      );
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div style={{
      borderBottom: '1px solid rgba(232,193,141,0.1)',
      borderLeft: isOpen ? `3px solid ${D3.terracotta}` : '3px solid transparent',
      transition: 'background 0.3s, border-left-color 0.3s',
      background: isOpen ? 'rgba(92,74,48,0.18)' : 'transparent',
    }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1.5rem',
          padding: '1.5rem 1rem', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: '1.2rem', fontWeight: 400,
          color: isOpen ? D3.parchment : `${D3.parchment}cc`,
          lineHeight: 1.3, transition: 'color 0.3s',
        }}>{question}</span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0, width: '20px', height: '20px',
            border: `1px solid ${isOpen ? D3.terracotta : 'rgba(232,193,141,0.25)'}`,
            color: isOpen ? D3.terracotta : `${D3.wheat}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.35s ease, border-color 0.35s, color 0.35s, box-shadow 0.35s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            boxShadow: isOpen ? '0 0 8px rgba(192,98,42,0.35)' : 'none',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 3l4 4 4-4" />
          </svg>
        </span>
      </button>

      {/* Always rendered — GSAP controls height */}
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div ref={innerRef} style={{ padding: '0 1rem 1.75rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.875rem', lineHeight: 1.85, color: D3.wheat, opacity: 0.6,
          }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={ref}
      style={{ background: `linear-gradient(to bottom, #1e1710, ${D3.walnut})`, padding: '8rem 1.5rem' }}
    >
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>FAQ</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>Common Questions</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '400px', lineHeight: 1.75 }}>Everything you need to know before opening day.</p>
        </div>

        <div style={{ borderTop: '1px solid rgba(232,193,141,0.1)' }}>
          {faqs.map(({ question, answer }, i) => (
            <div key={question} className="faq-item">
              <AccordionItem
                question={question}
                answer={answer}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
