import { useCart } from '../context/CartContext.jsx'
import { useState } from 'react'
import { useSettings } from '../context/SettingsContext.jsx'
import { useUI } from '../context/UIContext.jsx'

export default function CartPage() {
  const { items, remove, updateQty, clear, total } = useCart()
  const [message, setMessage] = useState('')
  const { settings } = useSettings()
  const { showToast } = useUI()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Carrinho</h1>
      {message && (
        <div role="status" aria-live="polite" className="rounded border border-orange-600 bg-neutral-900 text-orange-400 px-3 py-2">
          {message}
        </div>
      )}
      {items.length === 0 ? (
        <p className="text-neutral-300">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-3">
          <ul className="divide-y divide-neutral-800" aria-label="Itens no carrinho">
            {items.map(i => (
              <li key={i.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{i.name}</p>
                  <p className="text-sm text-neutral-400">{settings.symbol} {i.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="sr-only" htmlFor={`qty-${i.id}`}>Quantidade</label>
                  <input id={`qty-${i.id}`} type="number" min="1" value={i.qty} onChange={e => updateQty(i.id, Number(e.target.value))} className="w-20 rounded border border-neutral-700 bg-neutral-900 text-white px-2 py-1" />
                  <button onClick={() => remove(i.id)} className="px-2 py-1 rounded border border-neutral-700 text-neutral-300 hover:text-white">Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white" aria-live="polite">Total: {settings.symbol} {total.toFixed(2)}</p>
            <div className="flex gap-2">
              <button onClick={clear} className="px-3 py-2 rounded border border-neutral-700 text-neutral-300 hover:text-white">Limpar</button>
              <button className="px-3 py-2 rounded bg-orange-600 text-black" onClick={() => { setMessage('Pedido enviado para a cozinha!'); showToast('Pedido enviado para a cozinha'); if (navigator.vibrate) navigator.vibrate(50); clear() }}>Finalizar pedido</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
