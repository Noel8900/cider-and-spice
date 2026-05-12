// Used on admin dashboard stats bar and homepage stat row
import Skeleton from './Skeleton';

interface SkeletonStatsProps {
  count?: number;
}

export default function SkeletonStats({ count = 3 }: SkeletonStatsProps) {
  return (
    <div
      className="grid gap-4 max-w-lg"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#F5ECD7]/10 bg-white/5 p-4 text-center space-y-2"
        >
          <Skeleton className="h-8 w-12 mx-auto" rounded="md" />
          <Skeleton className="h-3 w-16 mx-auto" rounded="md" />
        </div>
      ))}
    </div>
  );
}
