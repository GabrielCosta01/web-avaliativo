# Cardápio Digital (React + Vite)

Aplicação de cardápio digital completo com gerenciamento de estado via Context API, CRUD de itens, filtragem e busca, carrinho de compras com total automático, persistência em `localStorage`, rotas com React Router e testes com Vitest.

## Instalação

- Node.js 18+
- Instale dependências:

```bash
npm install
```

## Scripts

- Desenvolvimento: `npm run dev`
- Testes: `npm run test`
- Build produção: `npm run build`
- Preview build: `npm run preview`

## Estrutura

- `src/pages/` páginas: cardápio, detalhes, administração e carrinho
- `src/components/` componentes reutilizáveis (itens, categorias, filtros)
- `src/context/` Context API: menu, carrinho e configurações
- `src/hooks/` hooks customizados: `useLocalStorage`, `useSearchFilter`, `useBackendSync`
- `src/data/sampleMenu.json` dataset inicial

## Persistência

- `localStorage` chaves:
  - `menu-items`: itens do cardápio
  - `user-settings`: configurações do usuário
  - `cart-items`: itens do carrinho

## Rotas

- `/` Cardápio
- `/categorias/:category` Cardápio filtrado por categoria
- `/item/:id` Detalhes do item
- `/admin` Administração (CRUD)
- `/carrinho` Carrinho

## Backend opcional

- Configure `backendUrl` em `SettingsContext` (via UI futura) para sincronização automática (`GET {backendUrl}/menu`).

## Acessibilidade

- Labels ARIA, semântica adequada e foco em responsividade com Tailwind.

## Dataset inicial

- Arquivo `src/data/sampleMenu.json` com itens de demonstração carregados inicialmente quando não há dados no `localStorage`.

