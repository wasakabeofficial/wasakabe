import type { ReactNode } from 'react'

interface AccentProps {
  children: ReactNode
  /** 'light' sobre fondos oscuros (lavanda), 'dark' sobre el fondo claro (ultravioleta). */
  tone?: 'light' | 'dark'
}

/** Palabra en cursiva que acentúa un titular. */
export default function Accent({ children, tone = 'light' }: AccentProps) {
  return <em className={`font-normal italic ${tone === 'dark' ? 'text-ultraviolet' : 'text-lavender'}`}>{children}</em>
}
