import { NavLink, Outlet } from 'react-router-dom'
import useBackendSync from '../hooks/useBackendSync.js'
import CartIcon from './CartIcon.jsx'
import ToastContainer from './ToastContainer.jsx'

export default function Layout() {
  const { status } = useBackendSync()
  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex h-16 items-center justify-between">
            <NavLink to="/" aria-label="Página inicial" className="text-xl font-semibold tracking-wide text-orange-500">
              OpenBox
            </NavLink>
            <nav aria-label="Navegação principal" className="flex gap-6 items-center">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-400' : 'text-neutral-300'}>
                Catálogo
              </NavLink>
              <CartIcon />
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-white">
        <ToastContainer />
        {status !== 'idle' && (
          <p className="mb-3 text-sm text-neutral-400">Sincronização: {status}</p>
        )}
        <Outlet />
      </main>
    </div>
  )
}
