'use client';
// Public-facing sticky navbar for Cider & Spice.
// Liquid glass upgrade:
//   • Dropdowns: frosted warm-glass panel
//     (backdrop-filter: blur(20px) saturate(160%) + rgba(28,18,9,0.82) tint
//     + bottom-edge terracotta gradient fade).
//   • Scrolled nav bar: warm-amber tint added to blur surface.
//   • All GSAP drawer / hamburger / CTA fill behaviour preserved.

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const navLinks = [
  { label: 'Home',         href: '/'            },
  { label: 'Incubator',    href: '/incubator'   },
  { label: 'Cider Club',   href: '/cider-club'  },
  { label: 'Invest',       href: '/investors'   },
  { label: 'Get Involved', href: '/#newsletter' },
] as const;

const spaceLinks = [
  { label: 'The Hub',      href: '/#opportunity', icon: '◈' },
  { label: 'How It Works', href: '/#concept',     icon: '◉' },
  { label: 'Community',    href: '/#impact',      icon: '◆' },
  { label: 'Cider Bar',    href: '/#cider-bar',   icon: '◇' },
  { label: 'Floor Plan',   href: '/floor-plan/',  icon: '✦' },
] as const;

const vendorLinks = [
  { label: 'Apply as a Vendor',  href: '/vendors',            icon: '◈' },
  { label: 'Vendor Onboarding',  href: '/vendors/onboarding', icon: '◉' },
  { label: 'Kitchen Policies',   href: '/kitchen-policies',   icon: '◆' },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href.startsWith('/#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}
function isSpaceActive(p: string)  { return p === '/floor-plan' || p.startsWith('/floor-plan/'); }
function isVendorActive(p: string) { return p === '/vendors' || p.startsWith('/vendors/') || p === '/kitchen-policies'; }

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" style={{ transformOrigin: '12px 6px', transform: open ? 'translateY(6px) rotate(45deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }} />
      <line x1="4" y1="12" x2="20" y2="12" style={{ opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
      <line x1="4" y1="18" x2="20" y2="18" style={{ transformOrigin: '12px 18px', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  );
}

export default function Navbar() {
  const pathname      = usePathname();
  const [scrolled,    setScrolled]   = useState(false);
  const [menuOpen,    setMenuOpen]   = useState(false);
  const [spaceOpen,   setSpaceOpen]  = useState(false);
  const [vendorOpen,  setVendorOpen] = useState(false);
  const spaceRef   = useRef<HTMLLIElement>(null);
  const vendorRef  = useRef<HTMLLIElement>(null);
  const drawerRef  = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLAnchorElement>(null);
  const openingRef = useRef(false);

  useEffect(() => {
    if (logoRef.current) gsap.fromTo(logoRef.current, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h, { passive: true }); h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => { setMenuOpen(false); setSpaceOpen(false); setVendorOpen(false); }, [pathname]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (spaceRef.current  && !spaceRef.current.contains(e.target as Node))  setSpaceOpen(false);
      if (vendorRef.current && !vendorRef.current.contains(e.target as Node)) setVendorOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const items = drawer.querySelectorAll<HTMLElement>('.mob-item');
    if (menuOpen) {
      openingRef.current = true;
      gsap.fromTo(drawer, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.42, ease: 'power3.out', onComplete: () => { openingRef.current = false; } });
      gsap.fromTo(items, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', delay: 0.1 });
    } else {
      if (openingRef.current) return;
      gsap.to(items,  { opacity: 0, y: -8, duration: 0.2, stagger: 0.02, ease: 'power2.in' });
      gsap.to(drawer, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1 });
    }
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen(o => !o), []);
  const spaceActive  = isSpaceActive(pathname ?? '');
  const vendorActive = isVendorActive(pathname ?? '');

  // Liquid glass dropdown panel
  const glassPanel = (open: boolean) =>
    `absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 overflow-hidden
     transition-all duration-200 origin-top
     ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`;

  const dropdownLink = (active: boolean) =>
    `flex items-center gap-3 px-5 py-3 font-label text-[9px]
     tracking-[0.15em] uppercase transition-colors
     hover:bg-[rgba(232,193,141,0.06)] hover:text-gold
     ${active ? 'text-gold bg-[rgba(232,193,141,0.04)]' : 'text-cream/70'}`;

  const glassStyle: React.CSSProperties = {
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    background: 'rgba(28,18,9,0.82)',
    border: '1px solid rgba(232,193,141,0.1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(232,193,141,0.06)',
  };

  // Scrolled nav bar warm-glass style
  const navBarStyle: React.CSSProperties = scrolled || menuOpen ? {
    backdropFilter: 'blur(16px) saturate(150%)',
    WebkitBackdropFilter: 'blur(16px) saturate(150%)',
    background: 'rgba(28,18,9,0.88)',
    boxShadow: '0 1px 0 rgba(232,193,141,0.07)',
  } : {};

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={navBarStyle}
      aria-label="Site navigation"
    >
      <style>{`
        .nav-cta { position: relative; overflow: hidden; transition: color 0.25s, border-color 0.25s; }
        .nav-cta::before { content: ''; position: absolute; inset: 0; background: #c0622a; transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
        .nav-cta:hover::before { transform: scaleX(1); }
        .nav-cta:hover { color: #f7f3ec; border-color: #c0622a; }
        .nav-cta span { position: relative; z-index: 1; }
        .dd-bottom-glow {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,98,42,0.4), transparent);
        }
      `}</style>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link ref={logoRef} href="/"
          className="font-corp-display text-2xl font-light text-cream hover:text-gold transition-colors duration-300 tracking-tight leading-none"
          style={{ opacity: 0 }}>
          Cider &amp; Spice
        </Link>

        <ul className="hidden items-center gap-7 md:flex" role="list">
          <li>
            <Link href="/"
              className={`relative font-label text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-gold ${isActive('/', pathname ?? '') ? 'text-gold' : 'text-cream/60'}`}
              aria-current={isActive('/', pathname ?? '') ? 'page' : undefined}>
              Home
              {isActive('/', pathname ?? '') && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
            </Link>
          </li>

          {/* The Space — glass dropdown */}
          <li ref={spaceRef} className="relative">
            <button type="button" onClick={() => { setSpaceOpen(o => !o); setVendorOpen(false); }}
              aria-expanded={spaceOpen} aria-haspopup="menu"
              className={`flex items-center gap-1 font-label text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-gold ${spaceActive ? 'text-gold' : 'text-cream/60'}`}>
              The Space <ChevronIcon open={spaceOpen} />
              {spaceActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
            </button>
            <div role="menu" className={glassPanel(spaceOpen)} style={glassStyle}>
              <span className="dd-bottom-glow" aria-hidden="true" />
              {spaceLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <Link key={label} href={href} role="menuitem" onClick={() => setSpaceOpen(false)}
                    className={dropdownLink(active)} aria-current={active ? 'page' : undefined}>
                    <span aria-hidden="true" className="font-corp-display text-sm text-gold/60">{icon}</span>
                    {label}
                    {label === 'Floor Plan' && (
                      <span className="ml-auto border border-gold/30 px-2 py-0.5 text-[9px] font-label text-gold uppercase tracking-widest">New</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </li>

          {/* Vendors — glass dropdown */}
          <li ref={vendorRef} className="relative">
            <button type="button" onClick={() => { setVendorOpen(o => !o); setSpaceOpen(false); }}
              aria-expanded={vendorOpen} aria-haspopup="menu"
              className={`flex items-center gap-1 font-label text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-gold ${vendorActive ? 'text-gold' : 'text-cream/60'}`}>
              Vendors <ChevronIcon open={vendorOpen} />
              {vendorActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
            </button>
            <div role="menu" className={glassPanel(vendorOpen)} style={glassStyle}>
              <span className="dd-bottom-glow" aria-hidden="true" />
              {vendorLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <Link key={label} href={href} role="menuitem" onClick={() => setVendorOpen(false)}
                    className={dropdownLink(active)} aria-current={active ? 'page' : undefined}>
                    <span aria-hidden="true" className="font-corp-display text-sm text-gold/60">{icon}</span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </li>

          {navLinks.filter(l => l.href !== '/').map(({ label, href }) => {
            const active = isActive(href, pathname ?? '');
            return (
              <li key={label}>
                <Link href={href}
                  className={`relative font-label text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-gold ${active ? 'text-gold' : 'text-cream/60'}`}
                  aria-current={active ? 'page' : undefined}>
                  {label}
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/vendors"
            className="nav-cta hidden border border-cream/20 px-6 py-2.5 font-label text-[9px] tracking-[0.2em] uppercase text-cream/70 md:inline-block">
            <span>Apply Now →</span>
          </Link>
          <button type="button"
            className="p-2 text-cream transition-colors hover:bg-white/10 md:hidden focus-visible:ring-2 focus-visible:ring-ember/50"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen} aria-controls="mobile-menu"
            onClick={toggleMenu}>
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div ref={drawerRef} id="mobile-menu" role="dialog" aria-label="Mobile navigation"
        className="overflow-hidden border-t border-cream/10 md:hidden"
        style={{ height: 0, opacity: 0 }}>
        <ul className="space-y-1 px-6 py-6" role="list">
          <li className="mob-item" style={{ opacity: 0 }}>
            <Link href="/" className={`block px-3 py-3 font-label text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-gold ${isActive('/', pathname ?? '') ? 'text-gold' : 'text-cream/60'}`} onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="mob-item" style={{ opacity: 0 }}>
            <p className="px-3 pt-4 pb-2 font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">The Space</p>
            <ul className="space-y-0 border-l border-gold/20 ml-3 pl-4">
              {spaceLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <li key={label}>
                    <Link href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 font-label text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-gold ${active ? 'text-gold' : 'text-cream/55'}`}
                      aria-current={active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                      <span aria-hidden="true" className="font-corp-display text-sm text-gold/50">{icon}</span>
                      {label}
                      {label === 'Floor Plan' && <span className="ml-auto border border-gold/30 px-2 py-0.5 text-[9px] font-label text-gold uppercase tracking-widest">New</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="mob-item" style={{ opacity: 0 }}>
            <p className="px-3 pt-4 pb-2 font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">Vendors</p>
            <ul className="space-y-0 border-l border-gold/20 ml-3 pl-4">
              {vendorLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <li key={label}>
                    <Link href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 font-label text-[10px] tracking-[0.15em] uppercase transition-colors hover:text-gold ${active ? 'text-gold' : 'text-cream/55'}`}
                      aria-current={active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                      <span aria-hidden="true" className="font-corp-display text-sm text-gold/50">{icon}</span>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          {navLinks.filter(l => l.href !== '/').map(({ label, href }) => {
            const active = isActive(href, pathname ?? '');
            return (
              <li key={label} className="mob-item" style={{ opacity: 0 }}>
                <Link href={href}
                  className={`block px-3 py-3 font-label text-[10px] tracking-[0.2em] uppercase transition-colors hover:text-gold ${active ? 'text-gold' : 'text-cream/60'}`}
                  aria-current={active ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>
              </li>
            );
          })}
          <li className="mob-item pt-4 pb-2" style={{ opacity: 0 }}>
            <Link href="/vendors"
              className="block border border-cream/20 hover:border-gold/50 px-5 py-3.5 text-center font-label text-[10px] tracking-[0.25em] uppercase text-cream/70 hover:text-gold transition-all duration-300"
              onClick={() => setMenuOpen(false)}>Apply Now →</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
