import { Phone, Clock, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const whatsappLink = 'https://wa.me/5571996171605';

  return (
    <footer id="contato" className="relative border-t border-white/[0.03]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Nexa" className="h-8 w-auto" />
              <span className="font-bold text-sm text-white">Nexa Soluções & Negócios</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Impressão, presença digital, desenvolvimento web, automação e personalização.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-5">Links Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#catalogo" className="text-text-muted hover:text-white transition-colors duration-300">Serviços</a></li>
              <li><a href="#pacotes" className="text-text-muted hover:text-white transition-colors duration-300">Pacotes</a></li>
              <li><a href="#sobre" className="text-text-muted hover:text-white transition-colors duration-300">Sobre Nós</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-5">Contato</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-muted hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4 text-text-muted shrink-0" />
                  <span>(71) 99617-1605</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <Mail className="w-4 h-4 text-text-muted shrink-0" />
                <span className="min-w-0 break-all">contato@nexasolucoes.com.br</span>
              </li>
              <li className="flex items-center gap-3 text-text-muted">
                <MapPin className="w-4 h-4 text-text-muted shrink-0" />
                <span>Camaçari, BA</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-5">Horário de Funcionamento</h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {[
                { day: 'Dom', hours: '10:00 - 15:00' },
                { day: 'Seg', hours: '07:00 - 14:00' },
                { day: 'Ter', hours: '07:00 - 17:00' },
                { day: 'Qua', hours: '07:00 - 18:00' },
                { day: 'Qui', hours: '07:00 - 18:00' },
                { day: 'Sex', hours: '07:00 - 18:00' },
                { day: 'Sáb', hours: '09:00 - 14:00' }
              ].map((s) => (
                <li key={s.day} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-text-muted shrink-0" />
                  <span>{s.day} - {s.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.03] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted text-center sm:text-left">
            {new Date().getFullYear()} NEXA SOLUÇÕES & NEGÓCIOS. TODOS OS DIREITOS RESERVADOS.
          </p>
          <p className="text-xs text-text-muted">
            CNPJ: XX.XXX.XXX/0001-XX
          </p>
        </div>
      </div>
    </footer>
  );
}
