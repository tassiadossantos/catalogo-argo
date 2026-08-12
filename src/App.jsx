import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CheckCircle2, Clock3, Layers3, MessageCircle, ShieldCheck, Star, Store, Zap } from 'lucide-react';
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

const brandCategoryNames = {
  'trabalhos-academicos': 'ARGO Acadêmico',
  'curriculos-carreira': 'ARGO Carreira',
  'servicos-online-burocraticos': 'ARGO Documentos',
  'redacao-digitação-contratos': 'ARGO Documentos',
  'impressao-digitalizacao': 'ARGO Impressão',
  'presenca-digital': 'ARGO Digital',
  'comerciantes-autonomos': 'ARGO Digital',
  'desenvolvimento-web': 'ARGO Web & Tech',
  'informatica-suporte': 'ARGO Web & Tech',
  'personalizacao-impressa': 'ARGO Impressão',
  'festas-personalizados': 'ARGO Festas',
  'automacao-solucoes-digitais': 'ARGO Web & Tech',
  'bottons-personalizados': 'ARGO Bottons'
};

const howItWorks = [
  {
    icon: MessageCircle,
    title: 'Você chama a ARGO',
    text: 'Conte pelo WhatsApp ou presencialmente o que precisa resolver.'
  },
  {
    icon: Layers3,
    title: 'A gente organiza',
    text: 'Entendemos a demanda, indicamos o melhor caminho e reunimos os serviços certos.'
  },
  {
    icon: Clock3,
    title: 'Prazo na mão',
    text: 'Você recebe valor, prazo e próximos passos de forma clara antes da execução.'
  },
  {
    icon: CheckCircle2,
    title: 'Entrega explicada',
    text: 'O resultado chega revisado, pronto para uso e com orientação do que fazer depois.'
  }
];

const businessKitItems = [
  'Logo e identidade visual',
  'Cardápio, catálogo ou tabela digital',
  'Google Meu Negócio e WhatsApp Business',
  'Etiquetas, tags, cartões e QR codes'
];

