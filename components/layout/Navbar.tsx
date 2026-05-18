'use client';
// Public-facing sticky navbar for Cider & Spice.
// Top-level: Home · The Space ▾ · Vendors ▾ · Incubator · Cider Club · Invest · Get Involved
// "The Space" dropdown: The Hub · How It Works · Community · Cider Bar · Floor Plan
// "Vendors" dropdown: Apply as a Vendor · Vendor Onboarding · Kitchen Policies
// Active styling: usePathname — page routes get a terracotta underline;
//   hash anchors never get active state (they all resolve to pathname "/").
// Scroll: transparent → dark glass after 80 px.
// Mobile: max-height drawer with inline sub-items, closes on link click and resize ≥ 768 px.

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ── Top-level nav links ───────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',         href: '/'            },
  { label: 'Incubator',    href: '/incubator'   },
  { label: 'Cider Club',   href: '/cider-club'  },
  { label: 'Invest',       href: '/investors'   },
  { label: 'Get Involved', href: '/#newsletter' },
] as const;

// ── "The Space" dropdown items ────────────────────────────────────────────────
const spaceLinks = [
  { label: 'The Hub',      href: '/#opportunity', icon: '◈' },
  { label: 'How It Works', href: '/#concept',     icon: '◉' },
  { label: 'Community',    href: '/#impact',      icon: '◆' },
  { label: 'Cider Bar',    href: '/#cider-bar',   icon: '◇' },
  { label: 'Floor Plan',   href: '/floor-plan/',  icon: '✦' },
] as const;

// ── "Vendors" dropdown items ──────────────────────────────────────────────────
const vendorLinks = [
  { label: 'Apply as a Vendor',  href: '/vendors',              icon: '◈' },
  { label: 'Vendor Onboarding',  href: '/vendors/onboarding',   icon: '◉' },
  { label: 'Kitchen Policies',   href: '/kitchen-policies',     icon: '◆' },
] as const;

/**
 * Returns true when the link should receive active styling.
 * Anchor-only hrefs (starting with "/#") are excluded.
 */
