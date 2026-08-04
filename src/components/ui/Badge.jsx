export function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-white/5 text-slate-400',
    success: 'bg-primary/10 text-primary',
    muted: 'bg-white/5 text-slate-500'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
