'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',       href: '/'           },
  { label: 'Floor Plan', href: '/floor-plan' },
  { label: 'Vendors',    href: '/vendors'    },
  { label: 'Incubator',  href: '/incubator'  },
  { label: 'Investors',  href: '/investors'  },
];

const CTA = { label: 'Apply Now', href: '/vendors' };

// ─── Component ────────────────────────────────────────────────────────────────

export default function MobileNav() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef             = useRef<HTMLDivElement>(null);
  const overlayRef            = useRef<HTMLDivElement>(null);
  const pathname              = usePathname();

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Scroll detection for nav background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Drawer animation
  useEffect(() => {
    const drawer  = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;
    if (open) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(drawer,  { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: 'power2.out', delay: 0.15 }
      );
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' });
      gsap.to(drawer,  { x: '100%', duration: 0.35, ease: 'power3.in' });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* ── Sticky top bar (mobile only) ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 sm:hidden"
        style={{
          background: scrolled ? 'rgba(16,14,10,0.96)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(212,168,75,0.10)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 0.4s, border-color 0.4s',
        }}
      >
        <Link href="/" aria-label="Home" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: '1.25rem',
            fontWeight: 400,
            color: '#E8D3A5',
            letterSpacing: '0.03em',
          }}>
            Cider <em style={{ fontStyle: 'italic', color: '#C97A3E' }}>&amp;</em> Spice
          </span>
        </Link>

        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: 'center', gap: '5px',
            width: 40, height: 40,
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          }}
        >
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: open ? '#D4A84B' : 'rgba(232,211,165,0.7)',
            transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.3s, background 0.2s',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: open ? 'transparent' : 'rgba(232,211,165,0.7)',
            transition: 'background 0.2s',
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: open ? '#D4A84B' : 'rgba(232,211,165,0.7)',
            transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.3s, background 0.2s',
          }} />
        </button>
      </header>

      {/* ── Overlay ── */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: 'rgba(10,8,5,0.75)',
          backdropFilter: 'blur(4px)',
          display: open ? 'block' : 'none',
          opacity: 0,
        }}
      />

      {/* ── Drawer ── */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(320px, 85vw)',
          zIndex: 70,
          background: 'linear-gradient(160deg, #1A1510 0%, #100E0A 100%)',
          borderLeft: '1px solid rgba(212,168,75,0.12)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.6)',
          transform: 'translateX(100%)',
          display: 'flex', flexDirection: 'column',
          paddingTop: '72px',
          overflowY: 'auto',
        }}
      >
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #D4A84B, transparent)' }} />

        <nav style={{ flex: 1, padding: '2rem 2rem 1.5rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href} className="mobile-nav-item" style={{ opacity: 0 }}>
                  <Link
                    href={href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem 0',
                      borderBottom: '1px solid rgba(232,211,165,0.07)',
                      fontFamily: 'var(--font-cormorant, Georgia, serif)',
                      fontSize: '1.5rem', fontWeight: 300,
                      color: active ? '#D4A84B' : '#E8D3A5',
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
                    {active && (
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4A84B', flexShrink: 0 }} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-nav-item" style={{ padding: '1.5rem 2rem 2.5rem', opacity: 0 }}>
          <Link
            href={CTA.href}
            style={{
              display: 'block', textAlign: 'center',
              background: 'linear-gradient(135deg, #C97A3E 0%, #D4A84B 100%)',
              color: '#100E0A',
              padding: '14px 24px',
              fontFamily: 'var(--font-josefin, sans-serif)',
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(212,168,75,0.20)',
            }}
          >
            {CTA.label}
          </Link>
        </div>
      </div>
    </>
  );
}
