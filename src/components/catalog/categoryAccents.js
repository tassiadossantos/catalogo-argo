export const categoryAccents = {
  'comerciantes-autonomos': '#00e5a0',
  'personalizacao-impressa': '#00d4a0',
  'presenca-digital': '#00f0b0',
  'desenvolvimento-web': '#00c890',
  'automacao-responsiva': '#00b880',
  'marketing-digital': '#00e5a0',
  'midia-e-producao': '#00d4a0',
  'consultoria-gestao': '#00f0b0',
  'inovacao-tecnologia': '#00c890',
  'comunicacao-visual': '#00b880',
  'educacao-treinamento': '#00e5a0'
};

export function getAccent(categoryId) {
  return categoryAccents[categoryId] || '#00e5a0';
}
