import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Página não encontrada</h1>
      <Link to="/" className="text-blue-600">Ir para o cardápio</Link>
    </div>
  )
}
