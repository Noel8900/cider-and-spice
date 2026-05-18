'use client';
// Direction 3 — Artisan Collective: community impact section.
// Animation upgrades:
//   • Section header: opacity 0→1 + y 20→0 (power3.out, 0.85s) on scroll
//   • Economic stats grid (.impact-stats): stagger entrance opacity 0→1 + y 28→0
//     was missing entirely — now fires when grid enters viewport
//   • All existing partner/event/metric/grant animations preserved.

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
        gsap.to(obj, {
          val: target, duration, ease: 'power2.out',
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
  { value: '50+',    label: 'Permanent Jobs Created',             accent: D3.terracotta },
  { value: '13',     label: 'Local Food Entrepreneurs Supported', accent: D3.sage       },
  { value: '400 hr', label: 'Annual Commissary Kitchen Access',   accent: D3.terracotta },
  { value: '8',      label: 'Community Partners & Endorsers',     accent: D3.sage       },
];

const partners = [
  { name: 'City of Las Cruces',  role: 'East Lohman Development Plan Endorsement'      },
  { name: 'Elevate Las Cruces',  role: '2020 Community Economic Plan Alignment'         },
  { name: 'Visit Las Cruces',    role: 'Tourism Co-Marketing Partnership'                },
  { name: 'NMSU + DACC',        role: 'Workforce & Culinary Certificate Pipeline'        },
  { name: 'WESST New Mexico',   role: 'Entrepreneur Coaching & Business Training'        },
  { name: 'SCORE Southern NM',  role: 'Mentor Network & Financial Coaching'              },
  { name: 'Las Cruces SBDC',    role: 'Small Business Development Resources'             },
  { name: 'West Picacho MRA',   role: 'Stantec Consulting 2026 Redevelopment Plan'       },
];

const events = [
  { glyph: '◈', title: 'Chile Harvest Festival',     cadence: 'Annual · September',      body: "A celebration of New Mexico's iconic Hatch chile season — local vendors, roasting demos, live music, and family programming." },
  { glyph: '◉', title: 'Live Music Fridays',         cadence: 'Weekly · Year-Round',     body: 'Every Friday evening, local Borderland artists take the stage — from flamenco and norteño to indie and jazz.' },
  { glyph: '◆', title: 'International Food Nights',  cadence: 'Monthly · Rotating',      body: 'Deep dives into the cuisines our vendors grew up with — from Oaxacan mole to Korean barbecue and beyond.' },
  { glyph: '◇', title: 'Farmers Market Crossover',   cadence: 'Biweekly · Spring–Fall', body: 'Partnering with local producers to bring fresh regional ingredients directly into the Hub.' },
  { glyph: '✦', title: 'Pop-Up Cooking Classes',     cadence: 'Monthly · All Ages',      body: 'Hands-on cooking workshops led by our vendors — open to the public, affordable, and designed for all skill levels.' },
  { glyph: '◉', title: 'Entrepreneurship Showcases', cadence: 'Quarterly',               body: 'Pitch nights, vendor spotlights, and community investor meetups — showcasing the businesses incubating inside the Hub.' },
];

const grantCategories = [
  { label: 'Community Development Block Grant (CDBG)', status: 'Eligible'               },
  { label: 'NM MainStreet Capital Improvement',        status: 'Eligible'               },
  { label: 'USDA Rural Business Development Grant',    status: 'Exploring'              },
  { label: 'EDA Economic Development Assistance',      status: 'Eligible'               },
  { label: 'SBA 7(a) Loan',                            status: 'Application In Progress' },
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

      // Section header entrance
      gsap.from('.impact-header', {
        opacity: 0, y: 20, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-header', start: 'top 82%', once: true },
      });

      // Economic stats grid entrance (was missing)
      gsap.from('.impact-stat', {
        opacity: 0, y: 28, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-stats', start: 'top 80%', once: true },
      });

      // Existing animations
      gsap.from('.impact-partner', { opacity: 0, y: 20,  duration: 0.75, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.impact-partners', start: 'top 78%', once: true } });
      gsap.from('.impact-event',   { opacity: 0, y: 28,  duration: 0.8,  stagger: 0.1,  ease: 'power3.out', scrollTrigger: { trigger: '.impact-events',   start: 'top 78%', once: true } });
      gsap.from('.impact-metric',  { opacity: 0, y: 24,  duration: 0.8,  stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.impact-metrics',  start: 'top 78%', once: true } });
      gsap.from('.grant-row',      { opacity: 0, x: -16, duration: 0.6,  stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.grant-table',     start: 'top 80%', once: true } });

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} style={{ background: D3.walnut, padding: '8rem 1.5rem' }}>
      <style>{`
        .grant-row {
          position: relative;
          transition: background 0.3s;
        }
        .grant-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 0;
          background: ${D3.terracotta};
          transition: width 0.25s ease;
        }
        .grant-row:hover::before { width: 3px; }
        .grant-row:hover { background: rgba(92,74,48,0.35) !important; }
      `}</style>

      <div style={{ maxWidth: '75rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>

        {/* Section header */}
        <div className="impact-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Community Impact</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: D3.parchment, lineHeight: 1.1, marginBottom: '0.5rem' }}>Rooted in Las Cruces</h2>
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9rem', color: D3.wheat, opacity: 0.55, maxWidth: '520px', lineHeight: 1.75 }}>
            The food here comes from people who have been waiting for a place like this — and so have you.
          </p>
        </div>

        {/* Economic stats */}
        <div>
          <SubHeading label="Economic & Tourism Impact" />
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.55, marginBottom: '2rem', maxWidth: '48rem', lineHeight: 1.8 }}>
            Las Cruces sits at the center of a 215,000-person metro with no food hall competitors within 200 miles.
            Cider &amp; Spice projects 90,000+ annual visitors and a $5.6M tourism multiplier effect by Year 2.
          </p>
          <div className="impact-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
            {animatedStats.map(s => <StatTile key={s.label} {...s} />)}
          </div>
        </div>

        {/* Direct impact metrics */}
        <div>
          <SubHeading label="Direct Community Impact" />
          <div className="impact-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'rgba(232,193,141,0.07)' }}>
            {impactMetrics.map((s) => (
              <div key={s.label} className="impact-metric"
                style={{ background: D3.walnut, padding: '2rem 2.5rem', textAlign: 'center', transition: 'background 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
                onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 3.25rem)', fontWeight: 300, color: s.accent, lineHeight: 1, marginBottom: '0.5rem' }}>{s.value}</div>
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
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.05rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.35rem' }}>{name}</div>
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
                style={{ background: D3.walnut, padding: '2rem', transition: 'background 0.35s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#352b1b')}
                onMouseLeave={e => (e.currentTarget.style.background = D3.walnut)}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', color: D3.terracotta, marginBottom: '0.75rem', lineHeight: 1 }} aria-hidden="true">{glyph}</div>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem', fontWeight: 400, color: D3.parchment, marginBottom: '0.3rem' }}>{title}</div>
                <div style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: D3.terracotta, marginBottom: '0.75rem' }}>{cadence}</div>
                <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.8rem', color: D3.wheat, opacity: 0.45, lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Funding & grants */}
        <div>
          <SubHeading label="Funding & Grant Eligibility" />
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.5, marginBottom: '2rem', maxWidth: '44rem', lineHeight: 1.8 }}>
            Cider &amp; Spice is actively pursuing a diversified capital stack including public grants, SBA-backed lending, and private investment. Below are the primary funding channels under evaluation.
          </p>
          <div className="grant-table" style={{ border: '1px solid rgba(232,193,141,0.1)', overflow: 'hidden' }}>
            {grantCategories.map(({ label, status }, i) => (
              <div key={label} className="grant-row"
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.1rem 1.5rem',
                  borderBottom: i < grantCategories.length - 1 ? '1px solid rgba(232,193,141,0.07)' : 'none',
                  background: D3.walnut,
                }}>
                <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.85rem', color: D3.wheat, opacity: 0.65 }}>{label}</span>
                <span style={{
                  fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                  fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: status === 'Application In Progress' ? D3.terracotta : status === 'Eligible' ? D3.sage : `${D3.wheat}60`,
                  flexShrink: 0, marginLeft: '1rem',
                }}>{status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
