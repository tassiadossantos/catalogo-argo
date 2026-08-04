import { useEffect, useState, useRef } from 'react';
import { categorias } from '../../data/services';
import { getCategoryIcon } from './categoryIcons';
import { getAccent } from './categoryAccents';

export function CategorySidebar({ activeCategory, onCategoryChange }) {
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll('[id^="cat-"]');
    if (!sections.length) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id.replace('cat-', ''));
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((section) => observerRef.current.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  const currentActive = activeCategory === 'todos' ? 'todos' : (activeCategory || activeId);

  const handleClick = (catId) => {
    onCategoryChange(catId);
    const target = catId === 'todos' ? 'catalogo' : `cat-${catId}`;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sortedCats = categorias.sort((a, b) => a.prioridade - b.prioridade);

  return (
    <>
      <nav className="hidden lg:block sticky top-28 self-start w-48 shrink-0">
        <div className="glass rounded-2xl p-3 space-y-0.5">
          <button
            onClick={() => handleClick('todos')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 text-left ${
              currentActive === 'todos'
                ? 'bg-white/[0.04] text-white'
                : 'text-text-muted hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            Todos
          </button>

          <div className="h-px bg-white/[0.03] my-2" />

          {sortedCats.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const accent = getAccent(cat.id);
            const isActive = currentActive === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleClick(cat.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 text-left"
                style={isActive
                  ? { backgroundColor: `${accent}08`, color: accent, boxShadow: `inset 0 0 16px ${accent}06` }
                  : undefined
                }
              >
                <Icon
                  className="w-4 h-4 shrink-0 transition-colors duration-300"
                  style={!isActive ? { color: `${accent}50` } : undefined}
                />
                <span className={`truncate transition-colors duration-300 ${!isActive ? 'text-text-muted hover:text-white' : ''}`}>
                  {cat.tituloCurto || cat.titulo}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="lg:hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        <div className="overflow-x-auto scrollbar-hide -mx-5 px-5">
          <div className="flex gap-2 min-w-max py-1">
            <button
              onClick={() => handleClick('todos')}
              className={`inline-flex items-center h-9 px-4 rounded-xl text-xs font-semibold transition-all duration-300 tracking-wide ${
                currentActive === 'todos'
                  ? 'bg-white/[0.05] text-white'
                  : 'glass text-text-muted hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              TODOS
            </button>
            {sortedCats.map((cat) => {
              const Icon = getCategoryIcon(cat.id);
              const accent = getAccent(cat.id);
              const isActive = currentActive === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleClick(cat.id)}
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap tracking-wide"
                  style={isActive
                    ? { backgroundColor: `${accent}0c`, color: accent }
                    : { backgroundColor: 'rgba(255,255,255,0.015)', color: '#4a5068' }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.tituloCurto || cat.titulo}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
