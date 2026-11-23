import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { MdNorthEast } from 'react-icons/md'
import { CHANNELS } from '../../data/channels'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { playTick } from '../../lib/sound'
import Reveal from '../../components/motion/Reveal'
import SectionTransition from '../../components/motion/SectionTransition'
import Accent from '../../components/ui/Accent'
import ImageSlot from '../../components/ui/ImageSlot'
import SectionHeading from '../../components/ui/SectionHeading'
import './Channels.css'

export default function Channels() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(false)
  const [previewName, setPreviewName] = useState(CHANNELS[0].preview)
  const followerRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const position = useRef({ x: 0, y: 0 })

  // La imagen sigue al cursor con retraso, solo mientras hay una fila en hover.
  useEffect(() => {
    if (!active || reduced) return

    let frame = 0

    const loop = () => {
      position.current.x += (pointer.current.x - position.current.x) * 0.15
      position.current.y += (pointer.current.y - position.current.y) * 0.15

      const follower = followerRef.current
      if (follower) {
        follower.style.left = `${position.current.x}px`
        follower.style.top = `${position.current.y}px`
      }

      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [active, reduced])

  const onEnter = (event: MouseEvent, preview: string) => {
    pointer.current = { x: event.clientX, y: event.clientY }
    position.current = { x: event.clientX, y: event.clientY }
    setPreviewName(preview)
    setActive(true)
    playTick(850, 'sine', 0.02)
  }

  const onMove = (event: MouseEvent) => {
    pointer.current.x = event.clientX
    pointer.current.y = event.clientY
  }

  return (
    <SectionTransition
      id="channels"
      from="var(--color-ultraviolet)"
      tone="var(--color-deep)"
      className="bg-deep text-white"
      innerClassName="px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <Reveal className="mb-16">
          <SectionHeading eyebrow="04 — CHANNELS">
            Follow the <Accent>work</Accent>
          </SectionHeading>
        </Reveal>

        <ul className="hairline-t" onMouseMove={onMove}>
          {CHANNELS.map((channel, index) => (
            <Reveal key={channel.id} as="li" delay={index * 90}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(event) => onEnter(event, channel.preview)}
                onMouseLeave={() => setActive(false)}
                className="channel-row group hairline-b flex items-center justify-between px-4 py-10 md:px-6 md:py-12"
              >
                <span className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-serif text-3xl text-white transition-colors group-hover:text-lavender sm:text-4xl md:text-5xl">
                    {channel.name}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-lightpurple/60 transition-colors group-hover:text-lavender">
                    {channel.handle}
                  </span>
                </span>
                <span className="flex items-center gap-3 text-lightpurple transition-colors group-hover:text-white">
                  <span className="hidden text-xs uppercase tracking-widest sm:inline">{channel.tag}</span>
                  <MdNorthEast size={24} className="channel-arrow" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Fuera de la sección: su posición fija no depende de ninguna transformación. */}
      {!reduced &&
        createPortal(
          <div ref={followerRef} aria-hidden="true" className={`channel-follower ${active ? 'is-active' : ''}`}>
            <ImageSlot name={previewName} alt="Channel preview" className="contrast-125 mix-blend-luminosity opacity-85" />
            <div className="absolute inset-0 bg-ultraviolet/40 mix-blend-multiply" />
          </div>,
          document.body,
        )}
    </SectionTransition>
  )
}
