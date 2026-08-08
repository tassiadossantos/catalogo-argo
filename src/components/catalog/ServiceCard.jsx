import { Check, ShoppingCart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { useWhatsAppLink } from '../../hooks/useWhatsAppLink';
import { getServiceIcon } from './categoryIcons';
import { getAccent } from './categoryAccents';
import { categorias } from '../../data/services';

export function ServiceCard({ service, categoryId }) {
  const { addItem, isInCart } = useQuoteCart();
  const { getServiceLink } = useWhatsAppLink();
  const Icon = getServiceIcon(service.nome);
  const inCart = isInCart(service.id);
  const accent = getAccent(categoryId);
  const category = categorias.find((c) => c.id === categoryId);
  const categoryTitle = category ? category.titulo : categoryId;

  return (
    <article
      className="group relative rounded-2xl overflow-hidden holo-border hover-lift"
      style={{ '--card-accent': accent }}
    >
      <div className="relative glass rounded-2xl h-full flex flex-col group-hover:border-white/[0.06] transition-all duration-500">
        <div
          className="h-[1px] w-full opacity-20 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
        />

        <div className="p-6 pb-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <Link
              to={`/servico/${service.id}`}
              className="flex items-start gap-4 flex-1 min-w-0 group/link"
              aria-label={`Ver detalhes de ${service.nome}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(92,171,235,0.08)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${accent}12`
                }}
              >
                <Icon className="w-6 h-6 transition-colors duration-300" style={{ color: accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-primary-light transition-colors duration-300">
                  {service.nome}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <span className="data-badge" style={{ color: accent }}>VER DETALHES</span>
                  <ArrowUpRight className="w-3 h-3" style={{ color: accent }} />
                </div>
              </div>
            </Link>
          </div>

          <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1 line-clamp-3 group-hover:text-text-secondary transition-colors duration-300">
            {service.descricao}
          </p>
        </div>

        <div className="px-6 pb-6 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(service);
            }}
            disabled={inCart}
            className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-xs font-semibold transition-all duration-300 tracking-wide ${
              inCart
                ? 'glass text-primary border border-primary/10'
                : 'text-[#030308] hover:brightness-110 active:scale-[0.97]'
            }`}
            style={!inCart ? {
              backgroundColor: accent,
              boxShadow: `0 4px 20px ${accent}15`
            } : undefined}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="data-badge">ADICIONADO</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="data-badge">ADICIONAR</span>
              </>
            )}
          </button>
          <a
            href={getServiceLink(service.nome, categoryTitle)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-10 h-10 rounded-xl glass hover:bg-white/[0.03] text-text-muted hover:text-white transition-all duration-300"
            aria-label={`Contatar sobre ${service.nome}`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
