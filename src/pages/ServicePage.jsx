import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Check, ShoppingCart, MessageCircle } from 'lucide-react';
import { categorias } from '../data/services';
import { useQuoteCart } from '../context/QuoteCartContext';
import { useWhatsAppLink } from '../hooks/useWhatsAppLink';
import { getAccent } from '../components/catalog/categoryAccents';

export function ServicePage() {
  const { id } = useParams();
  const { addItem, isInCart } = useQuoteCart();
  const { getServiceLink } = useWhatsAppLink();

  let service = null;

  for (const cat of categorias) {
    const index = parseInt(id.split('-').pop());
    const catId = id.replace(`-${index}`, '');
    if (cat.id === catId && cat.itens[index] !== undefined) {
      const item = cat.itens[index];
      service = {
        id, nome: item.nome, categoria: cat.titulo,
        categoryId: cat.id, descricao: item.descricao,
        gancho: cat.gancho, cta: cat.cta
      };
      break;
    }
  }

  useEffect(() => {
    if (service) {
      document.title = `${service.nome} | Nexa Soluções & Negócios`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const desc = `${service.nome} - ${service.descricao.slice(0, 150)}... Nexa Soluções & Negócios em Camaçari, BA.`;
        metaDesc.setAttribute('content', desc);
      }
    }
    return () => {
      document.title = 'Nexa Soluções & Negócios | Soluções Digitais em Camaçari, BA';
    };
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Serviço não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">Voltar ao catálogo</Link>
        </div>
      </div>
    );
  }

  const accent = getAccent(service.categoryId);
  const inCart = isInCart(service.id);

  return (
    <div className="min-h-screen bg-surface">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] glow-spot opacity-15" style={{ backgroundColor: `${accent}05` }} />
      </div>
      <div className="absolute inset-0 bg-grid-dense opacity-8 pointer-events-none" />

      <div className="relative mx-auto max-w-xl px-5 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          to={`/categoria/${service.categoryId}`}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          {service.categoria}
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
          {service.nome}
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          {service.descricao}
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => addItem(service)}
            disabled={inCart}
            className={`w-full flex items-center justify-center gap-2.5 h-11 rounded-xl text-sm font-semibold transition-all duration-300 ${
              inCart
                ? 'glass text-primary border border-primary/10 cursor-default'
                : 'active:scale-[0.97]'
            }`}
            style={!inCart ? {
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: '#e8eaf0',
              border: '1px solid rgba(255,255,255,0.06)'
            } : undefined}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                <span className="data-badge">ADICIONADO</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="data-badge">{service.cta || 'SOLICITE SEU ORÇAMENTO'}</span>
              </>
            )}
          </button>
          <a
            href={getServiceLink(service.nome)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 h-11 rounded-xl glass hover:bg-white/[0.03] text-white font-semibold text-sm transition-all duration-300 border border-white/[0.04]"
          >
            <MessageCircle className="w-4 h-4 text-text-muted" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
