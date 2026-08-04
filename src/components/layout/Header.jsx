import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useQuoteCart } from '../../context/QuoteCartContext';

const navLinks = [
  { label: 'Serviços', href: '#catalogo' },
  { label: 'Pacotes', href: '#pacotes' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' }
];

export function Header({ onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useQuoteCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060610] border-b border-white/[0.04]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3 shrink-0 group">
            <img src="/logo.png" alt="Nexa" className="h-8 sm:h-10 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,229,160,0.2)]" />
            <span className="text-sm sm:text-lg font-bold tracking-tight text-white hidden sm:block">
              Nexa Soluções & Negócios
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-text-muted rounded-lg hover:text-white hover:bg-white/[0.02] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-semibold text-text-secondary hover:text-white hover:bg-white/[0.03] active:scale-[0.97] transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Orçamento</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center px-1 bg-primary text-[#030308] text-[10px] font-bold rounded-full" style={{ boxShadow: '0 0 12px rgba(0, 229, 160, 0.3)' }}>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-lg glass hover:bg-white/[0.02] transition-all duration-300"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-text-muted" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.04] bg-[#060610] animate-slide-up">
          <nav className="mx-auto max-w-7xl px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-text-muted rounded-lg hover:text-white hover:bg-white/[0.02] transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
