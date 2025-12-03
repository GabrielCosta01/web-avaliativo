import { useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIContext.jsx'
import { Link } from 'react-router-dom'
import sampleData from '../data/sampleMenu.json'
import { generateCatalogPdf } from '../utils/pdf.js'

export default function MenuPage() {
  const [persistedItems] = useLocalStorage('simple-menu-items', sampleData)
  const items = Array.isArray(persistedItems) && persistedItems.length >= 7 ? persistedItems : sampleData
  const [query, setQuery] = useState('')
  const [coords, setCoords] = useState({ lat: -17.7927152, lon: -50.9421775 })
  const { add } = useCart()
  const { showToast } = useUI()
  const [highlightId, setHighlightId] = useState(null)

  

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(i => !q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q))
  }, [items, query])

  

  function locateMe() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(pos => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
    })
  }

  function osmEmbedUrl(lat, lon) {
    const d = 0.01
    const bbox = [lon - d, lat - d, lon + d, lat + d].join(',')
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <input aria-label="Buscar itens" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nome ou descrição" className="w-full rounded border border-neutral-700 bg-neutral-900 text-white placeholder-neutral-500 px-3 py-2" />
        <div className="flex justify-end gap-4">
          <button
            className="rounded border border-orange-600 text-orange-500 px-3 py-1"
            onClick={async () => {
              const ok = await generateCatalogPdf(filtered)
              if (ok) {
                showToast('PDF do catálogo gerado')
                if (navigator.vibrate) navigator.vibrate(30)
              } else {
                showToast('Falha ao gerar PDF')
              }
            }}
          >
            Exportar PDF
          </button>
          <Link to="/carrinho" className="text-orange-400 hover:text-orange-300">Ver carrinho</Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Itens do catálogo">
          {filtered.map(item => (
            <li key={item.id} className={`rounded-lg overflow-hidden bg-neutral-900 shadow transition ${highlightId === item.id ? 'ring-2 ring-orange-500 animate-pulse' : 'hover:ring-2 hover:ring-orange-500'}`} role="listitem">
              {(
                <img
                  src={item.localImage ? `/images/products/${encodeURIComponent(item.localImage)}` : `/images/products/${item.id}.jpg`}
                  alt={item.name}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  data-attempt="local"
                  onError={(e) => {
                    const attempt = e.currentTarget.dataset.attempt
                    if (attempt === 'local' && item.image) {
                      e.currentTarget.dataset.attempt = 'remote'
                      e.currentTarget.src = item.image
                      return
                    }
                    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=OpenBox'
                  }}
                />
              )}
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
                <p className="text-base font-bold text-orange-400">R$ {item.price.toFixed(2)}</p>
                <p className="text-xs text-orange-600">{item.category}</p>
                <button
                  className="mt-2 px-3 py-1 rounded bg-orange-600 text-black hover:bg-orange-500"
                  onClick={(e) => {
                    add(item, 1)
                    showToast(`${item.name} adicionado ao carrinho`)
                    setHighlightId(item.id)
                    if (navigator.vibrate) navigator.vibrate(40)
                    const cartEl = document.getElementById('cart-icon')
                    const imgEl = e.currentTarget.closest('li')?.querySelector('img')
                    if (cartEl && imgEl) {
                      const start = imgEl.getBoundingClientRect()
                      const end = cartEl.getBoundingClientRect()
                      const dot = document.createElement('div')
                      dot.style.position = 'fixed'
                      dot.style.left = `${start.left + start.width / 2}px`
                      dot.style.top = `${start.top + start.height / 2}px`
                      dot.style.width = '10px'
                      dot.style.height = '10px'
                      dot.style.borderRadius = '9999px'
                      dot.style.background = '#ea580c'
                      dot.style.zIndex = '9999'
                      dot.style.pointerEvents = 'none'
                      dot.style.transition = 'transform 700ms ease, opacity 700ms'
                      document.body.appendChild(dot)
                      const dx = end.left + end.width / 2 - (start.left + start.width / 2)
                      const dy = end.top + end.height / 2 - (start.top + start.height / 2)
                      requestAnimationFrame(() => {
                        dot.style.transform = `translate(${dx}px, ${dy}px) scale(0.3)`
                        dot.style.opacity = '0'
                      })
                      setTimeout(() => { dot.remove() }, 750)
                    }
                    setTimeout(() => setHighlightId(null), 1200)
                  }}
                  aria-label={`Adicionar ${item.name} ao carrinho`}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && <p className="text-neutral-400">Nenhum item encontrado.</p>}
        </ul>
      </div>

      <section className="space-y-2" aria-label="Localização">
        <p className="text-xl font-semibold text-white">Olha aonde estamos localizados</p>
        <div className="h-64">
          <iframe title="Localização" src={osmEmbedUrl(coords.lat, coords.lon)} className="h-full w-full rounded border border-orange-600" />
        </div>
      </section>
    </div>
  )
}
