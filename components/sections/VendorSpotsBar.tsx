'use client';
// VendorSpotsBar — urgency strip for the vendor application page.
// Shows remaining spots out of 13, animates fill bar on mount.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TOTAL_SPOTS  = 13;
const FILLED_SPOTS = 4;   // UPDATE this as applications come in
const OPEN_SPOTS   = TOTAL_SPOTS - FILLED_SPOTS;

export default function VendorSpotsBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.4, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const pct = Math.round((FILLED_SPOTS / TOTAL_SPOTS) * 100);

  return (
    <div className="border border-cream/[0.08] bg-white/[0.02] px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="font-label text-[9px] tracking-[0.25em] uppercase text-gold">
            Founding Cohort Spots
          </span>
          <span className="border border-ember/40 bg-ember/10 px-2.5 py-0.5
                            font-label text-[9px] tracking-[0.15em] uppercase text-ember">
            {OPEN_SPOTS} of {TOTAL_SPOTS} Open
          </span>
        </div>
        <span className="font-label text-[9px] tracking-[0.2em] uppercase text-cream/35">
          {FILLED_SPOTS} spot{FILLED_SPOTS !== 1 ? 's' : ''} reserved
        </span>
      </div>

      {/* Track */}
      <div className="h-px bg-cream/[0.08] relative overflow-visible">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 h-full"
          style={{ width: `${pct}%`, background: 'var(--color-ember, #c45d2a)' }}
          role="progressbar"
          aria-valuenow={FILLED_SPOTS}
          aria-valuemin={0}
          aria-valuemax={TOTAL_SPOTS}
          aria-label={`${FILLED_SPOTS} of ${TOTAL_SPOTS} vendor spots reserved`}
        />
      </div>

      <p className="mt-3 font-sans text-xs text-cream/30 leading-snug">
        We&apos;re curating a founding cohort of {TOTAL_SPOTS} distinctive food concepts.
        Once all spots are reserved, applications close until a stall becomes available.
      </p>
    </div>
  );
}
