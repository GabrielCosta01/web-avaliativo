import { useParams, Link } from 'react-router-dom'
import { useMenu } from '../context/MenuContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function ItemDetailPage() {
  const { id } = useParams()
  const { items } = useMenu()
  const { add } = useCart()
  const { settings } = useSettings()
  const item = items.find(i => i.id === id)

  if (!item) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Item não encontrado</h1>
        <Link to="/" className="text-blue-600">Voltar ao cardápio</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      {item.image && <img src={item.image} alt={item.name} className="h-64 w-full object-cover rounded" />}
      <p className="text-gray-700">{item.description}</p>
      <p className="font-bold">{settings.symbol} {item.price.toFixed(2)}</p>
      <div className="flex gap-2">
        <button onClick={() => add(item, 1)} className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Adicionar ao carrinho</button>
        <Link to="/" className="px-3 py-2 rounded border">Voltar ao cardápio</Link>
      </div>
    </div>
  )
}
