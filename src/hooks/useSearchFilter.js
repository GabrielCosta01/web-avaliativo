import { useMemo, useState } from 'react'

export default function useSearchFilter(items) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [tag, setTag] = useState('')

  const filtered = useMemo(() => {
    return items.filter(i => {
      const q = query.trim().toLowerCase()
      const matchesQuery = q ? (i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)) : true
      const matchesCategory = category ? i.category === category : true
      const matchesPrice = maxPrice ? i.price <= Number(maxPrice) : true
      const matchesTag = tag ? Array.isArray(i.tags) && i.tags.includes(tag) : true
      return matchesQuery && matchesCategory && matchesPrice && matchesTag
    })
  }, [items, query, category, maxPrice, tag])

  const tags = useMemo(() => {
    const t = new Set()
    items.forEach(i => (i.tags || []).forEach(x => t.add(x)))
    return Array.from(t)
  }, [items])

  const categories = useMemo(() => {
    const c = new Set(items.map(i => i.category))
    return Array.from(c)
  }, [items])

  return {
    filtered,
    query,
    setQuery,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    tag,
    setTag,
    tags,
    categories
  }
}
