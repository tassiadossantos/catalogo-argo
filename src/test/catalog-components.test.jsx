import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ServiceCard } from '../components/catalog/ServiceCard';
import { ServiceGrid } from '../components/catalog/ServiceGrid';
import { QuoteCartProvider } from '../context/QuoteCartContext';

function TestWrapper({ children }) {
  return <MemoryRouter><QuoteCartProvider>{children}</QuoteCartProvider></MemoryRouter>;
}

describe('ServiceCard', () => {
  const mockService = {
    id: 'comerciantes-autonomos-0',
    nome: 'Cartão de Visita',
    categoria: 'Soluções para Comerciantes',
    categoryId: 'comerciantes-autonomos',
    descricao: 'Cartões profissionais'
  };

  it('renderiza nome do serviço', () => {
    render(<ServiceCard service={mockService} categoryId={mockService.categoryId} />, { wrapper: TestWrapper });
    expect(screen.getByText('Cartão de Visita')).toBeInTheDocument();
  });

  it('renderiza descrição', () => {
    render(<ServiceCard service={mockService} categoryId={mockService.categoryId} />, { wrapper: TestWrapper });
    expect(screen.getByText('Cartões profissionais')).toBeInTheDocument();
  });

  it('tem botão de adicionar', () => {
    render(<ServiceCard service={mockService} categoryId={mockService.categoryId} />, { wrapper: TestWrapper });
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
  });

  it('tem link de WhatsApp', () => {
    render(<ServiceCard service={mockService} categoryId={mockService.categoryId} />, { wrapper: TestWrapper });
    const links = screen.getAllByRole('link');
    const whatsappLink = links.find((l) => l.href.includes('wa.me'));
    expect(whatsappLink).toBeTruthy();
  });

  it('adiciona ao carrinho ao clicar', () => {
    render(<ServiceCard service={mockService} categoryId={mockService.categoryId} />, { wrapper: TestWrapper });
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));
    expect(screen.getByText(/adicionado/i)).toBeInTheDocument();
  });

  it('tem link acessível para detalhes', () => {
    render(<ServiceCard service={mockService} categoryId={mockService.categoryId} />, { wrapper: TestWrapper });
    expect(screen.getByLabelText(/ver detalhes de cartão de visita/i)).toBeInTheDocument();
  });
});

describe('ServiceGrid', () => {
  const mockServices = [
    { id: '1', nome: 'Serviço A', categoria: 'Cat A', categoryId: 'cat-a' },
    { id: '2', nome: 'Serviço B', categoria: 'Cat B', categoryId: 'cat-b' }
  ];

  it('renderiza todos os serviços', () => {
    render(<ServiceGrid services={mockServices} />, { wrapper: TestWrapper });
    expect(screen.getByText('Serviço A')).toBeInTheDocument();
    expect(screen.getByText('Serviço B')).toBeInTheDocument();
  });

  it('mostra empty state quando vazio', () => {
    render(<ServiceGrid services={[]} />, { wrapper: TestWrapper });
    expect(screen.getByText(/nenhum serviço encontrado/i)).toBeInTheDocument();
  });
});
