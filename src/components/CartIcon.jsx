import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function CartIcon() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  return (
    <NavLink id="cart-icon" to="/carrinho" aria-label="Carrinho" className={({ isActive }) => isActive ? 'text-orange-400 relative' : 'text-neutral-300 relative'}>
      <span className="inline-flex items-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
          <path d="M7 4h-2l-1 2h2l3 9h8l3-7H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
          <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
        </svg>
        Carrinho
      </span>
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-orange-600 text-black text-xs px-1.5 py-0.5 rounded-full">{count}</span>
      )}
    </NavLink>
  )
}
