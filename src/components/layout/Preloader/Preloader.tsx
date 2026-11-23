import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'

const MIN_MS = 900
const LIFT_MS = 800

interface PreloaderProps {
  /** Se llama cuando la cortina empieza a subir. */
  onDone: () => void
}

/**
 * Contador 000 → 100 atado a la carga real de la página (fuentes y recursos),
 * con un mínimo de 900 ms. Al terminar, una cortina sube y deja ver el hero.
 */
export default function Preloader({ onDone }: PreloaderProps) {
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const [lifted, setLifted] = useState(false)
  const [gone, setGone] = useState(false)
  const target = useRef(20)
  const mountedAt = useRef(0)
  const doneRef = useRef(onDone)

  useEffect(() => {
    doneRef.current = onDone
  })

  // Con movimiento reducido no hay cortina: el hero se muestra de inmediato.
  useEffect(() => {
    if (reduced) doneRef.current()
  }, [reduced])

  // Señales reales de carga: cada una sube la meta del contador.
  useEffect(() => {
    mountedAt.current = performance.now()

    const raise = (value: number) => {
      target.current = Math.max(target.current, value)
    }

    void document.fonts?.ready.then(() => raise(60))

    const onLoad = () => raise(100)
    if (document.readyState === 'complete') raise(100)
    else window.addEventListener('load', onLoad, { once: true })

    return () => window.removeEventListener('load', onLoad)
  }, [])

  // El contador avanza suavemente hacia la meta.
  useEffect(() => {
    if (reduced) return

    const timer = window.setInterval(() => {
      setCount((current) => {
        const goal = target.current
        return current < goal ? Math.min(goal, current + Math.max(1, Math.ceil((goal - current) * 0.15))) : current
      })
    }, 30)

    return () => window.clearInterval(timer)
  }, [reduced])

  // Al llegar a 100 (y pasar el mínimo), sube la cortina.
  useEffect(() => {
    if (count < 100 || reduced) return

    const wait = Math.max(0, MIN_MS - (performance.now() - mountedAt.current))
    const lift = window.setTimeout(() => {
      setLifted(true)
      doneRef.current()
    }, wait)
    const remove = window.setTimeout(() => setGone(true), wait + LIFT_MS)

    return () => {
      window.clearTimeout(lift)
      window.clearTimeout(remove)
    }
  }, [count, reduced])

  // Sin scroll mientras la cortina cubre la página.
  useEffect(() => {
    if (reduced || lifted) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [reduced, lifted])

  if (gone || reduced) return null

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-hidden={lifted}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deep transition-transform duration-700 ease-curtain ${
        lifted ? '-translate-y-full' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center border border-lavender/60 bg-ultraviolet/40 font-serif text-lg tracking-widest text-white">
          WK
        </div>
        <div className="flex items-baseline font-serif text-5xl tracking-tight text-white md:text-6xl">
          <span>{String(count).padStart(3, '0')}</span>
          <span className="ml-1 font-sans text-xl font-light text-lavender">/ 100</span>
        </div>
        <div className="relative mt-2 h-px w-48 overflow-hidden bg-lightpurple/20">
          <div className="h-full bg-lavender transition-[width] duration-100 ease-out" style={{ width: `${count}%` }} />
        </div>
        <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-lightpurple/60">Loading</span>
      </div>
    </div>
  )
}
