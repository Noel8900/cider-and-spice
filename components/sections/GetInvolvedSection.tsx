'use client';
// Get Involved + Newsletter — Direction 3: Artisan Collective
// Luxury upgrades:
//   • Email input: terracotta border + box-shadow glow on focus.
//   • Submit button: pointer-down ripple + hover darken/lift.

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const D3 = {
  walnut:     '#2c2416',
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  sage:       '#6b8c6b',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const paths = [
  { glyph: '◈', title: 'Apply as a Vendor',   body: 'Have a food concept? We\'d love to hear from you. Applications are open for our founding cohort of 10–13 stall vendors launching Q1–Q2 2027.', cta: 'Start Your Application', href: '/vendors',                    external: false, featured: true  },
  { glyph: '◉', title: 'Join the Cider Club',  body: 'Get early access, exclusive event invitations, and member pricing at the craft cider bar. Three tiers available — from Taster to Founding Member.',               cta: 'Explore Membership',      href: '/cider-club',                external: false, featured: false },
  { glyph: '✦', title: 'Invest in the Hub',    body: 'The Hub is seeking $1.5M in total capital — qualifying for six grant categories with a 17–20% illustrative projected IRR and Month 18–20 cash-flow breakeven.',    cta: 'View Investor Overview',  href: '/investors',                 external: false, featured: false },
  { glyph: '◆', title: 'Partner or Sponsor',   body: 'We\'re actively seeking local farmers, artisan producers, cultural organizations, and community sponsors to help build this together.',                       cta: 'Get in Touch',            href: 'mailto:info@lccullinaryhub.com', external: true, featured: false },
];

function triggerRipple(e: React.PointerEvent<HTMLButtonElement>) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x    = e.clientX - rect.left - size / 2;
  const y    = e.clientY - rect.top  - size / 2;
  const ripple = document.createElement('span');
  Object.assign(ripple.style, {
    position: 'absolute', width: size + 'px', height: size + 'px',
    left: x + 'px', top: y + 'px', borderRadius: '50%',
    background: 'rgba(247,243,236,0.15)', transform: 'scale(0)',
    pointerEvents: 'none', animation: 'gi-ripple 0.55s ease-out forwards',
  });
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

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
    <section id="newsletter" ref={ref}
      style={{ background: `linear-gradient(to bottom, #1e1710 0%, ${D3.walnut} 100%)`, padding: '8rem 1.5rem' }}
    >
      <style>{`
        @keyframes gi-ripple { to { transform: scale(1); opacity: 0; } }
        .gi-submit {
          position: relative; overflow: hidden;
          transition: background 0.25s, transform 0.2s, opacity 0.25s;
        }
        .gi-submit:hover:not(:disabled) { background: #a6511f !important; transform: translateY(-1px); }
        .gi-input { transition: border-color 0.2s, box-shadow 0.2s; }
        .gi-input:focus {
          border-color: rgba(192,98,42,0.6) !important;
          box-shadow: 0 0 0 3px rgba(192,98,42,0.15);
          outline: none;
        }
      `}</style>

      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Get Involved</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, marginBottom: '0.5rem', lineHeight: 1.15 }}>Join the Movement</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '520px', lineHeight: 1.75 }}>
            Las Cruces is ready for something like this. Here\'s how to be part of it from the very beginning.
          </p>
        </div>

        <div className="inv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)', marginBottom: '4rem' }}>
          {paths.map(({ glyph, title, body, cta, href, external, featured }) => (
            <div key={title} className="inv-card"
              style={{ display: 'flex', flexDirection: 'column', padding: '2.25rem 2rem', background: featured ? 'rgba(192,98,42,0.10)' : D3.walnut, borderTop: featured ? `2px solid ${D3.terracotta}` : '2px solid transparent', transition: 'background 0.35s, border-color 0.35s' }}
              onMouseEnter={e => { if (!featured) { (e.currentTarget as HTMLDivElement).style.background = '#33291a'; (e.currentTarget as HTMLDivElement).style.borderTopColor = 'rgba(192,98,42,0.4)'; } }}
              onMouseLeave={e => { if (!featured) { (e.currentTarget as HTMLDivElement).style.background = D3.walnut; (e.currentTarget as HTMLDivElement).style.borderTopColor = 'transparent'; } }}
            >
              <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.75rem', color: featured ? D3.terracotta : `${D3.terracotta}60`, display: 'block', marginBottom: '1.25rem', lineHeight: 1 }} aria-hidden="true">{glyph}</span>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.35rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.6rem', lineHeight: 1.25 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.55, marginBottom: '2rem', flex: 1 }}>{body}</p>
              {external ? (
                <a href={href}
                  style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', paddingBottom: '2px', width: 'fit-content', borderBottom: featured ? '1px solid rgba(192,98,42,0.5)' : '1px solid rgba(232,193,141,0.25)', color: featured ? D3.terracotta : `${D3.wheat}80`, transition: 'color 0.25s, border-color 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = D3.terracotta; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = D3.terracotta; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = featured ? D3.terracotta : `${D3.wheat}80`; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = featured ? 'rgba(192,98,42,0.5)' : 'rgba(232,193,141,0.25)'; }}
                >{cta} →</a>
              ) : (
                <Link href={href}
                  style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', paddingBottom: '2px', width: 'fit-content', borderBottom: featured ? '1px solid rgba(192,98,42,0.5)' : '1px solid rgba(232,193,141,0.25)', color: featured ? D3.terracotta : `${D3.wheat}80`, transition: 'color 0.25s, border-color 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = D3.terracotta; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = D3.terracotta; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = featured ? D3.terracotta : `${D3.wheat}80`; (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = featured ? 'rgba(192,98,42,0.5)' : 'rgba(232,193,141,0.25)'; }}
                >{cta} →</Link>
              )}
            </div>
          ))}
        </div>

        <div className="inv-newsletter"
          style={{ border: '1px solid rgba(232,193,141,0.1)', background: 'rgba(92,74,48,0.2)', padding: '3.5rem', maxWidth: '48rem', margin: '0 auto', textAlign: 'center', transition: 'border-color 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,193,141,0.22)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(232,193,141,0.1)')}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, opacity: 0.6 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: D3.terracotta }}>Stay Informed</span>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, opacity: 0.6 }} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 300, color: D3.parchment, marginBottom: '0.75rem' }}>Be First to Know</h3>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: D3.wheat, opacity: 0.5, lineHeight: 1.8, maxWidth: '400px', margin: '0 auto 2.5rem' }}>
            Opening announcements, vendor spotlights, and early-access invitations — straight to your inbox.
          </p>

          {status === 'done' ? (
            <div role="status" style={{ border: '1px solid rgba(192,98,42,0.3)', background: 'rgba(192,98,42,0.07)', padding: '1.25rem 2rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: D3.wheat, opacity: 0.85 }}>
              You\'re on the list — we\'ll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: 0 }}>
              <input
                type="email" required placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
                disabled={status === 'sending'}
                className="gi-input"
                style={{ flex: 1, border: '1px solid rgba(232,193,141,0.15)', background: '#3a2e1e', padding: '14px 18px', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.875rem', color: D3.parchment, outline: 'none' }}
              />
              <button type="submit" disabled={status === 'sending'} className="gi-submit"
                onPointerDown={status !== 'sending' ? triggerRipple : undefined}
                style={{ flexShrink: 0, background: D3.terracotta, color: D3.parchment, padding: '14px 28px', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer', opacity: status === 'sending' ? 0.6 : 1, whiteSpace: 'nowrap' }}
              >{status === 'sending' ? 'Sending…' : 'Notify Me →'}</button>
            </form>
          )}

          {status === 'error' && (
            <p role="alert" style={{ marginTop: '1rem', fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#f87171', opacity: 0.8 }}>
              Something went wrong — please try again or email us at info@lccullinaryhub.com.
            </p>
          )}
          <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.wheat, opacity: 0.25 }}>No spam &middot; Unsubscribe anytime</p>
        </div>
      </div>
    </section>
  );
}
