import { Check, ShoppingCart, Sparkles } from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { getAccent } from './categoryAccents';

const packageAccents = {
  'kit-presenca-digital': 'presenca-digital',
  'kit-comercio-local': 'comerciantes-autonomos',
  'kit-site-express': 'desenvolvimento-web',
  'kit-negocio-completo': 'marketing-digital'
};

export function PackageCard({ pack }) {
  const { addMultipleItems, isInCart } = useQuoteCart();
  const allInCart = pack.itens.every((item) => isInCart(item));
  const accent = getAccent(packageAccents[pack.id] || 'presenca-digital');

  const handleAdd = () => {
    const items = pack.itens.map((item, index) => ({
      id: `pack-${pack.id}-item-${index}`,
      nome: item,
      categoria: pack.titulo
    }));
    addMultipleItems(items);
  };

  return (
    <article className="group relative flex flex-col h-full rounded-2xl overflow-hidden holo-border hover-lift">
      <div className="relative glass rounded-2xl h-full flex flex-col p-6 group-hover:border-white/[0.06] transition-all duration-500">
        <div
          className="h-[1px] w-full mb-6 opacity-20 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }}
        />

        {pack.destaque && (
          <div className="absolute top-5 right-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[#030308] text-[10px] font-bold rounded-lg data-badge"
              style={{ backgroundColor: accent, boxShadow: `0 4px 16px ${accent}25` }}
            >
              <Sparkles className="w-3 h-3" />
              DESTAQUE
            </span>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-2">{pack.titulo}</h3>
          <p className="text-text-muted text-sm leading-relaxed">{pack.descricao}</p>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {pack.itens.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm">
              <div
                className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${accent}08`, border: `1px solid ${accent}10` }}
              >
                <Check className="w-3 h-3" style={{ color: accent }} />
              </div>
              <span className="text-text-secondary font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleAdd}
          disabled={allInCart}
          className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-semibold transition-all duration-300 tracking-wide ${
            allInCart ? 'cursor-default' : 'active:scale-[0.97]'
          }`}
          style={allInCart
            ? { backgroundColor: `${accent}06`, color: accent, border: `1px solid ${accent}10` }
            : pack.destaque
              ? { backgroundColor: accent, color: '#030308', boxShadow: `0 4px 20px ${accent}18` }
              : { backgroundColor: 'rgba(255,255,255,0.04)', color: '#e8eaf0', border: '1px solid rgba(255,255,255,0.06)' }
          }
        >
          {allInCart ? (
            <><Check className="w-4 h-4" /><span className="data-badge">NO ORÇAMENTO</span></>
          ) : (
            <><ShoppingCart className="w-4 h-4" /><span className="data-badge">ADICIONAR PACOTE</span></>
          )}
        </button>
      </div>
    </article>
  );
}

export function PackagesShowcase({ packages }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
      {packages.map((pack) => (
        <PackageCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
