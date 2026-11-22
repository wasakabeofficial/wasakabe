import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext } from '../../../lib/toastContext'
import Toast from './Toast'

interface ToastItem {
  id: number
  message: string
  leaving: boolean
}

const VISIBLE_MS = 4000
const LEAVE_MS = 400

/**
 * Colócalo en la raíz de la página: el contenedor de avisos queda fuera de
 * las secciones, así su posición fija no depende de ninguna transformación.
 */
export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const push = useCallback((message: string) => {
    const id = nextId.current++

    setToasts((current) => [...current, { id, message, leaving: false }])

    window.setTimeout(() => {
      setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)))
    }, VISIBLE_MS)

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, VISIBLE_MS + LEAVE_MS)
  }, [])

  const api = useMemo(() => ({ push }), [push])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[90] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} leaving={toast.leaving} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
