import { useRef, type MouseEvent, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Inclinación máxima en grados. */
  max?: number
}

/** Tarjeta que se inclina hacia el cursor, con un brillo suave que lo sigue. */
export default function TiltCard({ children, className = '', max = 5 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card || reduced) return

    const box = card.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height

    card.style.transform = `perspective(1000px) rotateX(${((y - 0.5) * -2 * max).toFixed(2)}deg) rotateY(${((x - 0.5) * 2 * max).toFixed(2)}deg)`

    const glare = glareRef.current
    if (glare) {
      glare.style.opacity = '1'
      glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(191, 195, 235, 0.15) 0%, transparent 60%)`
    }
  }

  const onLeave = () => {
    const card = cardRef.current
    if (card) card.style.transform = ''
    if (glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-300 ease-out-expo ${className}`}
    >
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  )
}
