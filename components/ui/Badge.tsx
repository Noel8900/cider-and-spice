interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ember' | 'grove' | 'muted' | 'luxury';
}

const variants = {
  ember:   'text-ember border-ember/30 bg-ember/10',
  grove:   'text-grove border-grove/30 bg-grove/10',
  muted:   'text-cream/50 border-cream/[0.15] bg-white/5',
  luxury:  'text-cream/50 border-cream/20',
};

export default function Badge({ children, variant = 'ember' }: BadgeProps) {
  return (
    <span className={`inline-block px-4 py-1.5 font-label text-[9px] tracking-[0.2em]
                      uppercase border ${variants[variant]}`}>
      {children}
    </span>
  );
}
