// Direction 3 — Artisan Collective trust/endorsement bar
// Terracotta ✦ separators, wheat partner names, D3 chestnut surface.
// GSAP ScrollTrigger stagger preserved.
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const D3 = {
  chestnut:   '#5c4a30',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
} as const;

const partners = [
  { abbr: 'City of Las Cruces',  full: 'City of Las Cruces, NM'              },
  { abbr: 'WESST',               full: 'WESST Business Development Services'  },
  { abbr: 'SCORE',               full: 'SCORE Mentors'                        },
  { abbr: 'Sandia Labs',         full: 'Sandia National Laboratories'         },
  { abbr: 'NMSU',                full: 'New Mexico State University'          },
  { abbr: 'Elevate Las Cruces',  full: 'Elevate Las Cruces'                   },
  { abbr: 'Visit Las Cruces',    full: 'Visit Las Cruces'                     },
  { abbr: 'NM MainStreet',       full: 'NM MainStreet Program'                },
]

export default function TrustBar() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-item', {
        opacity: 0, y: 12, duration: 0.7, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        background: D3.chestnut,
        borderTop: '1px solid rgba(232,193,141,0.1)',
        borderBottom: '1px solid rgba(232,193,141,0.1)',
        padding: '1.1rem 1.5rem',
      }}
      aria-label="Community partners and endorsements"
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.25rem 0' }}>

          <span className="trust-item" style={{
            fontFamily: 'var(--font-josefin), system-ui, sans-serif',
            fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: `${D3.wheat}50`, marginRight: '1.5rem', flexShrink: 0,
          }}>Endorsed By</span>

          {partners.map(({ abbr, full }, i) => (
            <span key={abbr} className="trust-item" style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <span style={{ color: D3.terracotta, opacity: 0.45, fontSize: '0.45rem', margin: '0 1.25rem' }} aria-hidden="true">✦</span>
              )}
              <span
                title={full} aria-label={full}
                style={{
                  fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                  fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: `${D3.wheat}70`,
                  cursor: 'default', transition: 'color 0.25s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = D3.wheat)}
                onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}70`)}
              >{abbr}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
