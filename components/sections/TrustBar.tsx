'use client';
// Direction 3 — Artisan Collective trust/endorsement bar
// Infinite CSS marquee: two identical lists create a seamless loop.
// Pauses on hover/focus. Terracotta ✦ separators, wheat partner names.
// No JS animation — pure CSS @keyframes marquee (defined in globals.css).
'use client'

import { useRef } from 'react'

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

function PartnerList() {
  return (
    <ul
      role="list"
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        gap: 0,
        flexShrink: 0,
      }}
    >
      {partners.map(({ abbr, full }) => (
        <li key={abbr} style={{ display: 'flex', alignItems: 'center' }}>
          {/* separator */}
          <span
            style={{
              color: D3.terracotta,
              opacity: 0.5,
              fontSize: '0.42rem',
              margin: '0 1.75rem',
              userSelect: 'none',
            }}
            aria-hidden="true"
          >✦</span>
          <span
            title={full}
            style={{
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: `${D3.wheat}70`,
              whiteSpace: 'nowrap',
              transition: 'color 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = D3.wheat)}
            onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}70`)}
          >{abbr}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TrustBar() {
  const outerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      style={{
        background: D3.chestnut,
        borderTop:    '1px solid rgba(232,193,141,0.10)',
        borderBottom: '1px solid rgba(232,193,141,0.10)',
        padding: '0.9rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Community partners and endorsements"
    >
      {/* Accessible static list for screen readers */}
      <ul
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}
        role="list"
      >
        {partners.map(({ full }) => <li key={full}>{full}</li>)}
      </ul>

      {/* Eyebrow label — pinned left, outside the scroll track */}
      <div style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }} aria-hidden="true">
        <span style={{
          fontFamily: 'var(--font-josefin), system-ui, sans-serif',
          fontSize: '0.54rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: `${D3.wheat}40`,
        }}>Endorsed By</span>
      </div>

      {/* Marquee outer — faded edges via mask in globals.css */}
      <div ref={outerRef} className="marquee-outer" style={{ paddingLeft: '9rem' }}>
        {/* marquee-track contains two identical lists for seamless loop */}
        <div className="marquee-track">
          <PartnerList />
          <PartnerList />
        </div>
      </div>
    </section>
  )
}
