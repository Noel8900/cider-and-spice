'use client';
// Community impact — luxury editorial redesign with count-up animated stats.

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

// ── Count-up hook (reused pattern from HeroSection) ───────────────────────────────
function useCountUp(
  target: number,
  prefix: string,
  suffix: string,
  decimals = 0,
  duration = 2.0
) {
  const [display, setDisplay] = useState(prefix + '0' + suffix);
  const domRef  = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate() { setDisplay(prefix + obj.val.toFixed(decimals) + suffix); },
            onComplete() { setDisplay(prefix + target.toFixed(decimals) + suffix); },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, decimals, duration]);

  return { domRef, display };
}

// ── Animated stat tile ───────────────────────────────────────────────────────────
function AnimatedStatTile({
  target, prefix = '', suffix = '', label, decimals = 0,
}: {
  target: number; prefix?: string; suffix?: string; label: string; decimals?: number;
}) {
  const { domRef, display } = useCountUp(target, prefix, suffix, decimals);
  return (
    <div
      ref={domRef}
      className="impact-stat bg-bg p-8 text-center hover:bg-white/[0.03] transition-colors duration-400"
    >
      <div
        className="font-corp-display text-4xl md:text-5xl font-light leading-none mb-3"
        style={{ color: '#D4A84B' }}
        aria-live="polite"
      >
        {display}
      </div>
      <div className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40">
        {label}
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────
const animatedStats = [
  { target: 90000, prefix: '',   suffix: '+',   label: 'Projected Annual Visitors',      decimals: 0 },
  { target: 5.6,   prefix: '$',  suffix: 'M',   label: 'Est. Tourism Multiplier Effect', decimals: 1 },
  { target: 25,    prefix: '',   suffix: '%',   label: 'Downtown Foot Traffic Increase', decimals: 0 },
  { target: 200,   prefix: '',   suffix: ' mi', label: 'Nearest Food Hall Competitor',   decimals: 0 },
];

const impactMetrics = [
  { target: 50,  prefix: '',  suffix: '+',  label: 'Permanent Jobs Created',             decimals: 0 },
  { target: 13,  prefix: '',  suffix: '',   label: 'Local Food Entrepreneurs Supported', decimals: 0 },
  { target: 400, prefix: '',  suffix: ' hr', label: 'Annual Commissary Kitchen Access',  decimals: 0 },
  { target: 8,   prefix: '',  suffix: '',   label: 'Community Partners & Endorsers',     decimals: 0 },
];

const partners = [
  { name: 'City of Las Cruces',  role: 'East Lohman Development Plan Endorsement' },
  { name: 'Elevate Las Cruces',  role: '2020 Community Economic Plan Alignment'   },
  { name: 'Visit Las Cruces',    role: 'Tourism Co-Marketing Partnership'          },
  { name: 'NMSU + DACC',        role: 'Workforce & Culinary Certificate Pipeline'  },
  { name: 'WESST New Mexico',   role: 'Entrepreneur Coaching & Business Training'  },
  { name: 'SCORE Southern NM',  role: 'Mentor Network & Financial Coaching'        },
  { name: 'Las Cruces SBDC',    role: 'Small Business Development Resources'       },
  { name: 'W. Picacho MRA',     role: 'Stantec Consulting 2026 Redevelopment Plan' },
];

const events = [
  { glyph: '◈', title: 'Chile Harvest Festival',  cadence: 'Annual · September',       body: "A celebration of New Mexico's iconic Hatch chile season — local vendors, roasting demos, live music, and family programming." },
  { glyph: '◉', title: 'Live Music Fridays',      cadence: 'Weekly · Year-Round',       body: 'Every Friday evening, local Borderland artists take the stage — from flamenco and norteño to indie and jazz.' },
  { glyph: '◆', title: 'International Food Nights', cadence: 'Monthly · Rotating',     body: 'Deep-dives into the cuisines vendors grew up with — from Oaxacan mole to Korean barbecue and beyond.' },
  { glyph: '◇', title: 'Farmers Market Crossover', cadence: 'Bi-Weekly · Spring–Fall', body: 'Partnering with local producers to bring fresh regional ingredients directly into the hub.' },
  { glyph: '✦', title: 'Pop-Up Cooking Classes',  cadence: 'Monthly · All Ages',       body: 'Hands-on cooking workshops led by our vendors — open to the public, affordable, and designed for all skill levels.' },
  { glyph: '◉', title: 'Entrepreneurship Showcases', cadence: 'Quarterly',             body: 'Pitch nights, vendor spotlights, and community investor meetups — showcasing the businesses incubating inside the hub.' },
];

const grantCategories = [
  { label: 'Community Development Block Grant (CDBG)', status: 'Eligible'               },
  { label: 'NM MainStreet Capital Improvement',        status: 'Eligible'               },
  { label: 'USDA Rural Business Development Grant',    status: 'Exploring'              },
  { label: 'EDA Economic Development Assistance',      status: 'Eligible'               },
  { label: 'SBA 7(a) Loan',                            status: 'Application In Progress' },
];

export default function CommunityImpactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.impact-partner', {
        opacity: 0, y: 20, duration: 0.75, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-partners', start: 'top 78%', once: true },
      });
      gsap.from('.impact-event', {
        opacity: 0, y: 28, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-events', start: 'top 78%', once: true },
      });
      gsap.from('.impact-metric', {
        opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-metrics', start: 'top 78%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="impact" ref={ref} className="py-32 px-6 bg-bg">
      <div className="max-w-6xl mx-auto space-y-24">

        <SectionHeader
          badge="Community Impact"
          title="Rooted in Las Cruces"
          subtitle="We're not just building a food hall — we're investing in the people, culture, and economy of the Borderland."
        />

        {/* Economic & Tourism Stats — animated */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="block h-px w-8 bg-gold shrink-0" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
              Economic &amp; Tourism Impact
            </span>
          </div>
          <p className="font-sans text-sm text-cream/55 mb-10 max-w-2xl leading-relaxed">
            Las Cruces sits at the center of a 215,000-person metro with zero food hall competitors within
            200 miles. Cider &amp; Spice projects 90,000+ annual visitors and a $5.6M tourism multiplier
            effect by Year 2.
          </p>
          <div className="impact-stats grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.06]">
            {animatedStats.map((s) => (
              <AnimatedStatTile key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Community Impact Metrics — also animated */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="block h-px w-8 bg-gold shrink-0" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
              Direct Community Impact
            </span>
          </div>
          <div className="impact-metrics grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.06]">
            {impactMetrics.map((s, i) => (
              <div key={s.label} className={`impact-metric bg-bg p-8 text-center hover:bg-white/[0.03]
                                            transition-colors duration-400 group`}>
                <div
                  className="font-corp-display text-4xl md:text-5xl font-light leading-none mb-3"
                  style={{ color: i % 2 === 0 ? '#C97A3E' : '#D4A84B' }}
                >
                  {/* static — could be animated too if desired */}
                  {s.prefix}{s.target}{s.suffix}
                </div>
                <div className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Partners */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="block h-px w-8 bg-gold shrink-0" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
              Community Partners &amp; Endorsements
            </span>
          </div>
          <div className="impact-partners grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/[0.05]">
            {partners.map(({ name, role }) => (
              <div key={name} className="impact-partner bg-bg p-7 hover:bg-white/[0.04] transition-colors duration-400 group">
                <div className="font-corp-display text-base font-light text-cream mb-2 group-hover:text-gold transition-colors duration-300">{name}</div>
                <div className="font-sans text-xs text-cream/40 leading-snug">{role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Events */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="block h-px w-8 bg-gold shrink-0" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
              Community Programming &amp; Cultural Events
            </span>
          </div>
          <div className="impact-events grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/[0.05]">
            {events.map(({ glyph, title, cadence, body }) => (
              <div key={title} className="impact-event group bg-bg p-8 hover:bg-white/[0.04] transition-colors duration-400">
                <span className="font-corp-display text-2xl text-gold/50 group-hover:text-gold transition-colors duration-300 block mb-5">{glyph}</span>
                <div className="font-corp-display text-xl font-light text-cream mb-1 leading-snug">{title}</div>
                <div className="font-label text-[9px] tracking-[0.2em] uppercase text-ember mb-4">{cadence}</div>
                <p className="font-sans text-sm leading-relaxed text-cream/50">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grant Eligibility */}
        <div className="border border-cream/[0.08] p-10 md:p-14 hover:border-cream/[0.14] transition-colors duration-400">
          <div className="flex items-center gap-4 mb-8">
            <span className="block h-px w-8 bg-gold shrink-0" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
              Public Funding &amp; Grant Eligibility
            </span>
          </div>
          <p className="font-sans text-sm text-cream/55 mb-8 max-w-2xl leading-relaxed">
            Cider &amp; Spice is structured to qualify for multiple public and federal funding streams
            that prioritize community economic development, workforce training, and small business incubation.
          </p>
          <ul className="space-y-0 divide-y divide-cream/[0.06]">
            {grantCategories.map(({ label, status }) => (
              <li key={label} className="flex items-center justify-between gap-6 py-4 hover:bg-white/[0.02] px-2 -mx-2 transition-colors duration-200">
                <span className="font-sans text-sm text-cream/70">{label}</span>
                <span className="shrink-0 border border-gold/30 px-4 py-1 font-label text-[9px] tracking-[0.15em] uppercase text-gold">{status}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