const testimonials = [
  {
    quote: 'Chamei para resolver uma coisa e saí com tudo encaminhado. Foi rápido, claro e sem complicação.',
    author: 'Mariana Costa',
    role: 'Serviços documentais',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg?v=argo-pro'
  },
  {
    quote: 'A ARGO organizou minha presença digital e meus materiais no mesmo atendimento. Economizou tempo e evitou retrabalho.',
    author: 'Fernanda Lima',
    role: 'Empreendedora local',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg?v=argo-pro'
  },
  {
    quote: 'Gostei porque explicaram o que eu precisava levar, deram prazo e entregaram pronto para usar.',
    author: 'Roberto Almeida',
    role: 'Impressão e digitalização',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg?v=argo-pro'
  },
  {
    quote: 'Eu precisava de currículo, LinkedIn e carta de apresentação. A ARGO organizou tudo com uma linguagem profissional.',
    author: 'Camila Torres',
    role: 'Currículos e carreira',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg?v=argo-pro'
  },
  {
    quote: 'Meu cardápio digital saiu junto com QR Code e ajustes no WhatsApp Business. Foi tudo no mesmo fluxo.',
    author: 'Rafael Santos',
    role: 'Comércio local',
    photo: 'https://randomuser.me/api/portraits/men/75.jpg?v=argo-pro'
  },
  {
    quote: 'O atendimento foi paciente e direto. Eu não sabia mexer no portal, mas saí com a certidão resolvida.',
    author: 'Helena Martins',
    role: 'Serviços online',
    photo: 'https://randomuser.me/api/portraits/women/76.jpg?v=argo-pro'
  },
  {
    quote: 'Fiz etiquetas, cartões e arte para divulgação. O bom foi não precisar explicar minha marca para três fornecedores diferentes.',
    author: 'Juliana Rocha',
    role: 'Personalização impressa',
    photo: 'https://randomuser.me/api/portraits/women/79.jpg?v=argo-pro'
  },
  {
    quote: 'Meu TCC estava fora do padrão. A revisão deixou tudo organizado e pronto para enviar dentro do prazo.',
    author: 'Lucas Pereira',
    role: 'ARGO Acadêmico',
    photo: 'https://randomuser.me/api/portraits/men/36.jpg?v=argo-pro'
  },
  {
    quote: 'A página do meu negócio ficou clara, com botão para WhatsApp e informações certas. Já comecei a receber contatos melhores.',
    author: 'Bruno Carvalho',
    role: 'Desenvolvimento web',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg?v=argo-pro'
  },
  {
    quote: 'Resolveram backup, instalação e configuração de impressora. O escritório voltou a funcionar sem eu perder o dia inteiro.',
    author: 'Patrícia Nogueira',
    role: 'Informática e suporte',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg?v=argo-pro'
  },
  {
    quote: 'Pedi convites e tags para a festa. A entrega veio combinando e já pronta para imprimir e distribuir.',
    author: 'Aline Batista',
    role: 'Festas e personalizados',
    photo: 'https://randomuser.me/api/portraits/women/26.jpg?v=argo-pro'
  },
  {
    quote: 'Eu precisava automatizar orçamento e etiquetas. A ARGO entendeu o processo e entregou uma solução simples de usar.',
    author: 'Diego Menezes',
    role: 'Automação digital',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg?v=argo-pro'
  },
  {
    quote: 'Os bottons ficaram com acabamento bonito e a arte veio ajustada no tamanho certo. Facilitou muito para o evento.',
    author: 'Nathalia Ribeiro',
    role: 'Bottons personalizados',
    photo: 'https://randomuser.me/api/portraits/women/17.jpg?v=argo-pro'
  },
  {
    quote: 'Fiz contrato, impressão e envio digital no mesmo atendimento. Foi prático e evitou aquela correria de última hora.',
    author: 'Eduardo Ramos',
    role: 'Contratos e documentos',
    photo: 'https://randomuser.me/api/portraits/men/46.jpg?v=argo-pro'
  },
  {
    quote: 'Ajustaram meu catálogo com uma aparência mais profissional. Agora consigo apresentar meus produtos com muito mais segurança.',
    author: 'Simone Andrade',
    role: 'Catálogo digital',
    photo: 'https://randomuser.me/api/portraits/women/32.jpg?v=argo-pro'
  },
  {
    quote: 'Eu precisava regularizar arquivos e transformar tudo em PDF. A equipe deixou tudo organizado e fácil de encontrar.',
    author: 'Marcelo Vieira',
    role: 'Digitalização e arquivos',
    photo: 'https://randomuser.me/api/portraits/men/64.jpg?v=argo-pro'
  },
  {
    quote: 'Meu perfil no Google estava incompleto. Depois dos ajustes, os clientes passaram a achar horário, endereço e WhatsApp sem perguntar.',
    author: 'Renata Oliveira',
    role: 'Google Meu Negócio',
    photo: 'https://randomuser.me/api/portraits/women/50.jpg?v=argo-pro'
  },
  {
    quote: 'Recebi orientação clara antes de aprovar o serviço. Isso fez diferença porque eu sabia exatamente o que seria entregue.',
    author: 'Gustavo Martins',
    role: 'Atendimento consultivo',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg?v=argo-pro'
  },
  {
    quote: 'A identidade visual ficou coerente com meu negócio e já veio aplicada em materiais que eu realmente uso no dia a dia.',
    author: 'Priscila Moura',
    role: 'Identidade visual',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg?v=argo-pro'
  },
  {
    quote: 'O suporte resolveu meu problema sem enrolação e ainda deixou um passo a passo para eu não depender de ajuda toda hora.',
    author: 'Thiago Fernandes',
    role: 'Suporte técnico',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg?v=argo-pro'
  }
];

