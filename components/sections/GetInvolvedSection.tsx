'use client';
// Get involved + newsletter — luxury editorial redesign.
// No emoji. Gold glyphs. Refined engagement cards.
// GSAP entrance animations.

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const paths = [
  {
    glyph: '◈',
    title: 'Apply as a Vendor',
    body: 'Have a food concept? We want to hear from you. Applications are open for our founding cohort of 10–13 stall vendors launching Q1–Q2 2027.',
    cta: 'Start Your Application',
    href: '/vendors',
    external: false,
    featured: true,
  },
  {
    glyph: '◉',
    title: 'Join the Cider Club',
    body: 'Get early access, exclusive event invitations, and member pricing at the craft cider bar. Three tiers available — from Taster to Connoisseur.',
    cta: 'Explore Membership',
    href: '/cider-club',
    external: false,
    featured: false,
  },
  {
    glyph: '✦',
    title: 'Invest in the Hub',
    body: 'The Hub is seeking $1.5M in total capital. Qualifying for six grant categories with a 17–20% illustrative IRR and Month 18–20 cash-flow breakeven.',
    cta: 'View Investor Overview',
    href: '/investors',
    external: false,
    featured: false,
  },
  {
    glyph: '◆',
    title: 'Partner with Us',
    body: "We're actively seeking local farmers, artisan producers, cultural organizations, and community sponsors to build this together.",
    cta: 'Get in Touch',
    href: 'mailto:info@lccullinaryhub.com',
    external: true,
    featured: false,
  },
];

export default function GetInvolvedSection() {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inv-card', {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.inv-grid', start: 'top 78%', once: true },
      });
      gsap.from('.inv-newsletter', {
        opacity: 0, y: 28, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.inv-newsletter', start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xlgzzezb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter Signup — Cider & Spice' }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="newsletter"
      ref={ref}
      className="py-32 px-6"
      style={{ background: 'linear-gradient(to bottom, #12100a 0%, #1C1209 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Get Involved"
          title="Join the Movement"
          subtitle="Las Cruces is ready for something like this. Here's how to be part of it from the very beginning."
        />

        {/* Engagement cards */}
        <div className="inv-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/[0.06] mb-16">
          {paths.map(({ glyph, title, body, cta, href, external, featured }) => (
            <div
              key={title}
              className={`inv-card group flex flex-col p-8 transition-colors duration-400
                ${featured
                  ? 'bg-ember/[0.07] hover:bg-ember/[0.12] border-b-0'
                  : 'bg-bg hover:bg-white/[0.04]'
                }`}
            >
              <span
                className={`font-corp-display text-2xl mb-6 block transition-colors duration-300
                  ${featured ? 'text-ember' : 'text-gold/50 group-hover:text-gold'}`}
              >
                {glyph}
              </span>

              <h3 className="font-corp-display text-xl font-light text-cream mb-3 leading-snug">
                {title}
              </h3>

              <p className="font-sans text-sm leading-relaxed text-cream/50 mb-8 flex-1">
                {body}
              </p>

              {external ? (
                <a
                  href={href}
                  className={`font-label text-[10px] tracking-[0.2em] uppercase pb-0.5 w-fit
                              border-b transition-all duration-300
                    ${featured
                      ? 'border-ember/50 text-ember hover:border-ember'
                      : 'border-cream/20 text-cream/50 hover:border-gold/50 hover:text-gold'
                    }`}
                >
                  {cta} →
                </a>
              ) : (
                <Link
                  href={href}
                  className={`font-label text-[10px] tracking-[0.2em] uppercase pb-0.5 w-fit
                              border-b transition-all duration-300
                    ${featured
                      ? 'border-ember/50 text-ember hover:border-ember'
                      : 'border-cream/20 text-cream/50 hover:border-gold/50 hover:text-gold'
                    }`}
                >
                  {cta} →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="inv-newsletter border border-cream/[0.08] bg-white/[0.02] p-10 md:p-14
                        max-w-3xl mx-auto text-center hover:border-cream/[0.14]
                        transition-colors duration-400">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-8 bg-gold" />
            <span className="font-label text-[9px] tracking-[0.3em] uppercase text-gold">
              Stay Informed
            </span>
            <span className="block h-px w-8 bg-gold" />
          </div>

          <h3 className="font-corp-display text-3xl md:text-4xl font-light text-cream mb-4">
            Stay in the Loop
          </h3>
          <p className="font-sans text-sm text-cream/50 mb-10 leading-relaxed max-w-md mx-auto">
            Construction updates, event announcements, vendor spotlights, and early-access
            invitations — delivered to your inbox.
          </p>

          {status === 'done' ? (
            <div
              role="status"
              className="border border-gold/25 bg-gold/5 px-8 py-5
                         font-sans text-sm text-cream/80"
            >
              You&apos;re on the list — thank you for your support.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
                className="flex-1 border border-cream/15 bg-white/[0.03] px-5 py-4
                           font-sans text-sm text-cream placeholder-cream/25
                           focus:border-gold/40 focus:outline-none focus:ring-1
                           focus:ring-gold/15 disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="shrink-0 bg-ember hover:bg-ember-hover px-8 py-4 font-label
                           text-[10px] tracking-[0.25em] uppercase text-white
                           disabled:opacity-60 transition-colors whitespace-nowrap
                           focus-visible:ring-2 focus-visible:ring-ember/50"
              >
                {status === 'sending' ? 'Sending…' : 'Notify Me →'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p role="alert" className="mt-4 font-sans text-xs text-red-400/80">
              Something went wrong — please email us at info@lccullinaryhub.com
            </p>
          )}

          <p className="mt-6 font-label text-[9px] tracking-[0.2em] uppercase text-cream/25">
            No spam · Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
}
