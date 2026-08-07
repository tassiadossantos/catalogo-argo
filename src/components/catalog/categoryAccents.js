export const categoryAccents = {
  'trabalhos-academicos': '#00e5a0',
  'curriculos-carreira': '#00d4a0',
  'servicos-online-burocraticos': '#00f0b0',
  'redacao-digitação-contratos': '#00c890',
  'impressao-digitalizacao': '#00b880',
  'presenca-digital': '#00e5a0',
  'comerciantes-autonomos': '#00d4a0',
  'desenvolvimento-web': '#00f0b0',
  'informatica-suporte': '#00c890',
  'personalizacao-impressa': '#00b880',
  'festas-personalizados': '#00e5a0',
  'automacao-solucoes-digitais': '#00d4a0',
  'bottons-personalizados': '#00f0b0'
};

export function getAccent(categoryId) {
  return categoryAccents[categoryId] || '#00e5a0';
}
