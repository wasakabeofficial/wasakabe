import { useEffect, useRef, type CSSProperties } from 'react'
import SectionTransition from '../../components/motion/SectionTransition'
import Button from '../../components/ui/Button'
import Eyebrow from '../../components/ui/Eyebrow'
import ImageSlot from '../../components/ui/ImageSlot'
import Accent from '../../components/ui/Accent'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './Hero.css'

interface HeroProps {
  /** true cuando la cortina del preloader ya subió: arranca la animación de entrada. */
  ready: boolean
}

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

export default function Hero({ ready }: HeroProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  // La imagen sigue al cursor como un "eye tracker": se inclina hasta 6°.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame || reduced) return

    const onMove = (event: MouseEvent) => {
      const box = frame.getBoundingClientRect()
      const dx = (event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2)
      const dy = (event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2)

      frame.style.transform = `perspective(900px) rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      frame.style.transform = ''
    }
  }, [reduced])

  return (
    <SectionTransition
      id="home"
      className="flex min-h-screen flex-col overflow-hidden bg-deep"
      innerClassName="flex flex-1 flex-col"
    >
      <div
        className="hero relative flex flex-1 flex-col justify-center px-6 pb-16 pt-28 md:px-12 lg:px-20"
        data-ready={ready}
      >
        <div className="z-10 mx-auto my-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start pt-4 lg:col-span-7">
            <div className="hero-fade mb-6" style={delay(0)}>
              <Eyebrow>SOFTWARE · AI · NETWORKS · PRODUCTION</Eyebrow>
            </div>

            <h1 className="mb-8 select-none font-serif text-[42px] font-normal leading-[1.04] tracking-[-0.02em] text-white sm:text-[60px] md:text-[72px] lg:text-[84px]">
              <span className="hero-mask">
                <span className="hero-line" style={delay(100)}>
                  Engineering that
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line" style={delay(240)}>
                  holds up under <Accent>real</Accent>
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line" style={delay(380)}>
                  pressure.
                </span>
              </span>
            </h1>

            <p
              className="hero-fade mb-10 max-w-xl font-sans text-base leading-relaxed text-lightpurple opacity-90 md:text-lg"
              style={delay(520)}
            >
              WASAKABE designs and builds software, AI systems and creative production for businesses of every size.
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-4" style={delay(640)}>
              <Button href="#contact">Start a conversation</Button>
              <Button href="#services" variant="outline">
                Our services
              </Button>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:col-span-5">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="absolute h-[390px] w-[390px] animate-pulse rounded-full border border-lavender/15" />
              <div className="absolute h-[280px] w-[280px] rounded-full border border-lavender/15" />
              <div className="absolute h-[180px] w-[180px] rounded-full border border-lavender/15" />
            </div>

            <div
              ref={frameRef}
              className="relative aspect-[4/5] w-full max-w-md cursor-crosshair overflow-hidden border border-lavender/25 bg-deep shadow-2xl transition-transform duration-100 ease-out"
            >
              <div className="hero-image h-full w-full">
                <ImageSlot
                  name="server-corridor"
                  fallbacks={['wk-logo']}
                  alt="WASAKABE infrastructure"
                  eager
                  className="pointer-events-none select-none contrast-125 mix-blend-luminosity"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-ultraviolet opacity-60 mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-deep opacity-50 mix-blend-color" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-deep/90 via-transparent to-transparent" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between text-[10px] uppercase tracking-widest text-lightpurple/80">
                <span>System architecture</span>
                <span>WASAKABE</span>
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-8 left-6 z-10 hidden select-none items-center gap-3 md:left-12 md:flex lg:left-20"
        >
          <div className="relative h-12 w-px overflow-hidden bg-lightpurple/20">
            <div className="scroll-cue-pulse absolute left-0 top-0 h-5 w-full bg-lavender" />
          </div>
          <span className="origin-left translate-y-2 -rotate-90 text-[10px] uppercase tracking-[0.25em] text-lightpurple/60">
            Scroll
          </span>
        </div>
      </div>
    </SectionTransition>
  )
}
