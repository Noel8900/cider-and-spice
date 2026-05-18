import VendorOnboardingSection from '@/components/sections/VendorOnboardingSection';
import SiteFooter from '@/components/sections/SiteFooter';
import TrustBar from '@/components/sections/TrustBar';
import StructuredData from '@/components/seo/StructuredData';
import Link from 'next/link';

const D3 = {
  walnut:     '#2c2416',
  terracotta: '#c0622a',
  wheat:      '#e8c18d',
  parchment:  '#f7f3ec',
} as const;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.lccullinaryhub.com/vendors/onboarding',
      url: 'https://www.lccullinaryhub.com/vendors/onboarding',
      name: 'Vendor Onboarding — Las Cruces Culinary Innovation Hub',
      description:
        'Eight-step vendor onboarding journey: outreach, selection, Food Entrepreneur Academy, licensing, soft launch, growth support, improvement plans, and graduation pathways.',
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.lccullinaryhub.com/#website',
        name: 'Las Cruces Culinary Innovation Hub',
        url: 'https://www.lccullinaryhub.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.lccullinaryhub.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Vendor Application',
          item: 'https://www.lccullinaryhub.com/vendors',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Vendor Onboarding',
          item: 'https://www.lccullinaryhub.com/vendors/onboarding',
        },
      ],
    },
  ],
};

export default function VendorOnboardingPage() {
  return (
    <main style={{ background: D3.walnut, minHeight: '100svh' }}>
      <StructuredData schema={schema} />

      {/* ── Hero header ──────────────────────────────────────────────── */}
      <div style={{ padding: '7rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            pointerEvents: 'none', position: 'absolute',
            top: '-5rem', left: '-5rem',
            width: '450px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(107,140,107,0.07) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }}
        />

        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>

          {/* Back breadcrumb */}
          <Link
            href="/vendors"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: `${D3.wheat}45`, textDecoration: 'none', transition: 'color 0.25s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Vendor Application
          </Link>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', background: D3.terracotta }} />
            <span style={{
              fontFamily: 'var(--font-josefin), system-ui, sans-serif',
              fontSize: '0.62rem', letterSpacing: '0.32em', textTransform: 'uppercase',
              color: D3.terracotta,
            }}>
              Founding Cohort &mdash; 8-Step Journey
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 300,
            color: D3.parchment, lineHeight: 0.95, letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            From First Idea to<br />
            <em style={{ fontStyle: 'italic', color: D3.terracotta }}>Grand Opening.</em>
          </h1>

          {/* Sub-copy */}
          <p style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '1rem', lineHeight: 1.8, color: `${D3.wheat}80`,
            maxWidth: '480px', marginBottom: '2.5rem',
          }}>
            Eight structured milestones &mdash; from first outreach through a supported soft
            launch and on to a clear graduation pathway &mdash; with coaching from our
            Incubator Director and selection committee at every stage.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
            <Link
              href="/vendors"
              style={{
                background: D3.terracotta, color: D3.parchment,
                padding: '0.875rem 2rem',
                fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                textDecoration: 'none', fontWeight: 600, transition: 'opacity 0.25s',
              }}
            >
              Apply for a Stall &rarr;
            </Link>
            <Link
              href="/kitchen-policies"
              style={{
                border: '1px solid rgba(232,193,141,0.2)', color: `${D3.wheat}90`,
                padding: '0.875rem 2rem',
                fontFamily: 'var(--font-josefin), system-ui, sans-serif',
                fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'border-color 0.3s, color 0.3s',
              }}
            >
              Kitchen Policies
            </Link>
          </div>
        </div>
      </div>

      {/* Terracotta divider */}
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${D3.terracotta}50, transparent)` }} />

      <VendorOnboardingSection />
      <TrustBar />
      <SiteFooter />
    </main>
  );
}
