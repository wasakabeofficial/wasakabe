import { useEffect, useRef } from 'react'
import { SECTIONS } from '../../../data/sections'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'

const WORDMARK = [...'WASAKABE']
const REACH = 140

/** Pie de página con el nombre gigante: cada letra se eleva al acercar el cursor. */
export default function Footer() {
  const reduced = usePrefersReducedMotion()
  const letters = useRef<Array<HTMLSpanElement | null>>([])

  useEffect(() => {
    if (reduced) return

    const onMove = (event: MouseEvent) => {
      letters.current.forEach((letter) => {
        if (!letter) return

        const box = letter.getBoundingClientRect()
        const distance = Math.hypot(
          event.clientX - (box.left + box.width / 2),
          event.clientY - (box.top + box.height / 2),
        )

        if (distance < REACH) {
          const strength = (REACH - distance) / REACH
          letter.style.transform = `translateY(-${(strength * 24).toFixed(1)}px) scale(${(1 + strength * 0.08).toFixed(3)})`
        } else {
          letter.style.transform = ''
        }
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  return (
    <footer className="hairline-t w-full select-none bg-deep px-6 pb-12 pt-20 text-lightpurple md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col">
        <div className="mb-14 w-full overflow-hidden border-b border-lightpurple/15 pb-8">
          <h2
            aria-label="WASAKABE"
            className="flex justify-between whitespace-nowrap font-serif text-[15vw] font-normal leading-[0.85] tracking-[-0.03em] text-white/95"
          >
            {WORDMARK.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                ref={(element) => {
                  letters.current[index] = element
                }}
                aria-hidden="true"
                className="inline-block transition-transform duration-200"
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 pb-14 md:grid-cols-12">
          <div className="flex flex-col md:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-lavender/70 font-serif text-xs text-white">
                WK
              </span>
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-white">WASAKABE</span>
            </div>
            <p className="max-w-sm font-sans text-xs leading-relaxed text-lightpurple/70">
              Software, artificial intelligence, networks and creative production for businesses of every size.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col md:col-span-4">
            <span className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-lavender">Index</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              {SECTIONS.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="transition-colors hover:text-white">
                  {section.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex flex-col md:col-span-3">
            <span className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-lavender">Governance</span>
            <div className="flex flex-col gap-2.5 text-xs">
              <a href="#" className="transition-colors hover:text-white">
                Privacy notice
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms and conditions
              </a>
            </div>
          </div>
        </div>

        <p className="border-t border-lightpurple/10 pt-8 text-xs text-lightpurple/60">
          © 2026 WASAKABE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
