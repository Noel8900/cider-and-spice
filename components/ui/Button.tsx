// Shared button/link component — single source of truth for CTA styling.
// Renders <Link> when href is provided, <button> otherwise.
// Variants: primary (filled ember), secondary (outlined), ghost (text-only).
// Sizes: sm, md (default), lg.

import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'bg-ember hover:bg-ember-hover text-white font-semibold rounded-xl transition-colors duration-200',
  secondary: 'border border-cream/20 text-cream hover:border-cream/50 font-semibold rounded-xl transition-all duration-200',
  ghost:     'text-cream/70 hover:text-ember hover:bg-white/5 font-medium rounded-lg transition-colors duration-200',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  href,
  className = '',
  children,
  onClick,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''} ${className}`.trim();

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
