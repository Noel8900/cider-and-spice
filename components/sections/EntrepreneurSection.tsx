'use client';
// Direction 3 — Artisan Collective entrepreneur pathways.
// Animation upgrades:
//   • Section header: opacity 0→1 + y 16→0 on scroll (power3.out, 0.8s)
//   • Stat tiles: stagger entrance opacity 0→1 + y 24→0; $0 tile animates
//     with a custom '$0' reveal (counts from $0 with a brief flash delay)
//   • Pillar cards: left-border terracotta accent (same pattern as grant rows)
//     slides in via ::before width 0→3px on hover
//   • All existing counter tweens + callout animation preserved.

import { useEffect, useRef } from 'react';
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

const pillars = [
  {
    numeral: 'I',
    title: 'Low-Risk Model',
    bullets: [
      'Flexible month-to-month licensing — no multi-year leases',
      'Shared overhead: utilities, Wi-Fi, and POS system included',
      '~60% lower startup cost compared to opening a standalone restaurant',
      'License can pause during slow seasons with 30 days\u2019 notice',
    ],
  },
  {
    numeral: 'II',
    title: 'Workforce Pipeline',
    bullets: [
      '34 full-time equivalent jobs created in Year 1',
      'NMSU and DACC culinary certificate pathway integration',
      'Paid apprenticeships and front-of-house training placements',
      'Priority hiring for Las Cruces residents and DACA recipients',
    ],
  },
  {
    numeral: 'III',
    title: 'Mentorship & Resources',
    bullets: [
      'Weekly WESST New Mexico business coaching sessions',
      'SCORE mentor match — covering marketing, finance, and operations',
      'Las Cruces SBDC access for licensing and loan preparation',
      'Elevate Las Cruces entrepreneur network',
    ],
  },
];

const stats = [
  { value: 34,  display: '34',   label: 'FTE Jobs, Year 1'        },
  { value: 12,  display: '12+',  label: 'Vendor Stalls Available'  },
  { value: 60,  display: '~60%', label: 'Cost Savings vs. Solo'    },
  { value: 0,   display: '$0',   label: 'Franchise Fees. Ever.'    },
];

