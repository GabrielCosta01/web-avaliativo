import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminPage from '../pages/AdminPage.jsx'
import { MenuProvider } from '../context/MenuContext.jsx'
import { CartProvider } from '../context/CartContext.jsx'
import { SettingsProvider } from '../context/SettingsContext.jsx'

function Providers({ children }) {
  return (
    <SettingsProvider>
      <MenuProvider>
        <CartProvider>{children}</CartProvider>
      </MenuProvider>
    </SettingsProvider>
  )
}

describe('AdminPage', () => {
  it('cria um novo item via formulário', async () => {
    render(
      <Providers>
        <AdminPage />
      </Providers>
    )
    const user = userEvent.setup()
    await user.type(screen.getByLabelText('Nome'), 'Novo Item')
    await user.type(screen.getByLabelText('Categoria'), 'doces')
    await user.type(screen.getByLabelText('Descrição'), 'Teste de criação')
    await user.type(screen.getByLabelText('Preço'), '12.50')
    await user.type(screen.getByLabelText('Tags (separadas por vírgula)'), 'promocao')
    await user.click(screen.getByText('Adicionar item'))

    expect(await screen.findByText('Novo Item')).toBeInTheDocument()
  })
})
