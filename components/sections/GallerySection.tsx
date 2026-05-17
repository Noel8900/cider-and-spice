'use client';
// Gallery section — fixed:
//  1. id changed from "cider-bar" to "gallery" (was conflicting with CiderBarSection anchor)
//  2. Grid balanced: 1 hero (col-span-2) + 2 normal = row1 | 3+3 = rows 2-3. Clean 3-col layout.
//  3. First image gets priority prop for LCP.
//  4. Mobile captions always visible (not hover-only).
//  5. Lightbox modal for full-size viewing.
//  6. Stall images use aspect-[3/4] (portrait) — renders correctly without stretching.
//  7. loading="lazy" on all non-hero images.

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  disclaimer?: boolean;
  portrait?: boolean;   // true → aspect-[3/4], false → aspect-[4/3]
}

const images: GalleryImage[] = [
  {
    src:     '/images/cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png',
    alt:     'Aerial exterior collage — Cider & Spice concept vision',
    caption: 'Exterior & Streetscape',
  },
  {
    src:     '/images/cider-spice-interior-two-level-open-kitchen-concept-rendering.png',
    alt:     'Two-level open kitchen interior concept rendering',
    caption: 'Two-Level Open Kitchen',
  },
  {
    src:     '/images/cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png',
    alt:     'Overhead view of stage and crowd concept rendering',
    caption: 'Live Events Stage',
  },
  {
    src:     '/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png',
    alt:     'Craft cider tap pour at the bar concept rendering',
    caption: 'Craft Cider Bar',
  },
  {
    src:     '/images/cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png',
    alt:     'Outdoor-indoor patio with shade sails concept rendering',
    caption: 'Outdoor Patio & Shade Sails',
  },
  {
    src:     '/images/cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png',
    alt:     'Indoor mezzanine flow concept rendering',
    caption: 'Mezzanine Level',
  },
  {
    src:         '/images/cider-spice-tenant-vision-three-stall-row-vision-image.png',
    alt:         'Three vendor stalls side by side — illustrative tenant vision',
    caption:     'Vendor Stall Row',
    disclaimer:  true,
    portrait:    true,
  },
  {
    src:         '/images/cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png',
    alt:         'Sticky Stack Co. stall — illustrative tenant vision',
    caption:     'Sticky Stack Co.',
    disclaimer:  true,
    portrait:    true,
  },
  {
    src:         '/images/cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png',
    alt:         'Seoul Fire Chicken stall — illustrative tenant vision',
    caption:     'Seoul Fire Chicken',
    disclaimer:  true,
    portrait:    true,
  },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')       onClose();
      if (e.key === 'ArrowLeft')    onPrev();
      if (e.key === 'ArrowRight')   onNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${img.caption}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      {/* Container — stop propagation so clicking image doesn't close */}
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption bar */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div>
            <p className="font-label text-[10px] tracking-[0.25em] uppercase text-gold">
              {img.caption}
            </p>
            {img.disclaimer && (
              <p className="font-sans text-[10px] text-cream/40 mt-0.5">
                Illustrative concept · Not a confirmed tenant
              </p>
            )}
          </div>
          <p className="font-label text-[9px] tracking-[0.2em] uppercase text-cream/30">
            {index + 1} / {images.length}
          </p>
        </div>

        {/* Prev */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous image"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14
                     w-10 h-10 flex items-center justify-center
                     border border-cream/20 hover:border-gold/50 text-cream/50
                     hover:text-gold transition-all duration-300
                     max-lg:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14
                     w-10 h-10 flex items-center justify-center
                     border border-cream/20 hover:border-gold/50 text-cream/50
                     hover:text-gold transition-all duration-300
                     max-lg:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-12 right-0 w-9 h-9 flex items-center justify-center
                     border border-cream/20 hover:border-gold/50 text-cream/50
                     hover:text-gold transition-all duration-300"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {/* Mobile prev/next row */}
        <div className="flex justify-center gap-4 mt-5 lg:hidden">
          <button
            type="button" onClick={onPrev} aria-label="Previous image"
            className="w-10 h-10 flex items-center justify-center border border-cream/20
                       hover:border-gold/50 text-cream/50 hover:text-gold transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            type="button" onClick={onNext} aria-label="Next image"
            className="w-10 h-10 flex items-center justify-center border border-cream/20
                       hover:border-gold/50 text-cream/50 hover:text-gold transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage     = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + images.length) % images.length), []);
  const nextImage     = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % images.length), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gal-item', {
        opacity: 0, y: 32, duration: 0.9, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <section
        id="gallery"
        ref={ref}
        className="py-32 px-6 bg-bg"
        aria-labelledby="gallery-heading"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            id="gallery-heading"
            badge="The Space"
            title="A Vision in the Making"
            subtitle="Concept renderings of the Cider & Spice food hall — opening Q1–Q2 2027 in downtown Las Cruces."
          />

          {/*
            Grid layout (3-col desktop):
            Row 1: [hero col-span-2] [img 1]
            Row 2: [img 2] [img 3]   [img 4]
            Row 3: [img 5] [img 6]   [img 7] ← portrait stalls
            Totals: 1 hero + 8 normal = 9 images. No orphans.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/[0.06]">
            {images.map(({ src, alt, caption, disclaimer, portrait }, i) => {
              const isHero    = i === 0;
              const aspectCls = isHero
                ? 'aspect-[16/9]'
                : portrait
                  ? 'aspect-[3/4]'
                  : 'aspect-[4/3]';

              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => openLightbox(i)}
                  aria-label={`View full size: ${caption}`}
                  className={`gal-item group relative overflow-hidden bg-bg text-left
                              focus-visible:outline focus-visible:outline-2
                              focus-visible:outline-gold focus-visible:outline-offset-2
                              ${ isHero ? 'lg:col-span-2' : '' }
                              ${ aspectCls }`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={
                      isHero
                        ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
                        : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={isHero}
                    loading={isHero ? undefined : 'lazy'}
                  />

                  {/* Dark overlay */}
                  <div
                    className="absolute inset-0 bg-bg/40 opacity-0
                               group-hover:opacity-100 transition-opacity duration-400"
                    aria-hidden="true"
                  />

                  {/* Expand icon — desktop hover */}
                  <div
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center
                               border border-cream/30 bg-bg/60 opacity-0
                               group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </div>

                  {/*
                    Caption — always visible on mobile (translate-y-0 opacity-100),
                    hover-reveal on desktop.
                  */}
                  <div
                    className="absolute inset-x-0 bottom-0 p-4
                               bg-gradient-to-t from-bg/80 to-transparent
                               sm:translate-y-2 sm:opacity-0
                               group-hover:sm:opacity-100 group-hover:sm:translate-y-0
                               transition-all duration-400"
                  >
                    <p className="font-label text-[9px] tracking-[0.25em] uppercase text-gold mb-0.5">
                      {caption}
                    </p>
                    {disclaimer && (
                      <p className="font-sans text-[10px] text-cream/50">
                        Illustrative concept · Not a confirmed tenant
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Global disclaimer */}
          <p className="mt-6 text-center font-sans text-[11px] text-cream/30 leading-relaxed">
            All imagery represents architectural concept renderings for illustration purposes only.
            Vendor brands, pricing, and layouts are subject to change.
          </p>

          {/* Floor plan CTA */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="font-sans text-sm text-cream/45">
              Want to explore every zone, stall, and seat count in detail?
            </p>
            <Link
              href="/floor-plan/"
              className="flex items-center gap-3 border border-cream/20 px-8 py-4
                         font-label text-[10px] tracking-[0.2em] uppercase text-cream/55
                         hover:border-gold/50 hover:text-gold transition-all duration-300"
            >
              Explore the Interactive Floor Plan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
