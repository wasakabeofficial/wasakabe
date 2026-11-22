import { useRef } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { useScrollEffect } from '../../../hooks/useScrollEffect'

interface ScrollQuoteProps {
  text: string
  className?: string
}

/** Cita cuyas palabras pasan de 30% a 100% de opacidad según el scroll. */
export default function ScrollQuote({ text, className = '' }: ScrollQuoteProps) {
  const containerRef = useRef<HTMLQuoteElement>(null)
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([])
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  useScrollEffect(() => {
    const container = containerRef.current
    if (!container || reduced) return

    const viewport = window.innerHeight
    const box = container.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (viewport - box.top) / (viewport * 0.7)))

    wordRefs.current.forEach((word, index) => {
      if (!word) return
      const lit = Math.min(1, Math.max(0, ratio * words.length - index))
      word.style.opacity = String(0.3 + lit * 0.7)
    })
  })

  return (
    <blockquote ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          ref={(element) => {
            wordRefs.current[index] = element
          }}
          className="inline-block transition-opacity duration-300"
          style={{ opacity: reduced ? 1 : 0.3 }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </blockquote>
  )
}
