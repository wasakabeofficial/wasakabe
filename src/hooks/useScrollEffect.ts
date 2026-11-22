import { useEffect, useRef } from 'react'

/**
 * Ejecuta `callback` con el scroll actual, como máximo una vez por frame.
 * También se ejecuta al montar y al cambiar el tamaño de la ventana.
 */
export function useScrollEffect(callback: (scrollY: number) => void): void {
  const latest = useRef(callback)

  useEffect(() => {
    latest.current = callback
  })

  useEffect(() => {
    let ticking = false

    const run = () => {
      latest.current(window.scrollY)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(run)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    run()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
