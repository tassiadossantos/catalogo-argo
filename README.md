# Nexa Soluções & Negócios — Catálogo Digital

Catálogo de serviços interativo com navegação por categoria, busca textual, carrinho de orçamento consolidado e envio via WhatsApp.

**Link:** [nexasolucoes.com.br](https://nexasolucoes.com.br)

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Estilo | Tailwind CSS v4 |
| Ícones | Lucide React |
| Estado | Context API + useReducer |
| Roteamento | React Router DOM v7 |
| Testes | Vitest + React Testing Library |
| Lint | Oxlint |

---

## Pré-requisitos

- Node.js ≥ 18
- npm ≥ 9

---

## Instalação

```bash
git clone https://github.com/tassiadossantos/catalogo-nexa.git
cd catalogo-nexa
npm install
npm run dev
```

Acesse `http://localhost:5173`

---

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Bundle de produção em `dist/` |
| `npm run preview` | Preview da build local |
| `npm run test` | Executa suite de testes |
| `npm run test:watch` | Testes em modo watch |
| `npm run lint` | Análise estática com oxlint |

---

## Arquitetura

```
src/
├── components/
│   ├── layout/          Header, Footer, WhatsAppFloatingButton
│   ├── catalog/         Hero, CategoryFilter, SearchBar, CategorySection,
│   │                    ServiceCard, ServiceGrid, PackagesShowcase
│   ├── cart/            QuoteCartPanel, QuoteCartButton
│   └── ui/              Button, Badge, SectionTitle, EmptyState
├── pages/               CategoryPage, ServicePage
├── data/                services.js (13 categorias, 152 serviços, 4 pacotes)
├── context/             QuoteCartContext (estado global do carrinho)
├── hooks/               useWhatsAppLink
├── test/                10 arquivos de teste (128 assertions)
└── App.jsx              Roteamento e composição principal
```

### Fluxo de Dados

```
App (Router)
├── QuoteCartContext.Provider
│   ├── Hero → busca → CategoryFilter → CategorySection[]
│   │                      ├── ServiceCard[] (add ao carrinho)
│   │                      └── PackagesShowcase (add batch)
│   ├── CategoryPage → ServiceCard[] (add ao carrinho)
│   └── QuoteCartPanel (consolidação + envio via WhatsApp)
```

---

## Funcionalidades

- **Filtro por categoria** — 13 categorias com chips clicáveis, prioridade visual para top 3
- **Busca textual** — filtro em tempo real por nome e descrição
- **Carrinho de orçamento** — seleção múltipla, persistência em localStorage, envio consolidado via WhatsApp
- **CTA individual** — botão de contato direto por serviço
- **Pacotes** — 4 kits com adição em batch
- **Responsividade** — mobile-first (360px+), breakpoints sm/md/lg/xl
- **SEO** — schema.org `LocalBusiness` com `openingHours`
- **WhatsApp Floating Button** — CTA persistente

---

## Testes

128 assertions distribuídas em 10 arquivos:

| Arquivo | Escopo |
|---|---|
| `services.test.js` | Validação dos dados: categorias, pacotes, contagem de itens |
| `QuoteCartContext.test.jsx` | Context: add, remove, clear, duplicatas, localStorage sync |
| `useWhatsAppLink.test.jsx` | Hook: link do carrinho, link individual, estado vazio |
| `ui-components.test.jsx` | Componentes base: Button, Badge, SectionTitle, EmptyState |
| `catalog-components.test.jsx` | Catálogo: SearchBar, ServiceCard, ServiceGrid |
| `CategoryFilter.test.jsx` | Filtro: renderização, clique, estado ativo |
| `PackagesShowcase.test.jsx` | Pacotes: renderização, destaque, botões |
| `cart-components.test.jsx` | Carrinho: QuoteCartButton, QuoteCartPanel |
| `layout-components.test.jsx` | Layout: Header, Footer, WhatsAppFloatingButton |

Executar:

```bash
npm run test
```

---

## Deploy

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

1. Conectar repositório
2. **Build command:** `npm run build`
3. **Publish directory:** `dist`

### Docker (opcional)

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## Google Search Console (Indexação)

Após o deploy, submeta o site ao Google para indexar todas as páginas.

### Passo 1 — Criar propriedade

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Clique em **"Adicionar propriedade"**
3. Digite a URL completa: `https://nexasolucoes.com.br`

### Passo 2 — Verificar posse do domínio

1. Escolha o método **"Tag HTML"**
2. Copie a meta tag fornecida (ex: `<meta name="google-site-verification" content="abc123..." />`)
3. Cole no `index.html`, **antes da tag `</head>`**
4. Faça deploy novamente
5. Volte ao Search Console e clique em **"Verificar"**

### Passo 3 — Enviar sitemap

1. No menu lateral, vá em **Sitemaps**
2. Digite: `sitemap.xml`
3. Clique em **"Enviar"**

### Passo 4 — Monitorar

- **Abas úteis:** Desempenho, Cobertura, Sitemaps
- Google indexa em 1-7 dias (podendo levar até 4 semanas)
- Reenvie o sitemap sempre que adicionar muitas páginas novas

### Notas

- O `robots.txt` já aponta para o sitemap automaticamente
- Cada página de serviço tem título e descrição dinâmicos (SEO on-page)
- Schema.org `LocalBusiness` com horários, telefone e endereço já configurados

---

## Branding

- **Logo:** `public/logo.png` (header, footer, favicon)
- **Paleta:** verde primário (`#00e5a0`) + fundo escuro (`#060610`)
- **Favicon:** `public/logo.png`

---

## Licença

Projeto privado — Nexa Soluções & Negócios.
