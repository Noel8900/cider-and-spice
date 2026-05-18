import IncubatorProgramSection from '@/components/sections/IncubatorProgramSection';
import VendorOnboardingSection from '@/components/sections/VendorOnboardingSection';
import SiteFooter from '@/components/sections/SiteFooter';
import TrustBar from '@/components/sections/TrustBar';
import Link from 'next/link';

const D3 = {
  walnut:     '#2c2416',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

export default function IncubatorPage() {
  return (
    <main style={{ background: D3.walnut, minHeight: '100svh' }}>

      {/* ── Hero header ─────────────────────────────────────────────── */}
      <div style={{ padding: '7rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient glow */}
        <div style={{ pointerEvents: 'none', position: 'absolute', top: '-6rem', right: '-6rem', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,98,42,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }} aria-hidden="true" />

        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>

          {/* Back breadcrumb */}
          <Link href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${D3.wheat}45`, textDecoration: 'none', transition: 'color 0.25s' }}
            onMouseEnter={e => (e.currentTarget.style.color = D3.terracotta)}
            onMouseLeave={e => (e.currentTarget.style.color = `${D3.wheat}45`)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 19l-7-7 7-7" /></svg>
            Back to the Hub
          </Link>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta }} />
            <span style={{ fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: D3.terracotta }}>Semilla &amp; Mariposa Pathways</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 300, color: D3.parchment, lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: '1.5rem' }}>
            Your Idea. Our Platform.<br />
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Their Table.</em>
          </h1>

          {/* Sub-copy */}
          <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: `${D3.wheat}80`, maxWidth: '480px', marginBottom: '2.5rem' }}>
            Southern New Mexico&rsquo;s first structured culinary incubator &mdash; two defined pathways,
            five launch phases, and a performance dashboard built to turn food ideas into
            sustainable businesses.
          </p>

          {/* CTA row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
            <Link href="/vendors"
              style={{ background: D3.terracotta, color: D3.parchment, padding: '0.875rem 2rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Apply for a Stall →
            </Link>
            <Link href="/vendors/onboarding"
              style={{ border: `1px solid rgba(232,193,141,0.2)`, color: `${D3.wheat}90`, padding: '0.875rem 2rem', fontFamily: 'var(--font-josefin), system-ui, sans-serif', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(192,98,42,0.5)`; (e.currentTarget as HTMLAnchorElement).style.color = D3.parchment; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(232,193,141,0.2)'; (e.currentTarget as HTMLAnchorElement).style.color = `${D3.wheat}90`; }}>
              View Onboarding Steps
            </Link>
          </div>
        </div>
      </div>

      {/* Terracotta divider */}
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${D3.terracotta}50, transparent)` }} />

      <IncubatorProgramSection />
      <VendorOnboardingSection />
      <TrustBar />
      <SiteFooter />
    </main>
  );
}
