import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Zap, Target, Coins } from 'lucide-react';
import { QuoteCartProvider } from './context/QuoteCartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingButton } from './components/layout/WhatsAppFloatingButton';
import { Hero } from './components/catalog/Hero';
import { PackagesShowcase } from './components/catalog/PackagesShowcase';
import { QuoteCartPanel } from './components/cart/QuoteCartPanel';
import { SectionTitle } from './components/ui/SectionTitle';
import { ServicePage } from './pages/ServicePage';
import { CategoryPage } from './pages/CategoryPage';
import { categorias, pacotes } from './data/services';
import { getCategoryIcon } from './components/catalog/categoryIcons';
import { getAccent } from './components/catalog/categoryAccents';

function CatalogPage() {
  const [cartOpen, setCartOpen] = useState(false);

  const sortedCategories = [...categorias].sort((a, b) => a.prioridade - b.prioridade);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        <Hero />

        <section id="catalogo" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              title="Explore nossos serviços"
              subtitle="Selecione uma categoria para ver todos os serviços disponíveis."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10 stagger" style={{ gridAutoRows: '1fr' }}>
              {sortedCategories.map((cat) => {
                const Icon = getCategoryIcon(cat.id);
                const accent = getAccent(cat.id);

                return (
                  <Link
                    key={cat.id}
                    to={`/categoria/${cat.id}`}
                    className="group relative rounded-2xl overflow-hidden holo-border hover-lift card-glow"
                    style={{ '--glow-color': accent }}
                  >
                    <div className="relative glass rounded-2xl h-full p-5 sm:p-6 lg:p-7 flex flex-col border border-white/[0.04] group-hover:border-white/[0.1] transition-all duration-500">
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                          style={{
                            backgroundColor: `${accent}08`,
                            border: `1px solid ${accent}20`
                          }}
                        >
                          <Icon className="w-7 h-7" style={{ color: accent }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg leading-snug group-hover:text-primary-light transition-colors duration-300">
                            {cat.titulo}
                          </h3>
                          <p className="text-sm text-text-muted mt-1">{cat.itens.length} serviços</p>
                        </div>
                      </div>

                      <p className="text-sm font-semibold mb-3" style={{ color: accent }}>
                        {cat.gancho}
                      </p>

                      <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-1">
                        {cat.subtexto}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pacotes" className="py-16 sm:py-20 bg-white/[0.005]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              highlight="Economize"
              title="Pacotes Mais Vendidos"
              subtitle="Combinações pensadas para resolver tudo de uma vez."
            />

            <PackagesShowcase packages={pacotes} />
          </div>
        </section>

        <section id="sobre" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {/* Quem somos */}
              <div className="text-center mb-16">
                <SectionTitle
                  title="Quem somos"
                  subtitle=""
                />
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mt-6">
                  A <strong className="text-white">Nexa Soluções & Negócios</strong> nasceu para eliminar a fragmentação que sufoca empreendedores. Hoje, um comerciante precisa de 5 a 8 fornecedores diferentes para resolver impressão, presença digital, automação e desenvolvimento — cada um com contrato, prazo e linguagem própria.
                </p>
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mt-4">
                  Unimos essas frentes em uma única operação integrada. <strong className="text-white">Um único contato. Uma única visão. Um único resultado:</strong> seu negócio funcionando com a eficiência que merece, sem a complexidade que não precisa.
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-10">
                  Simplifique.
                </h2>
              </div>

              {/* Números */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
                <div className="text-center p-5 rounded-2xl glass border border-white/[0.04]">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">87+</p>
                  <p className="text-text-muted text-xs sm:text-sm">Serviços disponíveis</p>
                </div>
                <div className="text-center p-5 rounded-2xl glass border border-white/[0.04]">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">11</p>
                  <p className="text-text-muted text-xs sm:text-sm">Áreas de atuação</p>
                </div>
                <div className="text-center p-5 rounded-2xl glass border border-white/[0.04]">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">24h</p>
                  <p className="text-text-muted text-xs sm:text-sm">Resposta rápida</p>
                </div>
                <div className="text-center p-5 rounded-2xl glass border border-white/[0.04]">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">100%</p>
                  <p className="text-text-muted text-xs sm:text-sm">Personalizado</p>
                </div>
              </div>

              {/* Valores */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
                <div className="p-6 rounded-2xl glass holo-border hover-lift border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">Agilidade</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Processos otimizados para entrega rápida. Sem burocracia, sem enrolação.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass holo-border hover-lift border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">Personalização</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Cada solução é adaptada à realidade do seu negócio. Nada de pacotes genéricos.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass holo-border hover-lift border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">Investimento Justo</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Qualidade profissional com preços acessíveis. Investimento que volta em resultado.
                  </p>
                </div>
              </div>

              {/* Diferenciais */}
              <div className="mb-16">
                <h3 className="text-center text-xs font-semibold tracking-widest uppercase text-text-secondary mb-8">Por que a Nexa é diferente</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm">Atendemos presencialmente em Camaçari e região</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm">Suporte pós-entrega incluído em todos os serviços</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm">Orçamento sem compromisso — só decide quando estiver satisfeito</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="https://wa.me/5571996171605?text=Olá! Gostaria de saber mais sobre a Nexa Soluções."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-[#030308] font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all duration-300"
                  style={{ boxShadow: '0 4px 24px rgba(0, 229, 160, 0.2)' }}
                >
                  Fale com a Nexa agora
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppFloatingButton />
      <QuoteCartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QuoteCartProvider>
        <div className="min-h-screen flex flex-col bg-[#030308]">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/categoria/:id" element={<CategoryPage />} />
            <Route path="/servico/:id" element={<ServicePage />} />
          </Routes>
        </div>
      </QuoteCartProvider>
    </BrowserRouter>
  );
}

export default App;
