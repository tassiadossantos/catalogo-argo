import { categorias } from '../../data/services';
import { getCategoryIcon } from './categoryIcons';

export function CategoryFilter({ activeCategory, onCategoryChange }) {
  const handleClick = (catId) => {
    onCategoryChange(catId);
    if (catId === 'todos') {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById(`cat-${catId}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none sm:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none sm:hidden" />

      <div className="overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
        <div className="flex gap-2.5 min-w-max py-1">
          <button
            onClick={() => handleClick('todos')}
            className={`inline-flex items-center h-10 px-5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === 'todos'
                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1] hover:text-white'
            }`}
          >
            Todos
          </button>
          {categorias
            .sort((a, b) => a.prioridade - b.prioridade)
            .map((cat) => {
              const Icon = getCategoryIcon(cat.id);
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleClick(cat.id)}
                  className={`inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-black shadow-lg shadow-primary/20'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.tituloCurto || cat.titulo}</span>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
