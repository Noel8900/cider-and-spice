'use client';
// Community impact — luxury editorial redesign.
// No emoji. GSAP scroll reveals. Gold glyphs.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'City of Las Cruces',       role: 'East Lohman Development Plan Endorsement'          },
  { name: 'Elevate Las Cruces',        role: '2020 Community Economic Plan Alignment'            },
  { name: 'Visit Las Cruces',          role: 'Tourism Co-Marketing Partnership'                  },
  { name: 'NMSU + DACC',              role: 'Workforce & Culinary Certificate Pipeline'          },
  { name: 'WESST New Mexico',          role: 'Entrepreneur Coaching & Business Training'         },
  { name: 'SCORE Southern NM',         role: 'Mentor Network & Financial Coaching'               },
  { name: 'Las Cruces SBDC',           role: 'Small Business Development Resources'              },
  { name: 'W. Picacho MRA',            role: 'Stantec Consulting 2026 Redevelopment Plan'        },
];

const events = [
  {
    glyph: '◈',
    title: 'Chile Harvest Festival',
    cadence: 'Annual · September',
    body: "A celebration of New Mexico's iconic Hatch chile season — local vendors, roasting demos, live music, and family programming.",
  },
  {
    glyph: '◉',
    title: 'Live Music Fridays',
    cadence: 'Weekly · Year-Round',
    body: 'Every Friday evening, local Borderland artists take the stage — from flamenco and norteño to indie and jazz.',
  },
  {
    glyph: '◆',
    title: 'International Food Nights',
    cadence: 'Monthly · Rotating',
    body: 'Deep-dives into the cuisines vendors grew up with — from Oaxacan mole to Korean barbecue and beyond.',
  },
  {
    glyph: '◇',
    title: 'Farmers Market Crossover',
    cadence: 'Bi-Weekly · Spring–Fall',
    body: 'Partnering with local producers to bring fresh regional ingredients directly into the hub — supporting growers and chefs together.',
  },
  {
    glyph: '✦',
    title: 'Pop-Up Cooking Classes',
    cadence: 'Monthly · All Ages',
    body: 'Hands-on cooking workshops led by our vendors — open to the public, affordable, and designed for all skill levels.',
  },
  {
    glyph: '◉',
    title: 'Entrepreneurship Showcases',
    cadence: 'Quarterly',
    body: 'Pitch nights, vendor spotlights, and community investor meetups — showcasing the businesses incubating inside the hub.',
  },
];

const tourismStats = [
  { value: '90,000+',  label: 'Projected Annual Visitors'       },
  { value: '$5.6M',    label: 'Est. Tourism Multiplier Effect'  },
  { value: '25%',      label: 'Downtown Foot Traffic Increase'  },
  { value: '200 mi',   label: 'Nearest Food Hall Competitor'    },
];

const grantCategories = [
  { label: 'Community Development Block Grant (CDBG)', status: 'Eligible'                  },
  { label: 'NM MainStreet Capital Improvement',        status: 'Eligible'                  },
  { label: 'USDA Rural Business Development Grant',    status: 'Exploring'                 },
  { label: 'EDA Economic Development Assistance',      status: 'Eligible'                  },
  { label: 'SBA 7(a) Loan',                            status: 'Application In Progress'   },
];

export default function CommunityImpactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.impact-stat', {
        opacity: 0, y: 28, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-stats', start: 'top 78%', once: true },
      });
      gsap.from('.impact-partner', {
        opacity: 0, y: 20, duration: 0.75, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-partners', start: 'top 78%', once: true },
      });
      gsap.from('.impact-event', {
        opacity: 0, y: 28, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-events', start: 'top 78%', once: true },
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

        {/* Economic & Tourism Stats */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="block h-px w-8 bg-gold shrink-0" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-gold">
              Economic & Tourism Impact
            </span>
          </div>
          <p className="font-sans text-sm text-cream/55 mb-10 max-w-2xl leading-relaxed">
            Las Cruces sits at the center of a 215,000-person metro with zero food hall competitors within
            200 miles. Cider &amp; Spice projects 90,000+ annual visitors and a $5.6M tourism multiplier
            effect by Year 2.
          </p>
          <div className="impact-stats grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.06]">
            {tourismStats.map(({ value, label }) => (
              <div
                key={label}
                className="impact-stat bg-bg p-8 text-center hover:bg-white/[0.03]
                           transition-colors duration-400"
              >
                <div className="font-corp-display text-4xl md:text-5xl font-light text-gold mb-3 leading-none">
                  {value}
                </div>
                <div className="font-label text-[9px] tracking-[0.25em] uppercase text-cream/40">
                  {label}
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
              <div
                key={name}
                className="impact-partner bg-bg p-7 hover:bg-white/[0.04]
                           transition-colors duration-400 group"
              >
                <div className="font-corp-display text-base font-light text-cream mb-2
                                group-hover:text-gold transition-colors duration-300">
                  {name}
                </div>
                <div className="font-sans text-xs text-cream/40 leading-snug">
                  {role}
                </div>
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
              <div
                key={title}
                className="impact-event group bg-bg p-8 hover:bg-white/[0.04]
                           transition-colors duration-400"
              >
                <span className="font-corp-display text-2xl text-gold/50 group-hover:text-gold
                                 transition-colors duration-300 block mb-5">
                  {glyph}
                </span>
                <div className="font-corp-display text-xl font-light text-cream mb-1 leading-snug">
                  {title}
                </div>
                <div className="font-label text-[9px] tracking-[0.2em] uppercase text-ember mb-4">
                  {cadence}
                </div>
                <p className="font-sans text-sm leading-relaxed text-cream/50">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grant Eligibility */}
        <div className="border border-cream/[0.08] p-10 md:p-14 hover:border-cream/[0.14]
                        transition-colors duration-400">
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
              <li
                key={label}
                className="flex items-center justify-between gap-6 py-4
                           hover:bg-white/[0.02] px-2 -mx-2 transition-colors duration-200"
              >
                <span className="font-sans text-sm text-cream/70">{label}</span>
                <span
                  className="shrink-0 border border-gold/30 px-4 py-1
                             font-label text-[9px] tracking-[0.15em] uppercase text-gold"
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
