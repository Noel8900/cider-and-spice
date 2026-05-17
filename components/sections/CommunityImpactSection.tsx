'use client';
// Direction 3 — Artisan Collective: community impact section.
// Terracotta/sage stat highlights, D3 count-up, all GSAP preserved.

import { useEffect, useRef, useState } from 'react';
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

function useCountUp(target: number, prefix: string, suffix: string, decimals = 0, duration = 2.0) {
  const [display, setDisplay] = useState(prefix + '0' + suffix);
  const domRef  = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = domRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const obj = { val: 0 };
        gsap.to(obj, { val: target, duration, ease: 'power2.out',
          onUpdate() { setDisplay(prefix + obj.val.toFixed(decimals) + suffix); },
          onComplete() { setDisplay(prefix + target.toFixed(decimals) + suffix); },
        });
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, decimals, duration]);
  return { domRef, display };
}

function StatTile({ target, prefix = '', suffix = '', label, decimals = 0, accent }: {
  target: number; prefix?: string; suffix?: string; label: string; decimals?: number; accent: string;
}) {
  const { domRef, display } = useCountUp(target, prefix, suffix, decimals);
  return (
    <div ref={domRef} className="impact-stat"
      style={{ background: D3.walnut, padding: '2rem 2.5rem', textAlign: 'center', transition: 'background 0.4s' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
      onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
      <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 3.25rem)', fontWeight: 300, color: accent, lineHeight: 1, marginBottom: '0.5rem' }} aria-live="polite">{display}</div>
      <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}60` }}>{label}</div>
    </div>
  );
}

const animatedStats = [
  { target: 90000, prefix: '',  suffix: '+',   label: 'Projected Annual Visitors',      decimals: 0, accent: D3.terracotta },
  { target: 5.6,   prefix: '$', suffix: 'M',   label: 'Est. Tourism Multiplier Effect', decimals: 1, accent: D3.sage       },
  { target: 25,    prefix: '',  suffix: '%',   label: 'Downtown Foot Traffic Increase', decimals: 0, accent: D3.terracotta },
  { target: 200,   prefix: '',  suffix: ' mi', label: 'Nearest Food Hall Competitor',   decimals: 0, accent: D3.sage       },
];

const impactMetrics = [
  { target: 50,  prefix: '', suffix: '+',   label: 'Permanent Jobs Created',             accent: D3.terracotta },
  { target: 13,  prefix: '', suffix: '',    label: 'Local Food Entrepreneurs Supported', accent: D3.sage       },
  { target: 400, prefix: '', suffix: ' hr', label: 'Annual Commissary Kitchen Access',   accent: D3.terracotta },
  { target: 8,   prefix: '', suffix: '',    label: 'Community Partners & Endorsers',     accent: D3.sage       },
];

const partners = [
  { name: 'City of Las Cruces',  role: 'East Lohman Development Plan Endorsement'     },
  { name: 'Elevate Las Cruces',  role: '2020 Community Economic Plan Alignment'        },
  { name: 'Visit Las Cruces',    role: 'Tourism Co-Marketing Partnership'               },
  { name: 'NMSU + DACC',        role: 'Workforce & Culinary Certificate Pipeline'       },
  { name: 'WESST New Mexico',   role: 'Entrepreneur Coaching & Business Training'       },
  { name: 'SCORE Southern NM',  role: 'Mentor Network & Financial Coaching'             },
  { name: 'Las Cruces SBDC',    role: 'Small Business Development Resources'            },
  { name: 'W. Picacho MRA',     role: 'Stantec Consulting 2026 Redevelopment Plan'      },
];

const events = [
  { glyph: '◈', title: 'Chile Harvest Festival',      cadence: 'Annual · September',      body: "A celebration of New Mexico’s iconic Hatch chile season — local vendors, roasting demos, live music, and family programming." },
  { glyph: '◉', title: 'Live Music Fridays',          cadence: 'Weekly · Year-Round',     body: 'Every Friday evening, local Borderland artists take the stage — from flamenco and norteño to indie and jazz.' },
  { glyph: '◆', title: 'International Food Nights',  cadence: 'Monthly · Rotating',     body: 'Deep-dives into the cuisines vendors grew up with — from Oaxacan mole to Korean barbecue and beyond.' },
  { glyph: '◇', title: 'Farmers Market Crossover',   cadence: 'Bi-Weekly · Spring–Fall', body: 'Partnering with local producers to bring fresh regional ingredients directly into the hub.' },
  { glyph: '✦', title: 'Pop-Up Cooking Classes',     cadence: 'Monthly · All Ages',      body: 'Hands-on cooking workshops led by our vendors — open to the public, affordable, and designed for all skill levels.' },
  { glyph: '◉', title: 'Entrepreneurship Showcases', cadence: 'Quarterly',               body: 'Pitch nights, vendor spotlights, and community investor meetups — showcasing the businesses incubating inside the hub.' },
];

const grantCategories = [
  { label: 'Community Development Block Grant (CDBG)', status: 'Eligible'                },
  { label: 'NM MainStreet Capital Improvement',        status: 'Eligible'                },
  { label: 'USDA Rural Business Development Grant',    status: 'Exploring'               },
  { label: 'EDA Economic Development Assistance',      status: 'Eligible'                },
  { label: 'SBA 7(a) Loan',                            status: 'Application In Progress'  },
];

const SubHeading = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
    <span style={{ display: 'block', height: '1px', width: '28px', background: D3.terracotta, flexShrink: 0 }} />
    <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>{label}</span>
  </div>
);

export default function CommunityImpactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.impact-partner', { opacity: 0, y: 20, duration: 0.75, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.impact-partners', start: 'top 78%', once: true } });
      gsap.from('.impact-event',   { opacity: 0, y: 28, duration: 0.8,  stagger: 0.1,  ease: 'power3.out', scrollTrigger: { trigger: '.impact-events',   start: 'top 78%', once: true } });
      gsap.from('.impact-metric',  { opacity: 0, y: 24, duration: 0.8,  stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.impact-metrics',  start: 'top 78%', once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} style={{ background: D3.walnut, padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>

        {/* Section header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Community Impact</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>Rooted in Las Cruces</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '520px', lineHeight: 1.75 }}>We’re not just building a food hall — we’re investing in the people, culture, and economy of the Borderland.</p>
        </div>

        {/* Economic stats */}
        <div>
          <SubHeading label="Economic & Tourism Impact" />
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.55, marginBottom: '2rem', maxWidth: '48rem', lineHeight: 1.8 }}>Las Cruces sits at the center of a 215,000-person metro with zero food hall competitors within 200 miles. Cider &amp; Spice projects 90,000+ annual visitors and a $5.6M tourism multiplier effect by Year 2.</p>
          <div className="impact-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
            {animatedStats.map(s => <StatTile key={s.label} {...s} />)}
          </div>
        </div>

        {/* Direct impact metrics */}
        <div>
          <SubHeading label="Direct Community Impact" />
          <div className="impact-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
            {impactMetrics.map((s, i) => (
              <div key={s.label} className="impact-metric"
                style={{ background: D3.walnut, padding: '2rem 2.5rem', textAlign: 'center', transition: 'background 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
                onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 3.25rem)', fontWeight: 300, color: s.accent, lineHeight: 1, marginBottom: '0.5rem' }}>{s.prefix}{s.target}{s.suffix}</div>
                <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: `${D3.wheat}60` }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <SubHeading label="Community Partners & Endorsements" />
          <div className="impact-partners" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.06)' }}>
            {partners.map(({ name, role }) => (
              <div key={name} className="impact-partner"
                style={{ background: D3.walnut, padding: '1.75rem 2rem', transition: 'background 0.35s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
                onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.05rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.35rem', transition: 'color 0.3s' }}>{name}</div>
                <div style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.75rem', color: D3.wheat, opacity: 0.4, lineHeight: 1.5 }}>{role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural events */}
        <div>
          <SubHeading label="Community Programming & Cultural Events" />
          <div className="impact-events" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.06)' }}>
            {events.map(({ glyph, title, cadence, body }) => (
              <div key={title} className="impact-event"
                style={{ background: D3.walnut, padding: '2rem 2.25rem', transition: 'background 0.35s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
                onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
                <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.5rem', color: `${D3.terracotta}66`, display: 'block', marginBottom: '1rem', transition: 'color 0.3s' }}>{glyph}</span>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.2rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.25rem', lineHeight: 1.25 }}>{title}</div>
                <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: D3.sage, marginBottom: '0.75rem' }}>{cadence}</div>
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.82rem', lineHeight: 1.75, color: D3.wheat, opacity: 0.5 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grant eligibility */}
        <div style={{ border: '1px solid rgba(232,193,141,0.1)', padding: '3rem 3.5rem', transition: 'border-color 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(232,193,141,0.22)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(232,193,141,0.1)')}>
          <SubHeading label="Public Funding & Grant Eligibility" />
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.55, marginBottom: '2rem', maxWidth: '48rem', lineHeight: 1.8 }}>Cider &amp; Spice is structured to qualify for multiple public and federal funding streams that prioritize community economic development, workforce training, and small business incubation.</p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid rgba(232,193,141,0.07)' }}>
            {grantCategories.map(({ label, status }) => (
              <li key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', padding: '1rem 0.5rem', borderBottom: '1px solid rgba(232,193,141,0.07)', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(92,74,48,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.7 }}>{label}</span>
                <span style={{ flexShrink: 0, border: `1px solid rgba(192,98,42,0.35)`, padding: '0.25rem 0.875rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: D3.terracotta }}>{status}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
