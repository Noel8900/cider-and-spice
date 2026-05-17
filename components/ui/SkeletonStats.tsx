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
          className="border border-cream/[0.07] bg-white/[0.02] p-6 text-center space-y-2"
        >
          <Skeleton className="h-10 w-16 mx-auto" rounded="none" />
          <Skeleton className="h-3 w-20 mx-auto" rounded="none" />
        </div>
      ))}
    </div>
  );
}