function isActive(href: string, pathname: string): boolean {
  if (href.startsWith('/#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function isSpaceActive(pathname: string): boolean {
  return pathname === '/floor-plan' || pathname.startsWith('/floor-plan/');
}

function isVendorActive(pathname: string): boolean {
  return pathname === '/vendors' || pathname.startsWith('/vendors/') || pathname === '/kitchen-policies';
}

// ── Icon components ───────────────────────────────────────────────────────────
function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname      = usePathname();
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [spaceOpen,   setSpaceOpen]   = useState(false);
  const [vendorOpen,  setVendorOpen]  = useState(false);
  const spaceRef  = useRef<HTMLLIElement>(null);
  const vendorRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSpaceOpen(false);
    setVendorOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (spaceRef.current  && !spaceRef.current.contains(e.target as Node))  setSpaceOpen(false);
      if (vendorRef.current && !vendorRef.current.contains(e.target as Node)) setVendorOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const spaceActive  = isSpaceActive(pathname ?? '');
  const vendorActive = isVendorActive(pathname ?? '');

  // shared dropdown panel styles
  const dropdownPanel = (open: boolean) =>
    `absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2
     border border-cream/10 bg-bg/[0.98]
     backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden
     transition-all duration-200 origin-top
     ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`;

  const dropdownLink = (active: boolean) =>
    `flex items-center gap-3 px-5 py-3 font-label text-[9px]
     tracking-[0.15em] uppercase transition-colors
     hover:bg-gold/10 hover:text-gold
     ${active ? 'text-gold bg-gold/[0.07]' : 'text-cream/70'}`;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-bg/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
      aria-label="Site navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link href="/"
          className="font-corp-display text-2xl font-light text-cream hover:text-gold
                     transition-colors duration-300 tracking-tight leading-none">
          Cider &amp; Spice
        </Link>

        {/* ── Desktop nav ──────────────────────────────────────────────── */}
        <ul className="hidden items-center gap-7 md:flex" role="list">

          {/* Home */}
          <li>
            <Link href="/"
              className={`relative font-label text-[10px] tracking-[0.15em] uppercase transition-colors
                          hover:text-gold ${isActive('/', pathname ?? '') ? 'text-gold' : 'text-cream/60'}`}
              aria-current={isActive('/', pathname ?? '') ? 'page' : undefined}>
              Home
              {isActive('/', pathname ?? '') && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />
              )}
            </Link>
          </li>

          {/* The Space dropdown */}
          <li ref={spaceRef} className="relative">
            <button type="button" onClick={() => { setSpaceOpen(o => !o); setVendorOpen(false); }}
              aria-expanded={spaceOpen} aria-haspopup="menu"
              className={`flex items-center gap-1 font-label text-[10px] tracking-[0.15em]
                          uppercase transition-colors hover:text-gold
                          ${spaceActive ? 'text-gold' : 'text-cream/60'}`}>
              The Space
              <ChevronIcon open={spaceOpen} />
              {spaceActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
            </button>
            <div role="menu" className={dropdownPanel(spaceOpen)}>
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

          {/* Vendors dropdown */}
          <li ref={vendorRef} className="relative">
            <button type="button" onClick={() => { setVendorOpen(o => !o); setSpaceOpen(false); }}
              aria-expanded={vendorOpen} aria-haspopup="menu"
              className={`flex items-center gap-1 font-label text-[10px] tracking-[0.15em]
                          uppercase transition-colors hover:text-gold
                          ${vendorActive ? 'text-gold' : 'text-cream/60'}`}>
              Vendors
              <ChevronIcon open={vendorOpen} />
              {vendorActive && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
            </button>
            <div role="menu" className={dropdownPanel(vendorOpen)}>
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

          {/* Remaining top-level links (Incubator, Cider Club, Invest, Get Involved) */}
          {navLinks.filter(l => l.href !== '/').map(({ label, href }) => {
            const active = isActive(href, pathname ?? '');
            return (
              <li key={label}>
                <Link href={href}
                  className={`relative font-label text-[10px] tracking-[0.15em] uppercase
                              transition-colors hover:text-gold ${active ? 'text-gold' : 'text-cream/60'}`}
                  aria-current={active ? 'page' : undefined}>
                  {label}
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTA + mobile hamburger ───────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link href="/vendors"
            className="hidden border border-cream/20 hover:border-gold/60 px-6 py-2.5
                       font-label text-[9px] tracking-[0.2em] uppercase text-cream/70
                       hover:text-gold transition-all duration-300 md:inline-block">
            Apply Now →
          </Link>
          <button type="button"
            className="p-2 text-cream transition-colors hover:bg-white/10 md:hidden focus-visible:ring-2 focus-visible:ring-ember/50"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen} aria-controls="mobile-menu"
            onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div id="mobile-menu" role="dialog" aria-label="Mobile navigation"
        className={`overflow-hidden border-t border-cream/10 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <ul className="space-y-1 px-6 py-6" role="list">

          {/* Home */}
          <li>
            <Link href="/"
              className={`block px-3 py-3 font-label text-[10px] tracking-[0.2em] uppercase
                          transition-colors hover:text-gold
                          ${isActive('/', pathname ?? '') ? 'text-gold' : 'text-cream/60'}`}
              onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          {/* The Space inline */}
          <li>
            <p className="px-3 pt-4 pb-2 font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">The Space</p>
            <ul className="space-y-0 border-l border-gold/20 ml-3 pl-4">
              {spaceLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <li key={label}>
                    <Link href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 font-label text-[10px]
                                  tracking-[0.15em] uppercase transition-colors hover:text-gold
                                  ${active ? 'text-gold' : 'text-cream/55'}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}>
                      <span aria-hidden="true" className="font-corp-display text-sm text-gold/50">{icon}</span>
                      {label}
                      {label === 'Floor Plan' && (
                        <span className="ml-auto border border-gold/30 px-2 py-0.5 text-[9px] font-label text-gold uppercase tracking-widest">New</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Vendors inline */}
          <li>
            <p className="px-3 pt-4 pb-2 font-label text-[9px] tracking-[0.3em] uppercase text-gold/60">Vendors</p>
            <ul className="space-y-0 border-l border-gold/20 ml-3 pl-4">
              {vendorLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <li key={label}>
                    <Link href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 font-label text-[10px]
                                  tracking-[0.15em] uppercase transition-colors hover:text-gold
                                  ${active ? 'text-gold' : 'text-cream/55'}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}>
                      <span aria-hidden="true" className="font-corp-display text-sm text-gold/50">{icon}</span>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Incubator, Cider Club, Invest, Get Involved */}
          {navLinks.filter(l => l.href !== '/').map(({ label, href }) => {
            const active = isActive(href, pathname ?? '');
            return (
              <li key={label}>
                <Link href={href}
                  className={`block px-3 py-3 font-label text-[10px] tracking-[0.2em] uppercase
                              transition-colors hover:text-gold
                              ${active ? 'text-gold' : 'text-cream/60'}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Mobile CTA */}
          <li className="pt-4 pb-2">
            <Link href="/vendors"
              className="block border border-cream/20 hover:border-gold/50 px-5 py-3.5
                         text-center font-label text-[10px] tracking-[0.25em] uppercase
                         text-cream/70 hover:text-gold transition-all duration-300"
              onClick={() => setMenuOpen(false)}>
              Apply Now →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
