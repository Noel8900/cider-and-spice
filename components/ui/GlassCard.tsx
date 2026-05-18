'use client';
// GlassCard — luxury warm liquid-glass primitive.
// Usage variants:
//   <GlassCard>             — default: warm frosted surface, hover lifts
//   <GlassCard variant="dark">  — deeper walnut tint, less transparent
//   <GlassCard variant="glow">  — subtle terracotta edge glow on hover
//   <GlassCard hover={false}>   — static, no hover transition
//
// All variants share:
//   backdrop-filter: blur(18px) saturate(160%)
//   warm amber inner gradient
//   cream/10 border

import { CSSProperties, ReactNode } from 'react';

type Variant = 'default' | 'dark' | 'glow';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: Variant;
  style?: CSSProperties;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section' | 'button';
}

const BASE: CSSProperties = {
  backdropFilter: 'blur(18px) saturate(160%)',
  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
  border: '1px solid rgba(232,193,141,0.1)',
  position: 'relative',
  overflow: 'hidden',
};

const VARIANT_BG: Record<Variant, string> = {
  default: 'rgba(44,36,22,0.55)',
  dark:    'rgba(28,18,9,0.72)',
  glow:    'rgba(44,36,22,0.55)',
};

export default function GlassCard({
  children,
  className = '',
  hover = true,
  variant = 'default',
  style,
  onClick,
  as: Tag = 'div',
}: GlassCardProps) {
  const bg = VARIANT_BG[variant];

  return (
    // @ts-expect-error polymorphic tag typing
    <Tag
      onClick={onClick}
      className={[
        'glass-card',
        hover  ? 'glass-card--hover'          : '',
        variant === 'glow' ? 'glass-card--glow' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        ...BASE,
        background: bg,
        ...style,
      }}
    >
      {/* Warm inner gradient overlay */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(232,193,141,0.04) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'contents' }}>
        {children}
      </span>

      <style>{`
        .glass-card--hover {
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .glass-card--hover:hover {
          background: rgba(60,48,30,0.65) !important;
          border-color: rgba(232,193,141,0.18);
        }
        .glass-card--glow:hover {
          box-shadow: 0 0 0 1px rgba(192,98,42,0.25), 0 8px 32px rgba(192,98,42,0.1);
          border-color: rgba(192,98,42,0.3) !important;
        }
      `}</style>
    </Tag>
  );
}
