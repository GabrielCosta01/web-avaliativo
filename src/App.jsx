import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import MenuPage from './pages/MenuPage.jsx'
import ItemDetailPage from './pages/ItemDetailPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import CartPage from './pages/CartPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MenuPage />} />
          <Route path="categorias/:category" element={<MenuPage />} />
          <Route path="item/:id" element={<ItemDetailPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="carrinho" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
