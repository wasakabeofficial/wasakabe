import { useRef } from 'react'
import { useScrollEffect } from '../../../hooks/useScrollEffect'

/** Barra de 2px en la parte superior que avanza con el scroll. */
export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useScrollEffect((scrollY) => {
    const bar = barRef.current
    if (!bar) return

    const max = document.documentElement.scrollHeight - window.innerHeight
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`
  })

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[80] h-[2px] w-full">
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-amethyst to-lavender"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
