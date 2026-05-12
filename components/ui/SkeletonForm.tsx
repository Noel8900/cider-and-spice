// Used on /vendors while form config or prefill data loads
import Skeleton from './Skeleton';

export default function SkeletonForm() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 space-y-8">

      {/* Header */}
      <div className="text-center space-y-3">
        <Skeleton className="h-4 w-32 mx-auto" rounded="full" />
        <Skeleton className="h-12 w-64 mx-auto" rounded="lg" />
        <Skeleton className="h-5 w-80 mx-auto" rounded="md" />
      </div>

      {/* Two-column field rows */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" rounded="md" />
            <Skeleton className="h-12 w-full" rounded="xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" rounded="md" />
            <Skeleton className="h-12 w-full" rounded="xl" />
          </div>
        </div>
      ))}

      {/* Full-width select fields */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" rounded="md" />
          <Skeleton className="h-12 w-full" rounded="xl" />
        </div>
      ))}

      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-36" rounded="md" />
        <Skeleton className="h-28 w-full" rounded="xl" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-14 w-full" rounded="xl" />
    </div>
  );
}
