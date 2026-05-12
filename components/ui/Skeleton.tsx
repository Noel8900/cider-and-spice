// Reusable skeleton primitive — pulse animation, matches glass card material
// Used as building block for all page-specific skeletons

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const roundedMap = {
  sm:   'rounded',
  md:   'rounded-lg',
  lg:   'rounded-2xl',
  xl:   'rounded-xl',
  full: 'rounded-full',
};

export default function Skeleton({ className = '', rounded = 'md' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-white/10 ${roundedMap[rounded]} ${className}`}
      aria-hidden="true"
    />
  );
}
