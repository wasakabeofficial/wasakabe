import type { ReactNode } from 'react'
import './Eyebrow.css'

interface EyebrowProps {
  children: ReactNode
  /** 'light' sobre fondos oscuros, 'dark' sobre el fondo claro. */
  tone?: 'light' | 'dark'
  className?: string
}

/** Etiqueta de sección en mayúsculas, con una línea fina de 36px al inicio. */
export default function Eyebrow({ children, tone = 'light', className = '' }: EyebrowProps) {
  const color = tone === 'dark' ? 'text-ultraviolet' : 'text-lavender'

  return (
    <span
      className={`eyebrow block text-[11px] font-semibold uppercase tracking-[0.22em] md:text-xs ${color} ${className}`}
    >
      {children}
    </span>
  )
}
