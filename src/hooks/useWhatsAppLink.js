import { useQuoteCart } from '../context/QuoteCartContext';

export function useWhatsAppLink() {
  const { generateWhatsAppLink, generateSingleServiceLink, generateFooterLink } = useQuoteCart();

  const getCartLink = () => generateWhatsAppLink();

  const getServiceLink = (serviceName, category) => generateSingleServiceLink(serviceName, category);

  const getFooterLink = () => generateFooterLink();

  return { getCartLink, getServiceLink, getFooterLink };
}
