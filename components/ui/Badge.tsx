// Visual rhyme anchor — terracotta pill repeats across hero, cards, nav, forms.
// Same shape language used everywhere = cohesion without repetition.

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ember' | 'grove' | 'muted';
}

const variants = {
  ember: 'text-ember border-ember/30 bg-ember/10',
  grove: 'text-grove border-grove/30 bg-grove/10',
  muted: 'text-cream/50 border-cream/[0.15] bg-white/5',
};

export default function Badge({ children, variant = 'ember' }: BadgeProps) {
  return (
    <span className={`inline-block px-4 py-1.5 text-xs font-semibold tracking-widest
                      uppercase border rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
}
