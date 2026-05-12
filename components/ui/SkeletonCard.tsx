// Matches GlassCard layout — used on features, vendor spotlight, cider club pages
import Skeleton from './Skeleton';

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#F5ECD7]/10 bg-white/5 p-8 space-y-4">
      {/* Icon placeholder */}
      <Skeleton className="h-10 w-10" rounded="lg" />
      {/* Title */}
      <Skeleton className="h-6 w-2/3" rounded="md" />
      {/* Body text lines */}
      <Skeleton className="h-4 w-full" rounded="md" />
      <Skeleton className="h-4 w-5/6" rounded="md" />
      <Skeleton className="h-4 w-4/6" rounded="md" />
      {/* CTA link */}
      <Skeleton className="h-4 w-24 mt-2" rounded="md" />
    </div>
  );
}
