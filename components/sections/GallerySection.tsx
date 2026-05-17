'use client';
// Luxury gallery — masonry-style variable heights, GSAP stagger reveal.
// LOCKED: 9 images — 6 concept renderings + 3 tenant-vision stalls.
// Refined disclaimer badges and overlay treatment.

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  disclaimer?: boolean;
}

const images: GalleryImage[] = [
  {
    src: '/images/cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png',
    alt: 'Aerial exterior collage — Cider & Spice concept vision',
    caption: 'Exterior & Streetscape',
  },
  {
    src: '/images/cider-spice-interior-two-level-open-kitchen-concept-rendering.png',
    alt: 'Two-level open kitchen interior concept rendering',
    caption: 'Two-Level Open Kitchen',
  },
  {
    src: '/images/cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png',
    alt: 'Overhead view of stage and crowd concept rendering',
    caption: 'Live Events Stage',
  },
  {
    src: '/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png',
    alt: 'Craft cider tap pour at the bar concept rendering',
    caption: 'Craft Cider Bar',
  },
  {
    src: '/images/cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png',
    alt: 'Outdoor-indoor patio with shade sails concept rendering',
    caption: 'Outdoor Patio & Shade Sails',
  },
  {
    src: '/images/cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png',
    alt: 'Indoor mezzanine flow concept rendering',
    caption: 'Mezzanine Level',
  },
  {
    src: '/images/cider-spice-tenant-vision-three-stall-row-vision-image.png',
    alt: 'Three vendor stalls side by side — illustrative tenant vision',
    caption: 'Vendor Stall Row',
    disclaimer: true,
  },
  {
    src: '/images/cider-spice-tenant-vision-sticky-stack-co-stall-vision-image.png',
    alt: 'Sticky Stack Co. stall — illustrative tenant vision',
    caption: 'Stall Concept',
    disclaimer: true,
  },
  {
    src: '/images/cider-spice-tenant-vision-seoul-fire-chicken-stall-vision-image.png',
    alt: 'Seoul Fire Chicken stall — illustrative tenant vision',
    caption: 'Stall Concept',
    disclaimer: true,
  },
];

export default function GallerySection() {
  const ref = useRef<HTMLElement>(null);

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
    <section
      id="cider-bar"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/[0.06]">
          {images.map(({ src, alt, caption, disclaimer }, i) => (
            <div
              key={src}
              className={`gal-item group relative overflow-hidden bg-bg
                          ${i === 0 ? 'lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes={i === 0
                  ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
                  : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark overlay on hover */}
              <div
                className="absolute inset-0 bg-bg/50 opacity-0
                           group-hover:opacity-100 transition-opacity duration-400"
                aria-hidden="true"
              />

              {/* Caption — reveals on hover */}
              <div
                className="absolute inset-x-0 bottom-0 p-5 translate-y-2
                           opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                           transition-all duration-400"
              >
                {caption && (
                  <p className="font-label text-[9px] tracking-[0.25em] uppercase text-gold mb-1">
                    {caption}
                  </p>
                )}
                {disclaimer && (
                  <p className="font-sans text-[10px] text-cream/50">
                    Illustrative concept · Not a confirmed tenant
                  </p>
                )}
              </div>
            </div>
          ))}
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
  );
}
