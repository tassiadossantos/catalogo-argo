import { MessageCircle, ArrowRight } from 'lucide-react';
import { useWhatsAppLink } from '../../hooks/useWhatsAppLink';

export function Hero() {
  const { getCartLink } = useWhatsAppLink();

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Grid backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-grid-dense opacity-15" />

      {/* Glow spots */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[350px] sm:w-[600px] sm:h-[500px] lg:w-[900px] lg:h-[700px] glow-spot bg-primary/[0.03]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] glow-spot bg-accent/[0.02]" />
      <div className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] glow-spot bg-primary/[0.015]" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* Floating shapes */}
      <div className="absolute top-20 right-[15%] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border border-white/[0.03] rounded-2xl rotate-45 animate-float opacity-30 hidden sm:block" />
      <div className="absolute bottom-32 left-[10%] w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border border-primary/[0.04] rounded-xl rotate-12 animate-float opacity-20 hidden sm:block" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[5%] w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 border border-white/[0.04] rounded-lg animate-float opacity-15" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[30%] right-[8%] w-4 h-4 sm:w-5 sm:h-5 border border-primary/[0.05] rounded-md rotate-45 animate-float opacity-20" style={{ animationDelay: '1s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-16 lg:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.15] animate-slide-up">
            <span className="text-metallic font-light text-[0.55em] block">Soluções</span>
            <span className="text-metallic block">Digitais</span>
            <span className="text-metallic font-light text-[0.55em] block">& Tecnologia</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
            De cartões de visita a sites profissionais. Explore por categoria, selecione múltiplos serviços e envie um orçamento consolidado.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <a
              href="#catalogo"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 glass border border-white/[0.06] text-white font-semibold rounded-xl hover:bg-white/[0.04] hover:border-white/[0.1] active:scale-[0.97] transition-all duration-300 text-sm tracking-wide"
            >
              Explorar catálogo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href={getCartLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 glass border border-white/[0.04] font-semibold rounded-xl hover:bg-white/[0.03] hover:border-white/[0.08] active:scale-[0.97] transition-all duration-300 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-text-muted" />
              <span className="text-text-secondary">Falar no WhatsApp</span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 mt-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {[
              { value: '87+', label: 'Serviços' },
              { value: '11', label: 'Categorias' },
              { value: '24h', label: 'Resposta' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-mono)] tracking-tight">
                  {stat.value}
                </div>
                <div className="data-badge text-text-muted mt-1.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
