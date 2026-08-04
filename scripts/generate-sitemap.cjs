const fs = require('fs');
const path = require('path');
const d = require(path.join(__dirname, '..', 'src', 'data', 'services.js'));

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

xml += '  <url>\n    <loc>https://nexasolucoes.com.br/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n';

d.categorias.forEach(cat => {
  xml += '  <url>\n    <loc>https://nexasolucoes.com.br/categoria/' + cat.id + '</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n';
  cat.itens.forEach((item, i) => {
    xml += '  <url>\n    <loc>https://nexasolucoes.com.br/servico/' + cat.id + '-' + i + '</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n';
  });
});

xml += '</urlset>';
fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap gerado: ' + (d.categorias.length + d.categorias.reduce((a, c) => a + c.itens.length, 0) + 1) + ' URLs');
