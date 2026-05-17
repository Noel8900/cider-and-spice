import Link from 'next/link';
import type { ReactNode } from 'react';

interface CorpButtonProps {
  variant?:   'primary' | 'ghost' | 'outline';
  size?:      'sm' | 'md' | 'lg';
  href?:      string;
  type?:      'button' | 'submit' | 'reset';
  disabled?:  boolean;
  loading?:   boolean;
  className?: string;
  children:   ReactNode;
  onClick?:   () => void;
  external?:  boolean;
}

const variants = {
  primary: 'bg-corp-gold text-corp-ink hover:bg-corp-gold-light border border-corp-gold hover:border-corp-gold-light',
  ghost:   'bg-transparent text-corp-platinum border border-corp-platinum/25 hover:border-corp-gold hover:text-corp-gold',
  outline: 'bg-transparent text-corp-gold border border-corp-gold/50 hover:bg-corp-gold/10 hover:border-corp-gold',
};

const sizes = {
  sm: 'px-5 py-2 text-xs tracking-widest',
  md: 'px-7 py-3 text-xs tracking-widest',
  lg: 'px-9 py-4 text-sm tracking-widest',
};

export default function CorpButton({
  variant   = 'primary',
  size      = 'md',
  href,
  type      = 'button',
  disabled  = false,
  loading   = false,
  className = '',
  children,
  onClick,
  external,
}: CorpButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-label uppercase ' +
    'rounded-none transition-all duration-300 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corp-gold/50 ' +
    'disabled:opacity-50 disabled:pointer-events-none';

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={cls}>
      {loading && (
        <span className="h-3 w-3 rounded-full border-2 border-current border-r-transparent animate-spin" />
      )}
      {children}
    </button>
  );
}
