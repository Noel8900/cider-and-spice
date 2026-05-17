// Used while homepage data (stats, trust badges) loads from NoCodeBackend
import Skeleton from './Skeleton';

export default function SkeletonHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-[#1C1209]">
      <div className="max-w-4xl mx-auto text-center space-y-8 w-full">

        {/* Eyebrow rule + label */}
        <div className="flex justify-center items-center gap-3">
          <Skeleton className="h-px w-8" rounded="none" />
          <Skeleton className="h-3 w-48" rounded="none" />
        </div>

        {/* Headline — two lines */}
        <div className="space-y-3">
          <Skeleton className="h-16 w-3/4 mx-auto" rounded="none" />
          <Skeleton className="h-16 w-1/2 mx-auto" rounded="none" />
        </div>

        {/* Subheadline */}
        <div className="space-y-2 max-w-xl mx-auto">
          <Skeleton className="h-5 w-full" rounded="none" />
          <Skeleton className="h-5 w-5/6 mx-auto" rounded="none" />
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 justify-center">
          <Skeleton className="h-14 w-44" rounded="none" />
          <Skeleton className="h-14 w-36" rounded="none" />
          <Skeleton className="h-14 w-44" rounded="none" />
        </div>

        {/* Flat badges */}
        <div className="flex gap-2 justify-center flex-wrap">
          <Skeleton className="h-9 w-36" rounded="none" />
          <Skeleton className="h-9 w-32" rounded="none" />
          <Skeleton className="h-9 w-48" rounded="none" />
        </div>
      </div>
    </section>
  );
}