export default function EntrepreneurSection() {
  const ref      = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section header entrance
      gsap.from('.ent-header', {
        opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ent-header', start: 'top 82%', once: true },
      });

      // Stat tiles stagger entrance
      gsap.from('.ent-stat', {
        opacity: 0, y: 24, duration: 0.75, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ent-stats', start: 'top 82%', once: true },
      });

      // Numeric counter tweens (indices 0–2)
      statRefs.current.forEach((el, i) => {
        if (!el || stats[i].value === 0) return;
        const obj    = { val: 0 };
        const target = stats[i].value;
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            if (!el) return;
            const v = Math.round(obj.val);
            el.textContent = i === 1 ? `${v}+` : i === 2 ? `~${v}%` : `${v}`;
          },
        });
      });

      // $0 tile: flash reveal (opacity pulse then settle)
      const zeroEl = statRefs.current[3];
      if (zeroEl) {
        gsap.fromTo(zeroEl,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: zeroEl, start: 'top 85%', once: true },
            onComplete() {
              gsap.to(zeroEl, { opacity: 0.4, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' });
            },
          },
        );
      }

      // Pillar cards stagger
      gsap.from('.ent-pillar', {
        opacity: 0, y: 36, duration: 0.9, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: '.ent-pillars', start: 'top 78%', once: true },
      });

      // Callout
      gsap.from('.ent-callout', {
        opacity: 0, y: 24, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.ent-callout', start: 'top 82%', once: true },
      });

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="incubator" ref={ref} style={{ background: `linear-gradient(to bottom, #1e1710, ${D3.walnut})`, padding: '8rem 1.5rem' }}>
      <style>{`
        .ent-pillar {
          position: relative;
        }
        .ent-pillar::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: ${D3.terracotta};
          transition: width 0.25s ease;
          z-index: 1;
        }
        .ent-pillar:hover::before {
          width: 3px;
        }
      `}</style>

      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>

        {/* Section header */}
        <div className="ent-header" style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>For Food Entrepreneurs</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Every Chef Here Has a Story Worth Tasting
          </h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '560px', lineHeight: 1.75 }}>
            Southern New Mexico's first culinary incubator — lowering barriers so local food entrepreneurs can build real, lasting businesses.
          </p>
        </div>

        {/* Stats row */}
        <div className="ent-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: `rgba(232,193,141,0.07)`, marginBottom: '4rem' }}>
          {stats.map(({ display, label }, i) => (
            <div key={label} className="ent-stat"
              style={{ background: D3.walnut, padding: '2rem 2.5rem', textAlign: 'center', transition: 'background 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
              onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
              <div
                ref={el => { statRefs.current[i] = el; }}
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300, color: i % 2 === 0 ? D3.terracotta : D3.sage, lineHeight: 1, marginBottom: '0.6rem' }}
                aria-live="polite"
              >
                {display}
              </div>
              <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}60` }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Pillar cards */}
        <div className="ent-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: `rgba(232,193,141,0.07)`, marginBottom: '4rem' }}>
          {pillars.map((p) => (
            <div key={p.title} className="ent-pillar"
              style={{ background: D3.walnut, padding: '2.5rem', overflow: 'hidden', transition: 'background 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
              onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
              <span aria-hidden="true" style={{ position: 'absolute', top: '1.25rem', right: '1.75rem', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '5rem', fontWeight: 300, color: `${D3.wheat}06`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{p.numeral}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.5rem', fontWeight: 300, color: D3.terracotta }}>{p.numeral}</span>
                <span style={{ height: '1px', width: '2rem', background: `rgba(232,193,141,0.12)` }} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: D3.parchment, marginBottom: '1.25rem', lineHeight: 1.25 }}>{p.title}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {p.bullets.map((b) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.75rem', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.83rem', lineHeight: 1.75, color: D3.wheat, opacity: 0.55 }}>
                    <span style={{ color: D3.sage, flexShrink: 0, marginTop: '0.35em', fontSize: '0.7rem' }} aria-hidden="true">◈</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Workforce callout */}
        <div className="ent-callout"
          style={{ border: `1px solid rgba(232,193,141,0.1)`, background: 'rgba(92,74,48,0.18)', padding: '3rem 3.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '2rem', transition: 'border-color 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,193,141,0.22)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(232,193,141,0.1)')}>
          <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '2.5rem', color: D3.terracotta, flexShrink: 0, lineHeight: 1 }}>◆</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: D3.sage, marginBottom: '0.5rem' }}>Academic Partnership</p>
            <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.6rem', lineHeight: 1.25 }}>NMSU &amp; DACC Workforce Partnership</h3>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: D3.wheat, opacity: 0.55, maxWidth: '48rem' }}>
              Cider &amp; Spice is partnering with New Mexico State University and Doña Ana Community College to create a formal culinary certificate pipeline.
              Students gain real-world experience inside the Hub; vendors gain trained staff.
              The program is set to launch alongside our Q1&ndash;Q2 2027 opening.
            </p>
          </div>
          <div style={{ flexShrink: 0, alignSelf: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/vendors/onboarding"
              style={{ border: `1px solid rgba(192,98,42,0.5)`, padding: '0.875rem 1.75rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}cc`, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s', textAlign: 'center' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(192,98,42,0.9)`; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(192,98,42,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}cc`; }}>
              View Onboarding Steps →
            </Link>
            <Link href="/incubator"
              style={{ border: `1px solid rgba(247,243,236,0.15)`, padding: '0.875rem 1.75rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}70`, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s', textAlign: 'center' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(192,98,42,0.4)`; (e.currentTarget as HTMLAnchorElement).style.color = D3.wheat; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(247,243,236,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}70`; }}>
              Incubator Program →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
