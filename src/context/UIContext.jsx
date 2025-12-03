import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext()

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, duration = 2000) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const value = { toasts, showToast }
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  return useContext(UIContext)
}
