'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { FADE_UP, EASE, DURATION } from '@/lib/animation/gsap-presets';
import type { StallConcept } from '@/lib/concepts/stalls';

// ─── Status badge config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  StallConcept['status'],
  { label: string; color: string; bg: string; dot: string }
> = {
  available: {
    label: 'Available',
    color: '#6dba8a',
    bg: 'rgba(109,186,138,0.10)',
    dot: '#6dba8a',
  },
  reserved: {
    label: 'Reserved',
    color: '#D4A84B',
    bg: 'rgba(212,168,75,0.10)',
    dot: '#D4A84B',
  },
  anchor: {
    label: 'Hub Anchor',
    color: '#C97A3E',
    bg: 'rgba(201,122,62,0.10)',
    dot: '#C97A3E',
  },
};

// ─── Props ──────────────────────────────────────────────────────────────────────

export interface ConceptCardProps {
  stall: StallConcept;
  /** Show the vendor application CTA. Default true for available stalls. */
  showCta?: boolean;
  /** Compact mode — hides story and shows only label + status + conceptType. */
  compact?: boolean;
  /** Called when the card is selected (e.g. from the floor plan). */
  onSelect?: (id: string) => void;
  /** Whether this card is the currently selected stall (floor plan context). */
  selected?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────────

export default function ConceptCard({
  stall,
  showCta,
  compact = false,
  onSelect,
  selected = false,
  className = '',
}: ConceptCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const cfg = STATUS_CONFIG[stall.status];
  const isAvailable = stall.status === 'available';
  const ctaVisible = showCta ?? isAvailable;

  // Entrance animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, FADE_UP.from);
    gsap.to(el, { ...FADE_UP.to });
  }, []);

  // Hover border glow
  const borderColor = selected
    ? 'rgba(201,122,62,0.60)'
    : hovered
    ? 'rgba(212,168,75,0.30)'
    : 'rgba(232,211,165,0.08)';

  return (
    <div
      ref={cardRef}
      className={className}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? selected : undefined}
      onClick={() => onSelect?.(stall.id)}
      onKeyDown={e => { if (onSelect && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(stall.id); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: selected
          ? 'rgba(201,122,62,0.06)'
          : 'rgba(255,255,255,0.02)',
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        padding: compact ? '1rem 1.25rem' : '1.5rem',
        cursor: onSelect ? 'pointer' : 'default',
        transition: `border-color ${DURATION.fast}s ${EASE.smooth}, background ${DURATION.fast}s ${EASE.smooth}`,
        outline: 'none',
      }}
    >
      {/* Selected accent bar */}
      {selected && (
        <span style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: 3, background: '#C97A3E', borderRadius: '2px 0 0 2px',
        }} />
      )}

      {/* ── Header row ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: compact ? 0 : '0.75rem' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-josefin, sans-serif)',
            fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: '#C97A3E', marginBottom: '0.3rem',
          }}>
            {stall.id}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: compact ? '1.1rem' : '1.35rem',
            fontWeight: 300, color: '#E8D3A5', lineHeight: 1.2, margin: 0,
          }}>
            {stall.label}
          </h3>
        </div>

        {/* Status badge */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          padding: '4px 10px',
          background: cfg.bg,
          border: `1px solid ${cfg.color}22`,
          borderRadius: 2,
          flexShrink: 0,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-josefin, sans-serif)',
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: cfg.color,
          }}>
            {cfg.label}
          </span>
        </span>
      </div>

      {/* ── Concept type ── */}
      {!compact && (
        <div style={{
          fontFamily: 'var(--font-josefin, sans-serif)',
          fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(232,211,165,0.40)',
          marginBottom: '0.85rem',
        }}>
          {stall.conceptType}
        </div>
      )}

      {/* ── Meta row (sqft + rent) ── */}
      {!compact && (
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
          {[`${stall.sqft} sq ft`, stall.rent].map(val => (
            <span key={val} style={{
              fontFamily: 'var(--font-inter, sans-serif)',
              fontSize: '0.75rem', color: 'rgba(232,211,165,0.45)',
            }}>
              {val}
            </span>
          ))}
        </div>
      )}

      {/* ── Story ── */}
      {!compact && (
        <p style={{
          fontFamily: 'var(--font-inter, sans-serif)',
          fontSize: '0.82rem', lineHeight: 1.8,
          color: 'rgba(232,211,165,0.55)',
          margin: 0,
          marginBottom: ctaVisible ? '1.25rem' : 0,
        }}>
          {stall.story}
        </p>
      )}

      {/* ── CTA ── */}
      {ctaVisible && !compact && (
        <Link
          href="/vendors"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-josefin, sans-serif)',
            fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#D4A84B',
            border: '1px solid rgba(212,168,75,0.30)',
            padding: '8px 20px',
            textDecoration: 'none',
            transition: `all ${DURATION.fast}s ${EASE.smooth}`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,168,75,0.10)';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,168,75,0.60)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,168,75,0.30)';
          }}
        >
          Apply for This Stall →
        </Link>
      )}
    </div>
  );
}
