export const categoryAccents = {
  'trabalhos-academicos': '#5cabeb',
  'curriculos-carreira': '#6cb4ed',
  'servicos-online-burocraticos': '#7cbdef',
  'redacao-digitação-contratos': '#5cabeb',
  'impressao-digitalizacao': '#4a96d6',
  'presenca-digital': '#5cabeb',
  'comerciantes-autonomos': '#6cb4ed',
  'desenvolvimento-web': '#7cbdef',
  'informatica-suporte': '#5cabeb',
  'personalizacao-impressa': '#4a96d6',
  'festas-personalizados': '#5cabeb',
  'automacao-solucoes-digitais': '#6cb4ed',
  'bottons-personalizados': '#7cbdef'
};

export function getAccent(categoryId) {
  return categoryAccents[categoryId] || '#5cabeb';
}
