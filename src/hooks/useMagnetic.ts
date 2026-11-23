import { useEffect, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface MagneticOptions {
  /** Distancia (px) desde el borde del elemento en la que empieza a atraerse. */
  range?: number
  /** Desplazamiento máximo (px). */
  strength?: number
}

/** Atrae el elemento hacia el cursor cuando este se acerca. */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  { range = 80, strength = 8 }: MagneticOptions = {},
): void {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reduced) return

    const onMove = (event: MouseEvent) => {
      const box = element.getBoundingClientRect()
      const gapX = Math.max(box.left - event.clientX, 0, event.clientX - box.right)
      const gapY = Math.max(box.top - event.clientY, 0, event.clientY - box.bottom)
      const gap = Math.hypot(gapX, gapY)

      if (gap >= range) {
        element.style.transform = ''
        return
      }

      const dx = event.clientX - (box.left + box.width / 2)
      const dy = event.clientY - (box.top + box.height / 2)
      const length = Math.hypot(dx, dy) || 1
      const pull = (range - gap) / range

      element.style.transform = `translate(${((dx / length) * pull * strength).toFixed(2)}px, ${((dy / length) * pull * strength).toFixed(2)}px)`
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      element.style.transform = ''
    }
  }, [ref, reduced, range, strength])
}
