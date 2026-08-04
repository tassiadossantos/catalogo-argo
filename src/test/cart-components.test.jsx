import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuoteCartPanel } from '../components/cart/QuoteCartPanel';
import { QuoteCartButton } from '../components/cart/QuoteCartButton';
import { QuoteCartProvider } from '../context/QuoteCartContext';

function TestWrapper({ children }) {
  return <QuoteCartProvider>{children}</QuoteCartProvider>;
}

describe('QuoteCartButton', () => {
  it('renderiza botão do carrinho', () => {
    render(<QuoteCartButton onClick={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByRole('button', { name: /carrinho/i })).toBeInTheDocument();
  });

  it('mostra aria-label com zero itens', () => {
    render(<QuoteCartButton onClick={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByRole('button', { name: /0 itens/ })).toBeInTheDocument();
  });

  it('chama onClick ao clicar', () => {
    const onClick = vi.fn();
    render(<QuoteCartButton onClick={onClick} />, { wrapper: TestWrapper });
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('QuoteCartPanel', () => {
  it('não renderiza quando fechado', () => {
    render(<QuoteCartPanel isOpen={false} onClose={() => {}} />, { wrapper: TestWrapper });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renderiza quando aberto', () => {
    render(<QuoteCartPanel isOpen={true} onClose={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('mostra carrinho vazio', () => {
    render(<QuoteCartPanel isOpen={true} onClose={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByText(/carrinho vazio/i)).toBeInTheDocument();
  });

  it('tem botão de fechar', () => {
    render(<QuoteCartPanel isOpen={true} onClose={() => {}} />, { wrapper: TestWrapper });
    expect(screen.getByLabelText(/fechar carrinho/i)).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão de fechar', () => {
    const onClose = vi.fn();
    render(<QuoteCartPanel isOpen={true} onClose={onClose} />, { wrapper: TestWrapper });
    fireEvent.click(screen.getByLabelText(/fechar carrinho/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('chama onClose ao clicar no backdrop', () => {
    const onClose = vi.fn();
    render(<QuoteCartPanel isOpen={true} onClose={onClose} />, { wrapper: TestWrapper });
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
