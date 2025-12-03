export default function FilterBar({ maxPrice, setMaxPrice, tag, setTag, tags }) {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço máximo</label>
        <input id="price" type="number" min="0" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="mt-1 w-40 rounded border px-2 py-1" />
      </div>
      <div>
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">Tag</label>
        <select id="tag" value={tag} onChange={e => setTag(e.target.value)} className="mt-1 w-40 rounded border px-2 py-1">
          <option value="">Todas</option>
          {tags.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
