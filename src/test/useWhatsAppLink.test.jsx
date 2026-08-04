import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QuoteCartProvider, useQuoteCart } from '../context/QuoteCartContext';
import { useWhatsAppLink } from '../hooks/useWhatsAppLink';

function TestWrapper({ children }) {
  return <QuoteCartProvider>{children}</QuoteCartProvider>;
}

describe('useWhatsAppLink', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retorna link # quando carrinho vazio', () => {
    const { result } = renderHook(() => useWhatsAppLink(), { wrapper: TestWrapper });
    expect(result.current.getCartLink()).toBe('#');
  });

  it('retorna link wa.me quando carrinho tem itens', () => {
    const { result: cartResult } = renderHook(() => useQuoteCart(), { wrapper: TestWrapper });
    act(() => cartResult.current.addItem({ id: '1', nome: 'Teste', categoria: 'Cat' }));

    const { result } = renderHook(() => useWhatsAppLink(), { wrapper: TestWrapper });
    const link = result.current.getCartLink();
    expect(link).toMatch(/^https:\/\/wa\.me\/5571996171605\?text=/);
  });

  it('getServiceLink gera link com nome do serviço', () => {
    const { result } = renderHook(() => useWhatsAppLink(), { wrapper: TestWrapper });
    const link = result.current.getServiceLink('Cartão de Visita');
    expect(link).toMatch(/^https:\/\/wa\.me\/5571996171605\?text=/);
    expect(link).toContain(encodeURIComponent('Cartão de Visita'));
  });
});
