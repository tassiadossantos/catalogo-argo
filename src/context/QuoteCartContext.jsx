import { createContext, useContext, useState, useEffect } from 'react';

const QuoteCartContext = createContext(null);

const STORAGE_KEY = 'quote-cart-items';

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function QuoteCartProvider({ children }) {
  const [items, setItems] = useState(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const addMultipleItems = (newItems) => {
    setItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const toAdd = newItems.filter((i) => !existingIds.has(i.id));
      return [...prev, ...toAdd];
    });
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const isInCart = (itemId) => items.some((i) => i.id === itemId);

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';
    const serviceList = items.map((i) => i.nome).join('\n- ');
    return `Olá! Vim pelo site da ARGO e gostaria de orçamento para:\n\n- ${serviceList}\n\nPoderia me enviar preço e prazo?`;
  };

  const generateWhatsAppLink = () => {
    const message = generateWhatsAppMessage();
    if (!message) return '#';
    return `https://wa.me/5571996171605?text=${encodeURIComponent(message)}`;
  };

  const generateSingleServiceLink = (serviceName, category) => {
    const categoryLabel = category || 'serviços';
    const message = `Olá! Vim pelo site da ARGO e preciso de um orçamento para "${serviceName}" na categoria "${categoryLabel}". Poderia me ajudar?`;
    return `https://wa.me/5571996171605?text=${encodeURIComponent(message)}`;
  };

  const generateFooterLink = () => {
    const message = 'Olá! Vim pelo site da ARGO Soluções e gostaria de mais informações sobre os serviços.';
    return `https://wa.me/5571996171605?text=${encodeURIComponent(message)}`;
  };

  return (
    <QuoteCartContext.Provider
      value={{
        items,
        addItem,
        addMultipleItems,
        removeItem,
        clearCart,
        isInCart,
        generateWhatsAppMessage,
        generateWhatsAppLink,
        generateSingleServiceLink,
        generateFooterLink,
        count: items.length
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error('useQuoteCart deve ser usado dentro de QuoteCartProvider');
  }
  return context;
}
