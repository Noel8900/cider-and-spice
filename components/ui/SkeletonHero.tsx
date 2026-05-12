// Used while homepage data (stats, trust badges) loads from NoCodeBackend
import Skeleton from './Skeleton';

export default function SkeletonHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-[#1C1209]">
      <div className="max-w-4xl mx-auto text-center space-y-8 w-full">

        {/* Badge pill */}
        <div className="flex justify-center">
          <Skeleton className="h-7 w-48" rounded="full" />
        </div>

        {/* Headline — two lines */}
        <div className="space-y-3">
          <Skeleton className="h-14 w-3/4 mx-auto" rounded="lg" />
          <Skeleton className="h-14 w-1/2 mx-auto" rounded="lg" />
        </div>

        {/* Subheadline */}
        <div className="space-y-2 max-w-xl mx-auto">
          <Skeleton className="h-5 w-full" rounded="md" />
          <Skeleton className="h-5 w-5/6 mx-auto" rounded="md" />
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-10">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 text-center">
              <Skeleton className="h-9 w-16 mx-auto" rounded="md" />
              <Skeleton className="h-3 w-20 mx-auto" rounded="md" />
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-14 w-44" rounded="lg" />
          <Skeleton className="h-14 w-36" rounded="lg" />
        </div>
      </div>
    </section>
  );
}
