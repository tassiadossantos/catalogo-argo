export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]';

  const variants = {
    primary: 'bg-primary text-black hover:brightness-110',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
    ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
    whatsapp: 'bg-primary text-black hover:brightness-110'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
