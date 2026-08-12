import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, MessageCircle } from 'lucide-react';
import { brands } from '../data/brands';
import { categorias } from '../data/services';
import { getCategoryIcon, getServiceIcon } from '../components/catalog/categoryIcons';
import { getAccent } from '../components/catalog/categoryAccents';
import { useQuoteCart } from '../context/QuoteCartContext';

export function BrandPage() {
  const { brandSlug } = useParams();
  const brand = brands.find((b) => b.slug === brandSlug);
  const { addItem, isInCart } = useQuoteCart();

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Marca não encontrada</h1>
          <Link to="/" className="text-primary hover:underline">Voltar ao catálogo</Link>
        </div>
      </div>
    );
  }

  const brandCategories = brand.categoriaIds
    .map((id) => categorias.find((c) => c.id === id))
    .filter(Boolean);

  const firstCat = brandCategories[0];
  const accent = getAccent(firstCat.id);

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

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{brand.nome}</h1>
          <p className="text-text-muted text-sm">
            {brandCategories.length > 1
              ? `${brandCategories.length} categorias · ${brandCategories.reduce((sum, c) => sum + c.itens.length, 0)} serviços`
              : `${brandCategories[0].itens.length} serviços`
            }
          </p>
        </div>

        {brandCategories.map((cat) => {
          const CatIcon = getCategoryIcon(cat.id);
          const catAccent = getAccent(cat.id);

          return (
            <section key={cat.id} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${catAccent}08`,
                    border: `1px solid ${catAccent}20`
                  }}
                >
                  <CatIcon className="w-5 h-5" style={{ color: catAccent }} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">{cat.titulo}</h2>
                  <p className="text-xs text-text-muted">{cat.itens.length} serviços</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
                {cat.itens.map((item, index) => {
                  const serviceId = `${cat.id}-${index}`;
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
                                backgroundColor: `${catAccent}08`,
                                border: `1px solid ${catAccent}20`
                              }}
                            >
                              <ServiceIcon className="w-6 h-6 transition-colors duration-300" style={{ color: catAccent }} />
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
                            onClick={() => addItem({ id: serviceId, nome: item.nome, categoria: cat.titulo })}
                            disabled={inCart}
                            className={`flex-1 flex items-center justify-center gap-2 h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                              inCart
                                ? 'glass text-primary border border-primary/10'
                                : 'text-[#030308] hover:brightness-110 active:scale-[0.97]'
                            }`}
                            style={!inCart ? {
                              backgroundColor: catAccent,
                              boxShadow: `0 4px 20px ${catAccent}15`
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
