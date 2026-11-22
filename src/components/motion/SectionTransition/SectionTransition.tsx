import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { useScrollEffect } from '../../../hooks/useScrollEffect'

interface SectionTransitionProps {
  id: string
  children: ReactNode
  /** Clases de la sección (fondo, color de texto). */
  className?: string
  /** Clases del contenedor interno (espaciado, layout). */
  innerClassName?: string
  /** Color de la sección anterior (CSS), para suavizar el borde superior. */
  from?: string
  /** Si es false, el contenido no se atenúa al salir (útil en la última sección). */
  exit?: boolean
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/*
 * Envoltorio de cada sección con transición en ambos sentidos del scroll:
 *  - Degradado superior desde el color de la sección anterior (sin corte brusco).
 *  - Línea fina que se dibuja en el borde al cruzar la pantalla.
 *  - Al salir por arriba, el contenido se atenúa, sube y se reduce un poco;
 *    al volver, se revierte exactamente.
 */
export default function SectionTransition({
  id,
  children,
  className = '',
  innerClassName = '',
  from,
  exit = true,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const edgeRef = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useScrollEffect(() => {
    const section = sectionRef.current
    if (!section || reduced) return

    const viewport = window.innerHeight
    const box = section.getBoundingClientRect()

    const edge = edgeRef.current
    if (edge) {
      edge.style.transform = `scaleX(${clamp((viewport * 0.9 - box.top) / (viewport * 0.5))})`
    }

    const content = contentRef.current
    if (content && exit) {
      const start = viewport * 0.6
      const end = viewport * 0.1
      const progress = clamp((start - box.bottom) / (start - end))

      if (progress > 0) {
        content.style.opacity = String(1 - progress * 0.6)
        content.style.transform = `translateY(${(-24 * progress).toFixed(1)}px) scale(${(1 - 0.04 * progress).toFixed(3)})`
      } else {
        content.style.opacity = ''
        content.style.transform = ''
      }
    }
  })

  return (
    <section id={id} ref={sectionRef} className={`relative w-full ${className}`}>
      {from && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28"
            style={{ background: `linear-gradient(to bottom, ${from}, transparent)` }}
          />
          <span
            ref={edgeRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left bg-lavender/60"
            style={{ transform: reduced ? 'scaleX(1)' : 'scaleX(0)' }}
          />
        </>
      )}
      <div ref={contentRef} className={`relative z-10 ${innerClassName}`}>
        {children}
      </div>
    </section>
  )
}
