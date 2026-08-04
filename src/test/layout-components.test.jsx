import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { WhatsAppFloatingButton } from '../components/layout/WhatsAppFloatingButton';
import { QuoteCartProvider } from '../context/QuoteCartContext';

function TestWrapper({ children }) {
  return <QuoteCartProvider>{children}</QuoteCartProvider>;
}

describe('Header', () => {
  it('renderiza logo', () => {
    render(<Header onCartClick={() => {}} />, { wrapper: TestWrapper });
    const logo = screen.getByAltText(/nexa/i);
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain('logo.png');
  });

  it('renderiza nome da empresa', () => {
    render(<Header onCartClick={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByText(/nexa soluções/i)).toBeInTheDocument();
  });

  it('renderiza links de navegação', () => {
    render(<Header onCartClick={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByRole('link', { name: /serviços/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pacotes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });

  it('tem botão de orçamento', () => {
    render(<Header onCartClick={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByRole('button', { name: /orçamento/i })).toBeInTheDocument();
  });

  it('chama onCartClick ao clicar no orçamento', () => {
    const onCartClick = vi.fn();
    render(<Header onCartClick={onCartClick} />, { wrapper: TestWrapper });
    fireEvent.click(screen.getByRole('button', { name: /orçamento/i }));
    expect(onCartClick).toHaveBeenCalled();
  });

  it('tem botão mobile menu', () => {
    render(<Header onCartClick={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByLabelText(/menu/i)).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renderiza logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText(/nexa/i);
    expect(logo).toBeInTheDocument();
  });

  it('renderiza links rapidos', () => {
    render(<Footer />);
    expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /serviços/i })).toBeInTheDocument();
  });

  it('renderiza informacoes de contato', () => {
    render(<Footer />);
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('renderiza horario de funcionamento', () => {
    render(<Footer />);
    expect(screen.getByText('Horário de Funcionamento')).toBeInTheDocument();
    expect(screen.getByText(/dom/i)).toBeInTheDocument();
    expect(screen.getByText(/seg/i)).toBeInTheDocument();
    expect(screen.getByText(/sáb/i)).toBeInTheDocument();
  });

  it('renderiza copyright com ano atual', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});

describe('WhatsAppFloatingButton', () => {
  it('não renderiza quando carrinho vazio', () => {
    render(<WhatsAppFloatingButton />, { wrapper: TestWrapper });
    expect(screen.queryByRole('link', { name: /enviar.*whatsapp/i })).not.toBeInTheDocument();
  });
});
