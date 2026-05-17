// Used on /vendors while form config or prefill data loads
import Skeleton from './Skeleton';

export default function SkeletonForm() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-6 space-y-8">

      {/* Header — eyebrow + headline */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-px w-8" rounded="none" />
          <Skeleton className="h-3 w-28" rounded="none" />
        </div>
        <Skeleton className="h-14 w-64 mx-auto" rounded="none" />
        <Skeleton className="h-5 w-80 mx-auto" rounded="none" />
      </div>

      {/* Two-column field rows */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" rounded="none" />
            <Skeleton className="h-14 w-full" rounded="none" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" rounded="none" />
            <Skeleton className="h-14 w-full" rounded="none" />
          </div>
        </div>
      ))}

      {/* Full-width select fields */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-28" rounded="none" />
          <Skeleton className="h-14 w-full" rounded="none" />
        </div>
      ))}

      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-36" rounded="none" />
        <Skeleton className="h-32 w-full" rounded="none" />
      </div>

      {/* Submit button */}
      <Skeleton className="h-14 w-full" rounded="none" />
    </div>
  );
}
