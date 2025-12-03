import { useMenu } from '../context/MenuContext.jsx'
import { useState } from 'react'
import { useSettings } from '../context/SettingsContext.jsx'

export default function AdminPage() {
  const { items, createItem, updateItem, deleteItem } = useMenu()
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', tags: '' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', category: '', tags: '' })
  const { settings, setSettings } = useSettings()

  function onSubmit(e) {
    e.preventDefault()
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now())
    createItem({
      id,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    })
    setForm({ name: '', description: '', price: '', category: '', tags: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Administração</h1>
      <section aria-label="Configurações">
        <h2 className="text-xl font-semibold mb-2">Configurações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Símbolo da moeda</label>
            <input value={settings.symbol || ''} onChange={e => setSettings({ ...settings, symbol: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Backend URL (opcional)</label>
            <input value={settings.backendUrl || ''} onChange={e => setSettings({ ...settings, backendUrl: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" placeholder="https://exemplo.com/api" />
          </div>
        </div>
      </section>
      <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Nome</label>
          <input id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Categoria</label>
          <input id="category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium">Descrição</label>
          <textarea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium">Preço</label>
          <input id="price" type="number" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium">Tags (separadas por vírgula)</label>
          <input id="tags" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="mt-1 w-full rounded border px-2 py-1" />
        </div>
        <div className="sm:col-span-2">
          <button className="px-3 py-2 rounded bg-blue-600 text-white">Adicionar item</button>
        </div>
      </form>

      <section>
        <h2 className="text-xl font-semibold mb-2">Itens atuais</h2>
        <ul className="divide-y">
          {items.map(i => (
            <li key={i.id} className="py-3">
              {editingId === i.id ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="rounded border px-2 py-1" />
                    <input value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className="rounded border px-2 py-1" />
                    <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="sm:col-span-2 rounded border px-2 py-1" />
                    <input type="number" min="0" step="0.01" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} className="rounded border px-2 py-1" />
                    <input value={editForm.tags} onChange={e => setEditForm({ ...editForm, tags: e.target.value })} className="rounded border px-2 py-1" />
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded bg-blue-600 text-white" onClick={() => {
                      updateItem({
                        ...i,
                        name: editForm.name,
                        description: editForm.description,
                        price: Number(editForm.price),
                        category: editForm.category,
                        tags: editForm.tags ? editForm.tags.split(',').map(t => t.trim()).filter(Boolean) : []
                      })
                      setEditingId(null)
                    }}>Salvar</button>
                    <button className="px-2 py-1 rounded border" onClick={() => setEditingId(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-600">R$ {i.price.toFixed(2)} • {i.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded border" onClick={() => deleteItem(i.id)}>Excluir</button>
                    <button className="px-2 py-1 rounded border" onClick={() => updateItem({ ...i, price: i.price + 1 })}>+1 R$</button>
                    <button className="px-2 py-1 rounded border" onClick={() => { setEditingId(i.id); setEditForm({ name: i.name, description: i.description, price: String(i.price), category: i.category, tags: (i.tags || []).join(', ') }) }}>Editar</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
