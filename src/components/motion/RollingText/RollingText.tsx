import type { CSSProperties } from 'react'
import './RollingText.css'

interface RollingTextProps {
  text: string
}

/**
 * Cada letra rueda hacia arriba y es reemplazada por un duplicado.
 * Se activa cuando el elemento padre tiene la clase `rolling-host` y recibe hover o foco.
 */
export default function RollingText({ text }: RollingTextProps) {
  return (
    <span className="rolling-text" aria-label={text}>
      <span aria-hidden="true" className="inline-flex">
        {[...text].map((char, index) => {
          const visible = char === ' ' ? ' ' : char
          return (
            <span key={`${char}-${index}`} className="rolling-char" style={{ '--i': index } as CSSProperties}>
              <span>{visible}</span>
              <span className="text-lavender">{visible}</span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
