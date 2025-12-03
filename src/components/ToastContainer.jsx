import { useUI } from '../context/UIContext.jsx'

export default function ToastContainer() {
  const { toasts } = useUI()
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="rounded-lg bg-neutral-900/90 text-orange-400 border border-orange-700 px-4 py-2 shadow">
          {t.message}
        </div>
      ))}
    </div>
  )
}