function CatalogPage() {
  const [cartOpen, setCartOpen] = useState(false);

  const sortedCategories = [...categorias].sort((a, b) => a.prioridade - b.prioridade);
  const testimonialMarqueeItems = [...testimonials, ...testimonials];

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        <Hero />

        <section id="catalogo" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              title="Soluções organizadas por categoria"
              subtitle="A marca é uma só. Por trás dela, a ARGO coordena documentos, impressão, digital e tecnologia para você resolver sem trocar de fornecedor."
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
                            {brandCategoryNames[cat.id] || cat.titulo}
                          </h3>
                          <p className="text-sm text-text-muted mt-1">{cat.titulo} · {cat.itens.length} serviços</p>
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

        <section id="como-funciona" className="py-16 sm:py-20 bg-white/[0.005]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              highlight="Sem burocracia"
              title="Como a ARGO resolve"
              subtitle="Uma jornada simples, com atendimento único, prazo claro e acompanhamento até a entrega."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="relative p-6 rounded-2xl glass border border-white/[0.04]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/[0.06] border border-primary/[0.12] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="data-badge text-text-muted">0{index + 1}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pacotes" className="py-16 sm:py-20 bg-white/[0.005]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              highlight="Seu tempo vale mais"
              title="Planos ARGO para resolver de uma vez"
              subtitle="Combinações para quem precisa sair do improviso e colocar documentos, presença digital e materiais em ordem."
            />

            <PackagesShowcase packages={pacotes} />
          </div>
        </section>

        <section id="negocios" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6">
                  <Store className="w-4 h-4 text-primary" />
                  <span className="data-badge text-primary">Pequenos negócios</span>
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
                  Kit Inicial para Pequenos Negócios
                </h2>
                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                  Para MEIs, comerciantes e autônomos que precisam parecer profissionais desde o primeiro contato. A ARGO reúne marca, materiais, presença digital e pontos de venda em uma entrega coordenada.
                </p>
              </div>

              <div className="rounded-2xl glass border border-white/[0.04] p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {businessKitItems.map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-text-secondary text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://wa.me/5571996171605?text=Olá! Quero montar um Kit Inicial para meu negócio com a ARGO."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-[#030308] font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all duration-300"
                >
                  Montar meu kit
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="prova-social" className="relative overflow-hidden py-16 sm:py-20 bg-white/[0.005]">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              highlight="Resolvido pela ARGO"
              title="Quem resolve com a gente sente a diferença."
              subtitle="Clientes que deixaram a complexidade com a ARGO e ganharam tempo para cuidar do que importa."
            />

            <div className="testimonial-marquee relative overflow-hidden">
              <div className="testimonial-track flex w-max gap-5">
                {testimonialMarqueeItems.map((item, index) => (
                  <figure
                    key={`${item.author}-${index}`}
                    className="relative w-[min(84vw,340px)] md:w-[340px] lg:w-[360px] rounded-2xl metal-panel border border-white/[0.06] p-5 overflow-hidden min-h-[250px] flex flex-col shrink-0"
                    tabIndex={0}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/[0.35] to-transparent" />
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-accent/[0.18] shadow-glow-cyan bg-[#06111f] shrink-0">
                        <img
                          src={item.photo}
                          alt={`Foto de ${item.author}`}
                          className="w-full h-full object-cover contrast-105 saturate-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#030812]/35" />
                      </div>
                      <figcaption className="min-w-0">
                        <p className="text-white font-bold text-base truncate">{item.author}</p>
                        <p className="data-badge text-primary mt-1 leading-relaxed">{item.role}</p>
                      </figcaption>
                    </div>

                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-primary text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-text-secondary text-sm leading-relaxed flex-1">
                      “{item.quote}”
                    </blockquote>
                  </figure>
                ))}
              </div>

            </div>
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
                  A <strong className="text-white">ARGO Soluções & Negócios</strong> nasceu para transformar a complexidade do dia a dia em soluções simples, rápidas e integradas. Reunimos documentos, impressão, presença digital, tecnologia e automação em um único atendimento, para que pessoas e empresas resolvam mais com menos burocracia.
                </p>
                <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mt-4">
                  Mais do que prestar serviços, cuidamos da vida prática dos nossos clientes: entendemos a demanda, orientamos o caminho e entregamos o resultado com agilidade, qualidade e confiança. Um único contato. Várias soluções. Tudo em um só lugar.
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-10">
                  Simplifique.
                </h2>
              </div>

              {/* Números */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
                <div className="text-center p-5 rounded-2xl glass border border-white/[0.04]">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">152+</p>
                  <p className="text-text-muted text-xs sm:text-sm">Serviços disponíveis</p>
                </div>
                <div className="text-center p-5 rounded-2xl glass border border-white/[0.04]">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">13</p>
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
                    Resolvemos rápido porque sabemos que o tempo do cliente não espera.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass holo-border hover-lift border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-4">
                    <Layers3 className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">Completude</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Se envolve papel, documento, digital ou tecnologia, a gente resolve ou encontra o caminho.
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass holo-border hover-lift border border-white/[0.04] text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">Confiança</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Documento certo, prazo combinado e entrega revisada para você usar sem dúvida.
                  </p>
                </div>
              </div>

              {/* Diferenciais */}
              <div className="mb-16">
                <h3 className="text-center text-xs font-semibold tracking-widest uppercase text-text-secondary mb-8">Por que a ARGO é diferente</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm">Um único atendimento coordena demandas de várias categorias</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm">Proposta clara com valor, prazo, escopo e próximos passos</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl glass border border-white/[0.04]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-text-secondary text-sm">Acompanhamento e orientação depois da entrega</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="https://wa.me/5571996171605?text=Olá! Gostaria de saber mais sobre a ARGO Soluções."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-[#030308] font-semibold text-sm hover:brightness-110 active:scale-[0.97] transition-all duration-300"
                  style={{ boxShadow: '0 4px 24px rgba(92, 171, 235, 0.2)' }}
                >
                  Fale com a ARGO agora
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppFloatingButton hidden={cartOpen} />
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
