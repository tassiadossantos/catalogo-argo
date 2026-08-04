import { getCategoryIcon } from './categoryIcons';
import { getAccent } from './categoryAccents';
import { ServiceCard } from './ServiceCard';

export function CategorySection({ category, services }) {
  const Icon = getCategoryIcon(category.id);
  const accent = getAccent(category.id);

  return (
    <section id={`cat-${category.id}`} className="scroll-mt-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] sm:w-[500px] sm:h-[180px] glow-spot opacity-20 pointer-events-none"
        style={{ backgroundColor: `${accent}04` }}
      />

      <div className="relative px-4 pt-16 pb-12 sm:px-6">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-500"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: `1px solid ${accent}10`,
              boxShadow: `0 8px 24px ${accent}06`
            }}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: accent }} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {category.titulo}
            </h2>
          </div>
        </div>

        <p className="text-text-muted text-sm sm:ml-16 max-w-2xl mb-10 leading-relaxed">
          {category.subtexto}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 stagger">
          {services.map((service, index) => (
            <ServiceCard
              key={`${category.id}-${index}`}
              service={service}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
