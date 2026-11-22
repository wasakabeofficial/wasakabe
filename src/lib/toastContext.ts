import { createContext } from 'react'

export interface ToastApi {
  push: (message: string) => void
}

export const ToastContext = createContext<ToastApi | null>(null)
