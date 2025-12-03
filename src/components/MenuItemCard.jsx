import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function MenuItemCard({ item }) {
  const { add } = useCart()
  const { settings } = useSettings()
  return (
    <div className="rounded border p-4" role="listitem">
      {item.image && (
        <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />
      )}
      <h3 className="mt-2 font-semibold">
        <Link to={`/item/${item.id}`} className="hover:underline">
          {item.name}
        </Link>
      </h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">{settings.symbol} {item.price.toFixed(2)}</span>
        <button
          aria-label={`Adicionar ${item.name} ao carrinho`}
          onClick={() => add(item, 1)}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}
