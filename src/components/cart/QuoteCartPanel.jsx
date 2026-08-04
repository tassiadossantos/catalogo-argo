import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { useWhatsAppLink } from '../../hooks/useWhatsAppLink';
import { getAccent } from '../catalog/categoryAccents';

function extractCategoryId(itemId) {
  const parts = itemId.split('-');
  parts.pop();
  return parts.join('-');
}

export function QuoteCartPanel({ isOpen, onClose }) {
  const { items, removeItem, clearCart, count } = useQuoteCart();
  const { getCartLink } = useWhatsAppLink();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="fixed top-0 right-0 h-full w-full max-w-md glass-strong z-50 border-l border-white/[0.04] flex flex-col animate-slide-up"
        role="dialog"
        aria-label="Carrinho de orçamento"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-text-muted" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Seu Orçamento</h2>
              {count > 0 && (
                <p className="data-badge text-text-muted">
                  {count} {count === 1 ? 'serviço' : 'serviços'}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl glass hover:bg-white/[0.03] transition-all duration-300"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-5">
                <ShoppingBag className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">Carrinho vazio</h3>
              <p className="text-text-muted text-sm max-w-[240px] leading-relaxed">
                Adicione serviços clicando no botão de cada card.
              </p>
            </div>
          ) : (
            <ul className="space-y-2 stagger">
              {items.map((item) => {
                const accent = getAccent(extractCategoryId(item.id));
                return (
                  <li
                    key={item.id}
                    className="group flex items-center gap-3 p-4 glass rounded-xl hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${accent}08`, border: `1px solid ${accent}0c` }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}30` }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-white truncate">{item.nome}</p>
                      <p className="data-badge text-text-muted truncate mt-0.5">{item.categoria}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                      aria-label={`Remover ${item.nome}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/[0.03] space-y-3">
            <div className="flex items-center justify-between">
              <span className="data-badge text-text-muted">
                {count} {count === 1 ? 'item' : 'itens'}
              </span>
              <button
                onClick={clearCart}
                className="data-badge text-red-400 hover:text-red-300 transition-colors"
              >
                LIMPAR TUDO
              </button>
            </div>
            <a
              href={getCartLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-12 glass-strong rounded-xl hover:bg-white/[0.04] active:scale-[0.98] transition-all duration-300 text-sm text-white font-semibold border border-white/[0.06]"
            >
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="data-badge">ENVIAR PELO WHATSAPP</span>
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
