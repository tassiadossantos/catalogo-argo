import { useQuoteCart } from '../context/QuoteCartContext';

export function useWhatsAppLink() {
  const { generateWhatsAppLink, generateSingleServiceLink } = useQuoteCart();

  const getCartLink = () => generateWhatsAppLink();

  const getServiceLink = (serviceName) => generateSingleServiceLink(serviceName);

  return { getCartLink, getServiceLink };
}
