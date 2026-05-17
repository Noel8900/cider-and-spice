// Reusable skeleton primitive — pulse animation, matches glass card material
// Used as building block for all page-specific skeletons

interface SkeletonProps {
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const roundedMap = {
  none: '',
  sm:   'rounded',
  md:   'rounded-sm',
  lg:   'rounded',
  xl:   'rounded',
  full: 'rounded',
};

export default function Skeleton({ className = '', rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/10 ${roundedMap[rounded]} ${className}`}
      aria-hidden="true"
    />
  );
}
