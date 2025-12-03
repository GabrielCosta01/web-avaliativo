import { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const CartContext = createContext()

function reducer(state, action) {
  if (action.type === 'add') {
    const existing = state.items.find(i => i.id === action.item.id)
    const items = existing
      ? state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + action.qty } : i)
      : [...state.items, { ...action.item, qty: action.qty }]
    return { items }
  }
  if (action.type === 'remove') {
    return { items: state.items.filter(i => i.id !== action.id) }
  }
  if (action.type === 'updateQty') {
    return { items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i) }
  }
  if (action.type === 'clear') return { items: [] }
  if (action.type === 'set') return { items: action.items }
  return state
}

function total(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0)
}

export function CartProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('cart-items', { items: [] })
  const [state, dispatch] = useReducer(reducer, { items: [] })

  useEffect(() => {
    if (persisted && Array.isArray(persisted.items)) {
      dispatch({ type: 'set', items: persisted.items })
    }
  }, [])

  useEffect(() => {
    setPersisted(state)
  }, [state])

  const value = {
    items: state.items,
    add: (item, qty = 1) => dispatch({ type: 'add', item, qty }),
    remove: id => dispatch({ type: 'remove', id }),
    updateQty: (id, qty) => dispatch({ type: 'updateQty', id, qty }),
    clear: () => dispatch({ type: 'clear' }),
    total: total(state.items)
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
