export function SectionTitle({ title, subtitle, highlight, className = '' }) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      {highlight && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="data-badge text-primary">{highlight}</span>
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
