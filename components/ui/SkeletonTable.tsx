// Already used in admin — extracted here as reusable component
// Use on any page that renders tabular data from NoCodeBackend
import Skeleton from './Skeleton';

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export default function SkeletonTable({ rows = 5, cols = 6 }: SkeletonTableProps) {
  return (
    <div className="border border-cream/[0.08] overflow-hidden">
      {/* Header row */}
      <div
        className="grid gap-4 px-6 py-4 bg-white/[0.02] border-b border-cream/[0.08]"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="h-3 w-16" rounded="none" />
        ))}
      </div>

      {/* Data rows */}
      {[...Array(rows)].map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="grid gap-4 px-6 py-4 border-b border-cream/[0.05] last:border-0"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {[...Array(cols)].map((_, colIdx) => (
            <Skeleton
              key={colIdx}
              className={`h-4 ${colIdx === 0 ? 'w-24' : colIdx === cols - 1 ? 'w-16' : 'w-full'}`}
              rounded="none"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
