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
  /** Color de la sección anterior (CSS). Junto con `tone` activa la mezcla suave del borde superior. */
  from?: string
  /** Color de fondo de esta sección (CSS); es el color al que llega la mezcla. */
  tone?: string
  /** Si es false, el contenido no se atenúa al salir (útil en la última sección). */
  exit?: boolean
}

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Altura de la mezcla: cabe en el relleno inferior de la sección anterior (7rem en móvil, 9rem desde md). */
const BLEND_HEIGHT = '9rem'

/**
 * Degradado de `from` a `tone` con curva suave (smoothstep) e interpolación en OKLab.
 * Un degradado lineal en sRGB entre un morado oscuro y uno claro pasa por grises
 * apagados y se nota el inicio y el final; con la curva y OKLab se mantiene el tono.
 */
function blendBackground(from: string, tone: string): string {
  const stops = Array.from({ length: 11 }, (_, index) => {
    const t = index / 10
    const mix = Math.round((3 * t * t - 2 * t * t * t) * 100)
    return `color-mix(in oklab, ${tone} ${mix}%, ${from}) ${index * 10}%`
  })
  return `linear-gradient(in oklab to bottom, ${stops.join(', ')})`
}

/*
 * Envoltorio de cada sección con transición en ambos sentidos del scroll:
 *  - Mezcla de color en el borde: el degradado vive en el relleno vacío al final de la
 *    sección anterior y termina exactamente en el color de esta, sin costura.
 *  - Al salir por arriba, el contenido se atenúa, sube y se reduce un poco;
 *    al volver, se revierte exactamente.
 */
export default function SectionTransition({
  id,
  children,
  className = '',
  innerClassName = '',
  from,
  tone,
  exit = true,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useScrollEffect(() => {
    const section = sectionRef.current
    if (!section || reduced) return

    const viewport = window.innerHeight
    const box = section.getBoundingClientRect()

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
      {from && tone && from !== tone && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-0"
          style={{
            top: `calc(${BLEND_HEIGHT} * -1)`,
            height: BLEND_HEIGHT,
            background: blendBackground(from, tone),
          }}
        />
      )}
      <div ref={contentRef} className={`relative z-10 ${innerClassName}`}>
        {children}
      </div>
    </section>
  )
}
