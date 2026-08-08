import { MessageCircle } from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';
import { useWhatsAppLink } from '../../hooks/useWhatsAppLink';

export function WhatsAppFloatingButton({ hidden = false }) {
  const { count } = useQuoteCart();
  const { getCartLink } = useWhatsAppLink();

  if (count === 0 || hidden) return null;

  return (
    <a
      href={getCartLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 h-14 px-6 glass-strong rounded-xl hover:bg-white/[0.04] active:scale-[0.95] transition-all duration-300 font-semibold text-sm text-white border border-white/[0.06]"
      style={{ boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.04)' }}
      aria-label={`Enviar ${count} itens por WhatsApp`}
    >
      <MessageCircle className="w-5 h-5 text-primary" />
      <span className="hidden sm:inline data-badge">ENVIAR ORÇAMENTO</span>
      <span
        className="absolute -top-2 -right-2 min-w-[24px] h-6 flex items-center justify-center px-1 bg-primary text-[#030308] text-[10px] font-bold rounded-full"
        style={{ boxShadow: '0 0 12px rgba(92, 171, 235, 0.25)' }}
      >
        {count > 99 ? '99+' : count}
      </span>
    </a>
  );
}
