'use client';
// Public-facing sticky navbar for Cider & Spice.
// Top-level: Home · The Space ▾ · Vendors · Cider Club · Get Involved
// "The Space" dropdown: The Hub · How It Works · Community · Cider Bar · Floor Plan
// Active styling: usePathname — page routes get a terracotta underline;
//   hash anchors never get active state (they all resolve to pathname "/").
// Scroll: transparent → dark glass after 80 px.
// Mobile: max-height drawer with inline sub-items, closes on link click and resize ≥ 768 px.

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ── Top-level nav links ───────────────────────────────────────────────────────
const navLinks = [
  { label: 'Home',        href: '/'            },
  { label: 'Vendors',     href: '/vendors'     },
  { label: 'Cider Club',  href: '/cider-club'  },
  { label: 'Get Involved',href: '/#newsletter' },
] as const;

// ── "The Space" dropdown items ────────────────────────────────────────────────
const spaceLinks = [
  { label: 'The Hub',      href: '/#opportunity', icon: '🏛️' },
  { label: 'How It Works', href: '/#concept',     icon: '⚙️' },
  { label: 'Community',    href: '/#impact',      icon: '🤝' },
  { label: 'Cider Bar',    href: '/#cider-bar',   icon: '🍎' },
  { label: 'Floor Plan',   href: '/floor-plan/',  icon: '🗺' },
] as const;

/**
 * Returns true when the link should receive active styling.
 * Anchor-only hrefs (starting with "/#") are excluded — they all live on "/"
 * and would make every homepage link appear active simultaneously.
 */
function isActive(href: string, pathname: string): boolean {
  if (href.startsWith('/#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

/** True when the current route is inside "The Space" group */
function isSpaceActive(pathname: string): boolean {
  return pathname === '/floor-plan' || pathname.startsWith('/floor-plan/');
}

// ── Icon components ───────────────────────────────────────────────────────────
function MenuIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname    = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [spaceOpen, setSpaceOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile drawer on resize ≥ 768 px
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Close drawer and dropdown on route change
  useEffect(() => {
    setMenuOpen(false);
    setSpaceOpen(false);
  }, [pathname]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSpaceOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const spaceActive = isSpaceActive(pathname ?? '');

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-bg/95 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
      }`}
      aria-label="Site navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-cream transition-opacity hover:opacity-80"
        >
          Cider &amp; Spice
        </Link>

        {/* ── Desktop nav ───────────────────────────────────────────────── */}
        <ul className="hidden items-center gap-7 md:flex" role="list">

          {/* Home */}
          <li>
            <Link
              href="/"
              className={`relative font-sans text-sm transition-colors
                          hover:text-ember ${isActive('/', pathname ?? '') ? 'text-ember' : 'text-cream/75'}`}
              aria-current={isActive('/', pathname ?? '') ? 'page' : undefined}
            >
              Home
              {isActive('/', pathname ?? '') && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-ember" aria-hidden="true" />
              )}
            </Link>
          </li>

          {/* The Space dropdown */}
          <li ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setSpaceOpen((o) => !o)}
              aria-expanded={spaceOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-1 font-sans text-sm transition-colors
                          hover:text-ember
                          ${spaceActive ? 'text-ember' : 'text-cream/75'}`}
            >
              The Space
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true"
                className={`transition-transform duration-200 ${spaceOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
              {spaceActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-ember" aria-hidden="true" />
              )}
            </button>

            {/* Dropdown panel */}
            <div
              role="menu"
              className={`absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2
                          rounded-2xl border border-cream/10 bg-bg/[0.98]
                          backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden
                          transition-all duration-200 origin-top
                          ${spaceOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
            >
              {spaceLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <Link
                    key={label}
                    href={href}
                    role="menuitem"
                    onClick={() => setSpaceOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 font-sans text-sm
                                transition-colors hover:bg-ember/15 hover:text-ember
                                ${active ? 'text-ember bg-ember/10' : 'text-cream/80'}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span aria-hidden="true" className="text-base">{icon}</span>
                    {label}
                    {label === 'Floor Plan' && (
                      <span className="ml-auto rounded-full bg-ember/20 px-2 py-0.5
                                       text-[10px] font-semibold text-ember uppercase tracking-wide">
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </li>

          {/* Remaining top-level links */}
          {navLinks.filter(l => l.href !== '/').map(({ label, href }) => {
            const active = isActive(href, pathname ?? '');
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`relative font-sans text-sm transition-colors
                              hover:text-ember ${active ? 'text-ember' : 'text-cream/75'}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-ember" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop CTA + mobile hamburger ────────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link
            href="/vendors"
            className="hidden rounded-xl bg-ember px-5 py-2.5 text-sm font-semibold
                       text-white transition-colors hover:bg-ember-hover md:inline-block"
          >
            Apply Now →
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-cream transition-colors hover:bg-white/10 md:hidden focus-visible:ring-2 focus-visible:ring-ember/50"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        className={`overflow-hidden border-t border-cream/10 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-1 px-6 py-6" role="list">

          {/* Home */}
          <li>
            <Link
              href="/"
              className={`block rounded-lg px-3 py-2.5 font-sans text-base
                          transition-colors hover:bg-white/5 hover:text-ember
                          ${isActive('/', pathname ?? '') ? 'text-ember bg-white/[0.04]' : 'text-cream/80'}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          {/* The Space sub-items inline in mobile */}
          <li>
            <p className="px-3 pt-3 pb-1 font-sans text-xs font-semibold uppercase
                           tracking-widest text-cream/40">
              The Space
            </p>
            <ul className="space-y-0.5 border-l-2 border-ember/30 ml-3 pl-3">
              {spaceLinks.map(({ label, href, icon }) => {
                const active = isActive(href, pathname ?? '');
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 font-sans
                                  text-sm transition-colors hover:bg-white/5 hover:text-ember
                                  ${active ? 'text-ember bg-white/[0.04]' : 'text-cream/75'}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span aria-hidden="true">{icon}</span>
                      {label}
                      {label === 'Floor Plan' && (
                        <span className="ml-auto rounded-full bg-ember/20 px-2 py-0.5
                                         text-[10px] font-semibold text-ember uppercase tracking-wide">
                          New
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Remaining top-level links */}
          {navLinks.filter(l => l.href !== '/').map(({ label, href }) => {
            const active = isActive(href, pathname ?? '');
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2.5 font-sans text-base
                              transition-colors hover:bg-white/5
                              ${active ? 'text-ember bg-white/[0.04]' : 'text-cream/80 hover:text-ember'}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Mobile CTA */}
          <li className="pt-3">
            <Link
              href="/vendors"
              className="block rounded-xl bg-ember px-5 py-3 text-center font-semibold
                         text-white transition-colors hover:bg-ember-hover"
              onClick={() => setMenuOpen(false)}
            >
              Apply Now →
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
