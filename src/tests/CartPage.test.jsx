import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CartPage from '../pages/CartPage.jsx'
import { CartProvider, useCart } from '../context/CartContext.jsx'
import { MenuProvider } from '../context/MenuContext.jsx'
import { SettingsProvider } from '../context/SettingsContext.jsx'
import { UIProvider } from '../context/UIContext.jsx'

function Providers({ children }) {
  return (
    <SettingsProvider>
      <MenuProvider>
        <CartProvider>
          <UIProvider>{children}</UIProvider>
        </CartProvider>
      </MenuProvider>
    </SettingsProvider>
  )
}

beforeEach(() => {
  window.localStorage.setItem('cart-items', JSON.stringify({ items: [{ id: 't1', name: 'Teste', price: 5, qty: 1, category: 'x' }] }))
})

describe('CartPage', () => {
  it('mostra total após adicionar item', async () => {
    render(
      <Providers>
        <CartPage />
      </Providers>
    )
    expect(await screen.findByText(/Total: R\$ 5\.00/)).toBeInTheDocument()
  })
})
