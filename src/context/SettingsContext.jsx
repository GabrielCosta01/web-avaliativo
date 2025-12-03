import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const SettingsContext = createContext()

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('user-settings', {
    currency: 'BRL',
    symbol: 'R$',
    backendUrl: ''
  })

  const value = { settings, setSettings }
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
