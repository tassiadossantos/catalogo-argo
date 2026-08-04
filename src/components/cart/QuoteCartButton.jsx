import { ShoppingCart } from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';

export function QuoteCartButton({ onClick }) {
  const { count } = useQuoteCart();

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
      aria-label={`Carrinho de orçamento: ${count} itens`}
    >
      <ShoppingCart className="w-5 h-5 text-white" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-0.5 bg-primary text-black text-[10px] font-bold rounded-full">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
