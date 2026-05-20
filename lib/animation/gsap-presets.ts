// ─── GSAP Animation Presets ───────────────────────────────────────────────────
// Single source of truth for easing, duration, stagger, and scroll trigger
// thresholds used across all sections.
// UI-4 Phase: standardise all section entrance animations.

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

// ─── Core tokens ──────────────────────────────────────────────────────────────

export const EASE = {
  enter:  'power3.out',
  exit:   'power3.in',
  smooth: 'power2.out',
  subtle: 'power1.out',
  spring: 'back.out(1.2)',
} as const;

export const DURATION = {
  fast:   0.35,
  base:   0.55,
  slow:   0.90,
  xslow:  1.20,
} as const;

export const STAGGER = {
  tight:  0.045,
  base:   0.09,
  loose:  0.14,
} as const;

export const SCROLL_START = 'top 78%';
export const SCROLL_ONCE  = true;

// ─── Reusable entrance presets ────────────────────────────────────────────────

/** Fade + rise. Use for body copy, cards, and list items. */
export const FADE_UP = {
  from: { opacity: 0, y: 24 },
  to:   { opacity: 1, y: 0, duration: DURATION.slow, ease: EASE.enter },
} as const;

/** Fade only. Use for backgrounds, overlays, decorative elements. */
export const FADE_IN = {
  from: { opacity: 0 },
  to:   { opacity: 1, duration: DURATION.base, ease: EASE.smooth },
} as const;

/** Scale + fade. Use for anchor stalls, featured cards. */
export const SCALE_IN = {
  from: { opacity: 0, scale: 0.97 },
  to:   { opacity: 1, scale: 1, duration: DURATION.slow, ease: EASE.enter },
} as const;

/** Slide from left. Use for eyebrow lines and section rules. */
export const SLIDE_RIGHT = {
  from: { opacity: 0, x: -16 },
  to:   { opacity: 1, x: 0, duration: DURATION.base, ease: EASE.smooth },
} as const;

// ─── Section entrance helper ──────────────────────────────────────────────────
// Registers a standard ScrollTrigger entrance for a group of elements.
// Keeps all section components consistent without repeating config.

interface SectionEntranceOptions {
  targets:    string | Element | Element[];
  trigger:    Element | null;
  preset?:    typeof FADE_UP | typeof FADE_IN | typeof SCALE_IN | typeof SLIDE_RIGHT;
  stagger?:   number;
  delay?:     number;
  start?:     string;
}

export function sectionEntrance({
  targets,
  trigger,
  preset   = FADE_UP,
  stagger  = STAGGER.base,
  delay    = 0,
  start    = SCROLL_START,
}: SectionEntranceOptions) {
  if (!trigger) return;

  gsap.set(targets, preset.from);

  ScrollTrigger.create({
    trigger,
    start,
    once: SCROLL_ONCE,
    onEnter: () => {
      gsap.to(targets, {
        ...preset.to,
        stagger,
        delay,
      });
    },
  });
}

// ─── Hero entrance helper ─────────────────────────────────────────────────────
// Standardised hero timeline — eyebrow → title → sub → actions → scroll cue.

interface HeroEntranceSelectors {
  eyebrow?: string;
  title?:   string;
  sub?:     string;
  actions?: string;
  scroll?:  string;
}

export function heroEntrance(selectors: HeroEntranceSelectors = {}) {
  const {
    eyebrow = '.hero-eyebrow',
    title   = '.hero-title',
    sub     = '.hero-sub',
    actions = '.hero-actions',
    scroll  = '.hero-scroll',
  } = selectors;

  const tl = gsap.timeline();

  tl.from(eyebrow, { opacity: 0, y: 16, duration: DURATION.slow,  ease: EASE.enter, delay: 0.20 })
    .from(title,   { opacity: 0, y: 24, duration: DURATION.xslow, ease: EASE.enter              }, '-=0.55')
    .from(sub,     { opacity: 0, y: 18, duration: DURATION.slow,  ease: EASE.enter              }, '-=0.55')
    .from(actions, { opacity: 0, y: 14, duration: DURATION.base,  ease: EASE.smooth             }, '-=0.45')
    .from(scroll,  { opacity: 0,        duration: DURATION.slow,  ease: EASE.subtle             }, '-=0.20');

  return tl;
}
