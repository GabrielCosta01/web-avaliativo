import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MenuPage from '../pages/MenuPage.jsx'
import { MenuProvider } from '../context/MenuContext.jsx'
import { CartProvider } from '../context/CartContext.jsx'
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

describe('MenuPage', () => {
  it('renderiza campo de busca do catálogo', () => {
    render(
      <MemoryRouter>
        <Providers>
          <MenuPage />
        </Providers>
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText('Buscar por nome ou descrição')).toBeInTheDocument()
  })
})
