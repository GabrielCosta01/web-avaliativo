import { useEffect, useState } from 'react'
import { useSettings } from '../context/SettingsContext.jsx'
import { useMenu } from '../context/MenuContext.jsx'

export default function useBackendSync() {
  const { settings } = useSettings()
  const { items, createItem } = useMenu()
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!settings.backendUrl) return
    const controller = new AbortController()
    async function sync() {
      setStatus('syncing')
      try {
        const res = await fetch(`${settings.backendUrl}/menu`, { signal: controller.signal })
        if (!res.ok) throw new Error('sync_failed')
        const data = await res.json()
        if (Array.isArray(data)) {
          data.forEach(d => {
            if (!items.find(i => i.id === d.id)) createItem(d)
          })
        }
        setStatus('done')
      } catch {
        setStatus('error')
      }
    }
    sync()
    return () => controller.abort()
  }, [settings.backendUrl])

  return { status }
}
