// §NEWSLETTER / GET INVOLVED — Multiple resident engagement pathways + email signup
// Four cards covering vendor, cider club, events, and newsletter.

'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';

const paths = [
  {
    icon: '🍽️',
    title: 'Apply as a Vendor',
    body: 'Have a food concept? We want to hear from you. Applications are open for our first cohort of 10–13 stall vendors launching Q1–Q2 2027.',
    cta: 'Start Your Application',
    href: '/vendors',
    external: false,
    accent: true,
  },
  {
    icon: '🍺',
    title: 'Join the Cider Club',
    body: 'Get early access, exclusive event invitations, and member pricing at the craft cider bar. Three tiers available — from Taster to Connoisseur.',
    cta: 'Explore Membership',
    href: '/cider-club',
    external: false,
    accent: false,
  },
  {
    icon: '🎉',
    title: 'Attend a Community Event',
    body: 'From live music Fridays and chile harvest festivals to pop-up cooking classes — there\'s always something happening at Cider & Spice.',
    cta: 'See What\'s Coming',
    href: 'mailto:hello@lccullinaryhub.com',
    external: true,
    accent: false,
  },
  {
    icon: '🤝',
    title: 'Partner with Us',
    body: 'We\'re actively seeking local farmers, artisan producers, cultural organizations, and community sponsors to build this together.',
    cta: 'Get in Touch',
    href: 'mailto:hello@lccullinaryhub.com',
    external: true,
    accent: false,
  },
];

export default function GetInvolvedSection() {
  const [email, setEmail]       = useState('');
  const [status, setStatus]     = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

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
    <section id="newsletter" className="py-24 px-6" style={{ background: 'linear-gradient(to bottom, #12100a 0%, #1C1209 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="Get Involved"
          title="Join the Movement"
          subtitle="Las Cruces is ready for something like this. Here's how to be part of it from the very beginning."
        />

        {/* Engagement path cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {paths.map(({ icon, title, body, cta, href, external, accent }) => (
            <div
              key={title}
              className={`flex flex-col rounded-2xl border p-7 transition-all duration-300
                ${accent
                  ? 'border-[#C4622D]/40 bg-[#C4622D]/8 hover:bg-[#C4622D]/12'
                  : 'border-[#F5ECD7]/10 bg-white/[0.03] hover:border-[#C4622D]/25 hover:bg-white/[0.06]'
                }`}
            >
              <span className="text-3xl mb-4 block">{icon}</span>
              <h3 className="font-serif text-lg font-semibold text-[#F5ECD7] mb-3">
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#F5ECD7] mb-5 flex-1"
                 style={{ opacity: 0.62 }}>
                {body}
              </p>
              {external ? (
                <a
                  href={href}
                  className={`inline-block rounded-xl px-5 py-2.5 text-sm font-semibold
                              text-center transition-colors
                    ${accent
                      ? 'bg-[#C4622D] text-white hover:bg-[#a8521f]'
                      : 'border border-[#F5ECD7]/20 text-[#F5ECD7] hover:border-[#C4622D]/50 hover:text-[#C4622D]'
                    }`}
                >
                  {cta}
                </a>
              ) : (
                <Link
                  href={href}
                  className={`inline-block rounded-xl px-5 py-2.5 text-sm font-semibold
                              text-center transition-colors
                    ${accent
                      ? 'bg-[#C4622D] text-white hover:bg-[#a8521f]'
                      : 'border border-[#F5ECD7]/20 text-[#F5ECD7] hover:border-[#C4622D]/50 hover:text-[#C4622D]'
                    }`}
                >
                  {cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div
          className="rounded-2xl border border-[#F5ECD7]/10 bg-white/[0.03]
                     p-8 md:p-12 text-center max-w-2xl mx-auto"
        >
          <div className="text-4xl mb-4" aria-hidden="true">📬</div>
          <h3 className="font-serif text-2xl font-semibold text-[#F5ECD7] mb-3">
            Stay in the Loop
          </h3>
          <p className="font-sans text-sm text-[#F5ECD7] mb-8 leading-relaxed"
             style={{ opacity: 0.62 }}>
            Get construction updates, event announcements, vendor spotlights, and early access
            to our opening — straight to your inbox.
          </p>

          {status === 'done' ? (
            <div
              role="status"
              className="rounded-xl bg-[#2D5016]/20 border border-[#2D5016]/30
                         px-6 py-4 font-sans text-sm text-[#F5ECD7]"
            >
              ✅ You&apos;re on the list — thank you for your support!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
                className="flex-1 rounded-xl border border-[#F5ECD7]/20 bg-white/5
                           px-4 py-3 font-sans text-sm text-[#F5ECD7]
                           placeholder-[#F5ECD7]/30 focus:border-[#C4622D]/60
                           focus:outline-none focus:ring-2 focus:ring-[#C4622D]/20
                           disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-xl bg-[#C4622D] px-6 py-3 font-sans text-sm
                           font-semibold text-white hover:bg-[#a8521f]
                           disabled:opacity-60 transition-colors whitespace-nowrap"
              >
                {status === 'sending' ? 'Sending…' : 'Notify Me →'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p role="alert" className="mt-3 font-sans text-xs text-red-400">
              Something went wrong — please try emailing us at hello@lccullinaryhub.com
            </p>
          )}

          <p className="mt-4 font-sans text-xs text-[#F5ECD7]" style={{ opacity: 0.35 }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
