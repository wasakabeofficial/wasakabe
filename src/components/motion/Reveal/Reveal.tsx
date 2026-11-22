import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import './Reveal.css'

/*
 * Aparece al entrar en pantalla y se REPITE cada vez que vuelve a entrar,
 * hacia abajo o hacia arriba:
 *  - 'below': espera debajo de la pantalla (entra desde abajo al bajar).
 *  - 'above': salió por arriba (entra desde arriba al subir).
 */
type RevealState = 'below' | 'above' | 'shown'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Retardo de entrada en milisegundos (escalonado). */
  delay?: number
}

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<RevealState>('below')
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setState('shown')
        else setState(entry.boundingClientRect.top < 0 ? 'above' : 'below')
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-state={reduced ? 'shown' : state}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
