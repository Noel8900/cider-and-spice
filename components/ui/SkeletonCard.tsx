// Matches GlassCard layout — used on features, vendor spotlight, cider club pages
import Skeleton from './Skeleton';

export default function SkeletonCard() {
  return (
    <div className="border border-cream/[0.07] bg-white/[0.02] p-8 space-y-4">
      {/* Glyph placeholder */}
      <Skeleton className="h-8 w-8" rounded="none" />
      {/* Title */}
      <Skeleton className="h-6 w-2/3" rounded="none" />
      {/* Body text lines */}
      <Skeleton className="h-4 w-full" rounded="none" />
      <Skeleton className="h-4 w-5/6" rounded="none" />
      <Skeleton className="h-4 w-4/6" rounded="none" />
      {/* CTA link */}
      <Skeleton className="h-3 w-24 mt-2" rounded="none" />
    </div>
  );
}
