'use client';

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

const zones = [
  {
    zone: 'Receiving & Dry Storage',
    purpose: 'Verify supplier condition, packaging integrity, and temperature of incoming goods.',
    ccp: 'TCS temperature verification, packaging integrity, allergen segregation, FIFO rotation',
  },
  {
    zone: 'Cold & Frozen Storage',
    purpose: 'Hold TCS ingredients, proteins, dairy, and prepped goods safely.',
    ccp: 'Cold-holding temp range, covered containers, raw proteins below RTE items',
  },
  {
    zone: 'Prep Zone',
    purpose: 'Wash, cut, portion, thaw, marinate, and stage mise en place.',
    ccp: 'Handwashing frequency, deep sanitation between tasks, allergen cross-contact prevention',
  },
  {
    zone: 'Cooking Zone',
    purpose: 'Cook products to approved internal temperatures.',
    ccp: 'Internal cooking temp verification, batch traceability logs',
  },
  {
    zone: 'Cooling & Reheating',
    purpose: 'Safely cool cooked foods; reheat held items for service.',
    ccp: 'Two-stage cooling monitoring and logging, rapid reheating execution',
  },
  {
    zone: 'Holding & Service',
    purpose: 'Maintain food safety from production until service or packaging.',
    ccp: 'Continuous holding temp logging, time-marking protocols',
  },
  {
    zone: 'Dishwashing & Cleaning',
    purpose: 'Wash, rinse, sanitize, and air-dry wares; deep clean surfaces.',
    ccp: 'Sanitizer concentration verification, dirty-to-clean directional flow',
  },
];

const houseRules = [
  {
    title: 'Scheduling & Access',
    body: 'All kitchen time must be reserved in advance via scheduling software. Spontaneous or unlogged kitchen use is strictly prohibited. 24-hour access is monitored via integrated video security.',
  },
  {
    title: 'Storage Labeling',
    body: "Every container in assigned dry, cold, and frozen storage must be labeled with the operator's business name, date of prep, and clear ingredient disclosures to prevent cross-contact and product displacement.",
  },
  {
    title: 'Sanitation & Warewashing',
    body: 'Shared dishwashing machines and 3-compartment sinks require advance reservation windows. Operators must deeply clean, sanitize, and reset assigned workstations immediately following their scheduled session.',
  },
  {
    title: 'Waste & Grease Controls',
    body: 'Vendors are individually responsible for separating and removing raw trash to designated central receptacles before checkout. Fryer grease must be logged; structural grease trap servicing follows the master facility maintenance schedule.',
  },
];

const checklist = [
  'Executed Shared-Use Kitchen Agreement and fully paid security deposit',
  'Active Certified Food Protection Manager (CFPM) certificate',
  'New Mexico Business Tax Registration (CRS number) documentation',
  'NMED Food Establishment Permit confirmation letter',
  'Commercial General Liability Insurance — Hub named as additional insured',
  'City of Las Cruces Business Registration certificate',
];

