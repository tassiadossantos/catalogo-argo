import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QuoteCartProvider, useQuoteCart } from '../context/QuoteCartContext';

const wrapper = ({ children }) => <QuoteCartProvider>{children}</QuoteCartProvider>;

const mockItem = { id: 'test-1', nome: 'Serviço Teste', categoria: 'Categoria Teste' };
const mockItem2 = { id: 'test-2', nome: 'Serviço Teste 2', categoria: 'Categoria Teste 2' };

describe('QuoteCartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia com carrinho vazio', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it('adiciona item ao carrinho', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => result.current.addItem(mockItem));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].nome).toBe('Serviço Teste');
    expect(result.current.count).toBe(1);
  });

  it('não adiciona item duplicado', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem);
    });
    expect(result.current.items).toHaveLength(1);
  });

  it('remove item do carrinho', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
    });
    expect(result.current.items).toHaveLength(2);
    act(() => result.current.removeItem('test-1'));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('test-2');
  });

  it('limpa todo o carrinho', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
    });
    expect(result.current.items).toHaveLength(2);
    act(() => result.current.clearCart());
    expect(result.current.items).toHaveLength(0);
  });

  it('verifica se item está no carrinho', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    expect(result.current.isInCart('test-1')).toBe(false);
    act(() => result.current.addItem(mockItem));
    expect(result.current.isInCart('test-1')).toBe(true);
    expect(result.current.isInCart('test-2')).toBe(false);
  });

  it('adiciona múltiplos itens de uma vez', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => result.current.addMultipleItems([mockItem, mockItem2]));
    expect(result.current.items).toHaveLength(2);
  });

  it('não duplica ao adicionar múltiplos itens', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => result.current.addItem(mockItem));
    act(() => result.current.addMultipleItems([mockItem, mockItem2]));
    expect(result.current.items).toHaveLength(2);
  });

  it('gera mensagem do WhatsApp corretamente', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
    });
    const msg = result.current.generateWhatsAppMessage();
    expect(msg).toContain('Serviço Teste');
    expect(msg).toContain('Serviço Teste 2');
    expect(msg).toContain('Olá!');
  });

  it('gera link do WhatsApp corretamente', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => result.current.addItem(mockItem));
    const link = result.current.generateWhatsAppLink();
    expect(link).toContain('https://wa.me/5571996171605?text=');
    expect(link).toContain(encodeURIComponent('Serviço Teste'));
  });

  it('gera link de serviço individual', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    const link = result.current.generateSingleServiceLink('Cartão de Visita');
    expect(link).toContain('https://wa.me/5571996171605?text=');
    expect(link).toContain(encodeURIComponent('Cartão de Visita'));
  });

  it('retorna # quando carrinho vazio', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    expect(result.current.generateWhatsAppLink()).toBe('#');
  });

  it('persiste no localStorage', () => {
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    act(() => result.current.addItem(mockItem));
    const stored = JSON.parse(localStorage.getItem('quote-cart-items'));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe('test-1');
  });

  it('carrega dados do localStorage ao iniciar', () => {
    localStorage.setItem('quote-cart-items', JSON.stringify([mockItem]));
    const { result } = renderHook(() => useQuoteCart(), { wrapper });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('test-1');
  });
});
