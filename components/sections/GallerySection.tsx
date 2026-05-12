// Responsive photo gallery using Next.js Image.
// 3-col grid on desktop → 2-col tablet → 1-col mobile.
// Hover: subtle scale lift + dark overlay.
// CLAUDE.md: tenant-vision images show content disclaimer.

import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

interface GalleryImage {
  src: string;
  alt: string;
  disclaimer?: boolean; // true = fictitious tenant concept, not confirmed
}

const images: GalleryImage[] = [
  {
    src: '/images/cider-spice-gallery-aerial-outdoor-exterior-collage-vision-image.png',
    alt: 'Aerial exterior collage — Cider & Spice concept vision',
  },
  {
    src: '/images/cider-spice-interior-two-level-open-kitchen-concept-rendering.png',
    alt: 'Two-level open kitchen interior concept rendering',
  },
  {
    src: '/images/cider-spice-concept-overhead-stage-full-crowd-concept-rendering.png',
    alt: 'Overhead view of stage and crowd concept rendering',
  },
  {
    src: '/images/cider-spice-bar-craft-cider-tap-pour-concept-rendering.png',
    alt: 'Craft cider tap pour at the bar concept rendering',
  },
  {
    src: '/images/cider-spice-outdoor-indoor-patio-shade-sails-concept-rendering.png',
    alt: 'Outdoor-indoor patio with shade sails concept rendering',
  },
  {
    src: '/images/cider-spice-concept-indoor-mezzanine-flow-concept-rendering.png',
    alt: 'Indoor mezzanine flow concept rendering',
  },
];

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-24 px-6 bg-[#1C1209]"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="gallery-heading"
          badge="The Space"
          title="A Vision in the Making"
          subtitle="Concept renderings of the Cider & Spice food hall — opening Q1–Q2 2027 in downtown Las Cruces."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map(({ src, alt, disclaimer }) => (
            <div
              key={src}
              className="group relative overflow-hidden rounded-2xl
                         aspect-[4/3] bg-white/5 border border-[#F5ECD7]/10"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 bg-[#1C1209]/40 opacity-0
                           group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Disclaimer badge for tenant-vision images */}
              {disclaimer && (
                <span
                  className="absolute bottom-3 left-3 rounded-full bg-black/60
                             px-3 py-1 text-[10px] font-sans font-semibold
                             text-[#F5ECD7]/70 backdrop-blur-sm"
                >
                  Concept · Not a confirmed tenant
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Global disclaimer */}
        <p
          className="mt-6 text-center font-sans text-xs text-[#F5ECD7]"
          style={{ opacity: 0.35 }}
        >
          All images are architectural concept renderings for illustration purposes only.
          Vendor brands, pricing, and layouts are subject to change.
        </p>
      </div>
    </section>
  );
}
