# OpenBox — Cardápio Digital

Aplicação React focada em conceitos fundamentais com UX moderna. Abaixo estão os 5 conceitos-chave aplicados, com trechos de código e passos interativos para explorar cada um.

**Pré-requisitos**
- Node.js 18+
- `npm install`

**Scripts**
- Desenvolvimento: `npm run dev`
- Testes: `npm run test`
- Build produção: `npm run build`
- Preview build: `npm run preview`

**Como navegar**
- Página inicial: `http://localhost:5174/`
- Carrinho: `http://localhost:5174/carrinho`

**1) useState**
- Onde está: `src/pages/MenuPage.jsx:8`
- O que faz: gerencia estado local simples (itens carregados, busca, coordenadas do mapa) para manter o app enxuto e reativo.
- Experimente:
- Digite no campo de busca do catálogo e observe o filtro reagindo em tempo real.

**2) Hooks**
- Hooks customizados: `src/hooks/useLocalStorage.js:3`
- Persistência automática: escreve e lê dados do `localStorage` sem boilerplate.
- Hooks de UI e Carrinho:
- `src/context/UIContext.jsx:1` — toasts visuais.
- `src/context/CartContext.jsx:29` — `add`, `remove`, `updateQty`, `clear` com `useReducer`.
- Experimente:
- Adicione um item ao carrinho; veja a animação até o ícone, toast de confirmação e destaque no card.

**3) Persistência de dados (LocalStorage)**
- Onde está: `src/context/CartContext.jsx:30` e `src/hooks/useLocalStorage.js:3`
- O que persiste: itens do carrinho em `cart-items` e datasets quando aplicável.
- Experimente:
- Adicione itens, recarregue a página e verifique que o carrinho permanece.

**4) Geração de PDF (pdf-lib)**
- Utilitário: `src/utils/pdf.js:3` (`generateCatalogPdf`)
- Ação de exportar: `src/pages/MenuPage.jsx:58` (botão “Exportar PDF”)
- Como funciona: cria PDF com capa escura e páginas por item, tenta embutir imagens; se indisponíveis, desenha placeholder com texto.
- Experimente:
- Clique em “Exportar PDF” no catálogo para baixar `catalogo-openbox.pdf`.

**5) React Router DOM**
- Definição de rotas: `src/App.jsx:11`
- Layout com `<Outlet />`: `src/components/Layout.jsx:25`
- Experimente:
- Navegue entre `Catálogo` e `Carrinho` pelo topo; acesse rota de item se desejar.

**Interface e UX**
- Tema preto com detalhes laranjas, grid responsiva, ícone de carrinho com contador, animações suaves e toasts.
- Imagens com `loading="lazy"`, `referrerPolicy="no-referrer"` e fallback visual para evitar quebras.

**Testes e qualidade**
- Testes: `src/tests/MenuPage.test.jsx:19`, `src/tests/CartPage.test.jsx:22`, `src/tests/AdminPage.test.jsx:1`
- Execute: `npm run test`

**Estrutura rápida**
- `src/pages/` catálogo, detalhes, administração e carrinho
- `src/components/` layout, ícone de carrinho, toasts, cards
- `src/context/` carrinho, menu, configurações, UI
- `src/hooks/` `useLocalStorage`, filtros e sync opcional
- `src/utils/pdf.js` geração de PDF
- `src/data/sampleMenu.json` dataset inicial

**Demonstração prática**
- 1. `npm run dev`
- 2. Adicione um item ao carrinho para ver animações e toasts
- 3. Clique em “Exportar PDF” para gerar o catálogo
- 4. Abra `Carrinho` e finalize pedido para ver notificação e limpeza do carrinho

**Notas**
- URLs de imagens podem ser diretas ou usar fallback para evitar “Aviso de redirecionamento”.

## Trechos de código e links

### 1) useState
```jsx
// src/pages/MenuPage.jsx
const [query, setQuery] = useState('')
const [coords, setCoords] = useState({ lat: -17.7927152, lon: -50.9421775 })
```
- Ver no código: https://github.com/GabrielCosta01/web-avaliativo/blob/main/src/pages/MenuPage.jsx#L12-L16
- Referência local: `src/pages/MenuPage.jsx:12`

### 2) Hook customizado (useLocalStorage)
```js
// src/hooks/useLocalStorage.js
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])
  return [value, setValue]
}
```
- Ver no código: https://github.com/GabrielCosta01/web-avaliativo/blob/main/src/hooks/useLocalStorage.js#L3-L19
- Referência local: `src/hooks/useLocalStorage.js:3`

### 3) Persistência (integração no carrinho)
```jsx
// src/context/CartContext.jsx
const [persisted, setPersisted] = useLocalStorage('cart-items', { items: [] })
useEffect(() => {
  setPersisted(state)
}, [state])
```
- Ver no código: https://github.com/GabrielCosta01/web-avaliativo/blob/main/src/context/CartContext.jsx#L30-L41
- Referência local: `src/context/CartContext.jsx:30`

### 4) Geração de PDF (pdf-lib)
```js
// src/utils/pdf.js
export async function generateCatalogPdf(items) {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const cover = pdfDoc.addPage([595, 842])
  cover.drawText('Catálogo de Produtos', { x: 40, y: 760, size: 18, font })
  for (const item of items) {
    const page = pdfDoc.addPage([595, 842])
    let img
    if (item.image) {
      const res = await fetch(item.image)
      const bytes = await res.arrayBuffer()
      try { img = await pdfDoc.embedJpg(bytes) } catch { img = await pdfDoc.embedPng(bytes) }
    }
    // desenha imagem ou placeholder e textos do item
  }
}
```
- Ver no código: https://github.com/GabrielCosta01/web-avaliativo/blob/main/src/utils/pdf.js#L3-L48
- Referência local: `src/utils/pdf.js:3`

### 5) React Router DOM
```jsx
// src/App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}> 
      <Route index element={<MenuPage />} />
      <Route path="carrinho" element={<CartPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
```
- Ver no código: https://github.com/GabrielCosta01/web-avaliativo/blob/main/src/App.jsx#L11-L21
- Referência local: `src/App.jsx:11`

