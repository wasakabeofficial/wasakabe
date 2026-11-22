import type { CSSProperties } from 'react'
import type { GlyphKey } from '../../../types'
import './ServiceGlyph.css'

interface ServiceGlyphProps {
  name: GlyphKey
}

/** Símbolo de cada área de servicio, dibujado alrededor de (0, 0) dentro de un SVG. */
export default function ServiceGlyph({ name }: ServiceGlyphProps) {
  switch (name) {
    case 'software':
      return (
        <>
          <path className="glyph" d="M-3.5 -5 L-9 0 L-3.5 5" />
          <path className="glyph" d="M3.5 -5 L9 0 L3.5 5" />
          <path className="glyph" d="M1.5 -7 L-1.5 7" />
        </>
      )
    case 'ai':
      return (
        <>
          <path className="glyph" d="M-7 -5 L7 0 M-7 0 L7 0 M-7 5 L7 0" />
          {[
            [-7, -5],
            [-7, 0],
            [-7, 5],
            [7, 0],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} className="glyph-fill" cx={x} cy={y} r="1.8" />
          ))}
        </>
      )
    case 'networks':
      return (
        <>
          <path className="glyph" d="M0 0 L-7 -6 M0 0 L7 -6 M0 0 L0 8" />
          {[
            [0, 0],
            [-7, -6],
            [7, -6],
            [0, 8],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} className="glyph-fill" cx={x} cy={y} r="1.9" />
          ))}
        </>
      )
    case 'creative':
      return (
        <>
          {[0, 1, 2, 3, 4].map((bar) => (
            <rect
              key={bar}
              className="eq-bar glyph-fill"
              x={-9 + bar * 4.5}
              y={-7}
              width="2"
              height="14"
              rx="1"
              style={{ '--k': bar } as CSSProperties}
            />
          ))}
        </>
      )
    case 'planning':
      return <path className="glyph glyph-bold" d="M-8 -5 H0 M-4 0 H8 M-6 5 H4" />
    default:
      return null
  }
}