export default function KitchenPoliciesSection() {
  const ref = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'zones' | 'rules' | 'checklist'>('zones');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.kp-header', {
        opacity: 0, y: 28, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.kp-header', start: 'top 85%', once: true },
      });
      gsap.from('.kp-tab-content', {
        opacity: 0, y: 16, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.kp-tabs', start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const tabs: { key: 'zones' | 'rules' | 'checklist'; label: string }[] = [
    { key: 'zones',     label: 'Production Workflow' },
    { key: 'rules',     label: 'House Rules' },
    { key: 'checklist', label: 'Onboarding Checklist' },
  ];

  return (
    <section
      ref={ref}
      id="kitchen-policies"
      style={{ background: D3.chestnut, padding: '6rem 1.5rem' }}
      aria-label="Commercial kitchen policies"
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="kp-header" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta }} />
            <span style={{
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase',
              color: D3.terracotta,
            }}>
              Kitchen Operations
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300,
            color: D3.parchment, lineHeight: 1.1, marginBottom: '1rem',
          }}>
            Shared Kitchen
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}> Standards</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '1rem', lineHeight: 1.8, color: `${D3.wheat}90`, maxWidth: '600px',
          }}>
            All operations are governed by the New Mexico Environment Department Food Program
            under <strong style={{ color: D3.wheat }}>7.6.2 NMAC</strong>, incorporating the
            2017 FDA Food Code with state-specific modifications. Every vendor must complete
            and maintain the compliance binder before kitchen access is granted.
          </p>
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <div className="kp-tabs">
          <div style={{
            display: 'flex', gap: 0, marginBottom: 0,
            borderBottom: '1px solid rgba(232,193,141,0.12)',
          }}>
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                aria-selected={activeTab === t.key}
                style={{
                  fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                  fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '0.9rem 1.75rem', border: 'none', cursor: 'pointer',
                  background: 'transparent',
                  color: activeTab === t.key ? D3.parchment : `${D3.wheat}55`,
                  borderBottom: activeTab === t.key ? `2px solid ${D3.terracotta}` : '2px solid transparent',
                  transition: 'color 0.25s, border-color 0.25s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="kp-tab-content" style={{ paddingTop: '2.5rem' }}>

            {/* ── Zone Pipeline ─────────────────────────────────────── */}
            {activeTab === 'zones' && (
              <div style={{ position: 'relative' }}>

                {/* Vertical spine */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    bottom: '1.25rem',
                    left: '10px',
                    width: '2px',
                    background:
                      'linear-gradient(to bottom, rgba(192,98,42,0.5), rgba(232,193,141,0.15))',
                    borderRadius: '2px',
                  }}
                />

                <ol
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.875rem',
                  }}
                >
                  {zones.map((row, index) => {
                    const chips = row.ccp
                      .split(',')
                      .map(s => s.trim())
                      .filter(Boolean);

                    return (
                      <li
                        key={row.zone}
                        style={{
                          position: 'relative',
                          paddingLeft: '2.75rem',
                          paddingRight: '1.25rem',
                          paddingTop: '1.1rem',
                          paddingBottom: '1.1rem',
                          background:
                            index % 2 === 0
                              ? 'rgba(44,36,22,0.30)'
                              : 'rgba(44,36,22,0.15)',
                          border: '1px solid rgba(232,193,141,0.1)',
                          borderLeft: `3px solid ${
                            index === 0
                              ? D3.terracotta
                              : index < 3
                              ? `${D3.terracotta}bb`
                              : index < 6
                              ? `${D3.terracotta}77`
                              : `${D3.terracotta}44`
                          }`,
                        }}
                      >
                        {/* Step dot */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            left: '-7px',
                            top: '1.1rem',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: D3.chestnut,
                            border: `2px solid ${D3.terracotta}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                            fontSize: '0.52rem',
                            letterSpacing: '0.08em',
                            color: D3.wheat,
                            fontWeight: 600,
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Zone title */}
                        <div style={{ marginBottom: '0.35rem' }}>
                          <span style={{
                            fontFamily: 'var(--font-cormorant), Georgia, serif',
                            fontSize: '1.1rem',
                            fontWeight: 400,
                            color: D3.parchment,
                            lineHeight: 1.2,
                          }}>
                            {row.zone}
                          </span>
                        </div>

                        {/* Purpose */}
                        <p style={{
                          fontFamily: 'var(--font-inter), system-ui, sans-serif',
                          fontSize: '0.85rem',
                          lineHeight: 1.7,
                          color: `${D3.wheat}75`,
                          margin: '0 0 0.7rem',
                        }}>
                          {row.purpose}
                        </p>

                        {/* CCP chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {chips.map(chip => (
                            <span
                              key={chip}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '0.22rem 0.65rem',
                                borderRadius: '999px',
                                border: '1px solid rgba(232,193,141,0.22)',
                                background: 'rgba(92,74,48,0.55)',
                                fontFamily:
                                  'var(--font-josefin), system-ui, sans-serif',
                                fontSize: '0.58rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: `${D3.wheat}80`,
                              }}
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  width: '4px',
                                  height: '4px',
                                  borderRadius: '50%',
                                  background: D3.terracotta,
                                  flexShrink: 0,
                                }}
                              />
                              {chip}
                            </span>
                          ))}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {/* Flow-end indicator */}
                <div
                  aria-hidden="true"
                  style={{
                    marginTop: '1.25rem',
                    marginLeft: '0.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: `${D3.wheat}35`,
                  }}
                >
                  <span style={{
                    display: 'block', width: '16px', height: '1px',
                    background: `${D3.wheat}25`,
                  }} />
                  End of production cycle
                </div>
              </div>
            )}

            {/* ── House Rules ───────────────────────────────────────── */}
            {activeTab === 'rules' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}>
                {houseRules.map(rule => (
                  <div
                    key={rule.title}
                    style={{
                      padding: '1.75rem',
                      background: 'rgba(44,36,22,0.35)',
                      border: '1px solid rgba(232,193,141,0.1)',
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                      fontSize: '0.67rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: D3.terracotta, marginBottom: '0.85rem',
                    }}>
                      {rule.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '0.88rem', lineHeight: 1.75, color: `${D3.wheat}80`,
                    }}>
                      {rule.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ── Onboarding Checklist ──────────────────────────────── */}
            {activeTab === 'checklist' && (
              <div style={{ maxWidth: '640px' }}>
                <p style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.9rem', lineHeight: 1.75,
                  color: `${D3.wheat}80`, marginBottom: '2rem',
                }}>
                  Before a vendor is issued building access or kitchen time, every item below
                  must be verified and compiled into the central compliance binder.
                </p>
                <ul style={{
                  listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: '0.85rem',
                }}>
                  {checklist.map(item => (
                    <li
                      key={item}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '1rem',
                        padding: '1rem 1.25rem',
                        background: 'rgba(44,36,22,0.3)',
                        border: '1px solid rgba(232,193,141,0.08)',
                        fontFamily: 'var(--font-inter), system-ui, sans-serif',
                        fontSize: '0.88rem', lineHeight: 1.6, color: `${D3.wheat}85`,
                      }}
                    >
                      <span
                        style={{ color: D3.terracotta, flexShrink: 0, marginTop: '2px' }}
                        aria-hidden="true"
                      >
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
