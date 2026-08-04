import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ShoppingCart, MessageCircle } from 'lucide-react';
import { categorias } from '../data/services';
import { getCategoryIcon, getServiceIcon } from '../components/catalog/categoryIcons';
import { getAccent } from '../components/catalog/categoryAccents';
import { useQuoteCart } from '../context/QuoteCartContext';

export function CategoryPage() {
  const { id } = useParams();
  const category = categorias.find((c) => c.id === id);
  const { addItem, isInCart } = useQuoteCart();

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Categoria não encontrada</h1>
          <Link to="/" className="text-primary hover:underline">Voltar ao catálogo</Link>
        </div>
      </div>
    );
  }

  const accent = getAccent(category.id);

  const generateWhatsAppLink = (serviceName) => {
    const message = `Olá! Gostaria de solicitar um orçamento para: ${serviceName}`;
    return `https://wa.me/5571996171605?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[250px] sm:w-[600px] sm:h-[350px] lg:w-[900px] lg:h-[500px] glow-spot opacity-15" style={{ backgroundColor: `${accent}05` }} />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] glow-spot opacity-10 bg-accent/[0.01]" />
      </div>
      <div className="absolute inset-0 bg-grid-dense opacity-8 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Voltar ao catálogo
        </Link>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {category.itens.map((item, index) => {
            const serviceId = `${category.id}-${index}`;
            const ServiceIcon = getServiceIcon(item.nome);
            const inCart = isInCart(serviceId);

            return (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden holo-border hover-lift"
              >
                <div className="relative glass rounded-2xl h-full flex flex-col border border-white/[0.04] group-hover:border-white/[0.08] transition-all duration-500">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                        style={{
                          backgroundColor: `${accent}08`,
                          border: `1px solid ${accent}20`
                        }}
                      >
                        <ServiceIcon className="w-6 h-6 transition-colors duration-300" style={{ color: accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-base leading-snug">
                          {item.nome}
                        </h3>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                      {item.descricao}
                    </p>
                  </div>

                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center gap-2">
                    <button
                      onClick={() => addItem({ id: serviceId, nome: item.nome, categoria: category.titulo })}
                      disabled={inCart}
                      className={`flex-1 flex items-center justify-center gap-2 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                        inCart
                          ? 'glass text-primary border border-primary/10'
                          : 'text-[#030308] hover:brightness-110 active:scale-[0.97]'
                      }`}
                      style={!inCart ? {
                        backgroundColor: accent,
                        boxShadow: `0 4px 20px ${accent}15`
                      } : undefined}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="hidden sm:inline">{inCart ? 'ADICIONADO' : 'SOLICITAR ORÇAMENTO'}</span>
                      <span className="sm:hidden">{inCart ? 'ADICIONADO' : 'ORÇAMENTO'}</span>
                    </button>
                    <a
                      href={generateWhatsAppLink(item.nome)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-xl glass hover:bg-white/[0.03] text-text-muted hover:text-white transition-all duration-300"
                      aria-label={`Contatar sobre ${item.nome}`}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other categories */}
        <div className="mt-12">
          <div className="h-px bg-white/[0.03] mb-6" />
          <h3 className="data-badge text-text-muted mb-4 text-center">OUTRAS CATEGORIAS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger">
            {categorias
              .filter((c) => c.id !== category.id)
              .sort((a, b) => a.prioridade - b.prioridade)
              .map((cat) => {
                const CatIcon = getCategoryIcon(cat.id);
                const catAccent = getAccent(cat.id);
                return (
                  <Link
                    key={cat.id}
                    to={`/categoria/${cat.id}`}
                    className="group flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/[0.03] transition-all duration-300 holo-border border border-white/[0.04] hover:border-white/[0.08]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${catAccent}06`, border: `1px solid ${catAccent}0a` }}
                    >
                      <CatIcon className="w-5 h-5" style={{ color: catAccent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors duration-300">{cat.titulo}</p>
                      <p className="text-xs text-text-muted">{cat.itens.length} serviços</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
