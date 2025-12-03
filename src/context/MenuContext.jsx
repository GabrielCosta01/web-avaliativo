import { createContext, useContext, useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import sampleData from '../data/sampleMenu.json'

const MenuContext = createContext()

function reducer(state, action) {
  if (action.type === 'set') return action.items
  if (action.type === 'create') return [...state, action.item]
  if (action.type === 'update') return state.map(i => i.id === action.item.id ? action.item : i)
  if (action.type === 'delete') return state.filter(i => i.id !== action.id)
  return state
}

export function MenuProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('menu-items', null)
  const [items, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const initial = Array.isArray(persisted) ? persisted : sampleData
    dispatch({ type: 'set', items: initial })
  }, [])

  useEffect(() => {
    setPersisted(items)
  }, [items])

  function createItem(item) {
    dispatch({ type: 'create', item })
  }

  function updateItem(item) {
    dispatch({ type: 'update', item })
  }

  function deleteItem(id) {
    dispatch({ type: 'delete', id })
  }

  const value = { items, createItem, updateItem, deleteItem }
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu() {
  return useContext(MenuContext)
}
