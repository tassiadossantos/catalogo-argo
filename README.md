# Nexa Soluções & Negócios — Catálogo Digital

Catálogo de serviços interativo com navegação por categoria, busca textual, carrinho de orçamento consolidado e envio via WhatsApp.

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
git clone <repositorio>
cd catalogo-digital
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
├── data/                services.js (11 categorias, 87+ serviços, 4 pacotes)
├── context/             QuoteCartContext (estado global do carrinho)
├── hooks/               useWhatsAppLink
├── test/                9 arquivos de teste (92 assertions)
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

- **Filtro por categoria** — 11 categorias com chips clicáveis, prioridade visual para top 3
- **Busca textual** — filtro em tempo real por nome e descrição
- **Carrinho de orçamento** — seleção múltipla, persistência em localStorage, envio consolidado via WhatsApp
- **CTA individual** — botão de contato direto por serviço
- **Pacotes** — 4 kits com adição em batch
- **Responsividade** — mobile-first (360px+), breakpoints sm/md/lg/xl
- **SEO** — schema.org `LocalBusiness` com `openingHours`
- **WhatsApp Floating Button** — CTA persistente

---

## Testes

92 assertions distribuídas em 9 arquivos:

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

## Branding

- **Logo:** `public/logo.png` (header, footer, favicon)
- **Paleta:** verde esmeralda (`#10b981`) + prata/cinza (`#94a3b8`)
- **Favicon:** `public/logo.png`

---

## Licença

Projeto privado — Nexa Soluções & Negócios.
