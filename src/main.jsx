import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { MenuProvider } from './context/MenuContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { UIProvider } from './context/UIContext.jsx'

const root = document.getElementById('root')
createRoot(root).render(
  <React.StrictMode>
    <SettingsProvider>
      <MenuProvider>
        <CartProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </CartProvider>
      </MenuProvider>
    </SettingsProvider>
  </React.StrictMode>
)
