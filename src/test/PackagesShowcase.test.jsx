import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PackagesShowcase } from '../components/catalog/PackagesShowcase';
import { QuoteCartProvider } from '../context/QuoteCartContext';

function TestWrapper({ children }) {
  return <QuoteCartProvider>{children}</QuoteCartProvider>;
}

const mockPackages = [
  {
    id: 'kit-1',
    titulo: 'Kit Teste',
    descricao: 'Descrição do kit',
    itens: ['Item A', 'Item B'],
    destaque: false
  },
  {
    id: 'kit-2',
    titulo: 'Kit Destaque',
    descricao: 'Kit com destaque',
    itens: ['Item X'],
    destaque: true
  }
];

describe('PackagesShowcase', () => {
  it('renderiza todos os pacotes', () => {
    render(<PackagesShowcase packages={mockPackages} />, { wrapper: TestWrapper });
    expect(screen.getByText('Kit Teste')).toBeInTheDocument();
    expect(screen.getByText('Kit Destaque')).toBeInTheDocument();
  });

  it('renderiza descrição dos pacotes', () => {
    render(<PackagesShowcase packages={mockPackages} />, { wrapper: TestWrapper });
    expect(screen.getByText('Descrição do kit')).toBeInTheDocument();
  });

  it('renderiza itens dos pacotes', () => {
    render(<PackagesShowcase packages={mockPackages} />, { wrapper: TestWrapper });
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item X')).toBeInTheDocument();
  });

  it('mostra badge de destaque para pacote destaque', () => {
    render(<PackagesShowcase packages={mockPackages} />, { wrapper: TestWrapper });
    const matches = screen.getAllByText(/destaque/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('tem botão de adicionar para cada pacote', () => {
    render(<PackagesShowcase packages={mockPackages} />, { wrapper: TestWrapper });
    const buttons = screen.getAllByRole('button', { name: /adicionar pacote/i });
    expect(buttons).toHaveLength(2);
  });
});
