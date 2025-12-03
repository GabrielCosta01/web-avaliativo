import { NavLink } from 'react-router-dom'

export default function CategoryNav({ categories }) {
  return (
    <nav aria-label="Categorias" className="flex flex-wrap gap-2 mb-4">
      <NavLink to="/" className={({ isActive }) => isActive ? 'px-3 py-1 bg-blue-100 text-blue-700 rounded' : 'px-3 py-1 bg-gray-100 text-gray-700 rounded'}>
        Todas
      </NavLink>
      {categories.map(c => (
        <NavLink key={c} to={`/categorias/${c}`} className={({ isActive }) => isActive ? 'px-3 py-1 bg-blue-100 text-blue-700 rounded' : 'px-3 py-1 bg-gray-100 text-gray-700 rounded'}>
          {c}
        </NavLink>
      ))}
    </nav>
  )
}
