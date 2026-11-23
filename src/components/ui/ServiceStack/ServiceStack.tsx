import { useState, type CSSProperties, type ReactNode } from 'react'
import { ORBITS } from '../../../data/orbit'
import { SERVICES } from '../../../data/services'
import { playTick } from '../../../lib/sound'
import ServiceGlyph from '../ServiceGlyph'
import './ServiceStack.css'

/* Geometría de cada placa isométrica (proporción 2:1), centrada en (0, 0). */
const W = 96
const H = 48
const THICKNESS = 10
const TOP = `0,${-H} ${W},0 0,${H} ${-W},0`
const LEFT = `${-W},0 0,${H} 0,${H + THICKNESS} ${-W},${THICKNESS}`
const RIGHT = `${W},0 0,${H} 0,${H + THICKNESS} ${W},${THICKNESS}`

interface PlateProps {
  index: number
  active: boolean
  children: ReactNode
}

/**
 * Posiciona una placa (o su etiqueta) en la pila. Las dos capas del dibujo usan
 * estos mismos envoltorios, así la placa y su etiqueta se mueven siempre juntas.
 */
function Plate({ index, active, children }: PlateProps) {
  return (
    <g className={`plate-pos ${active ? 'is-active' : ''}`} style={{ '--i': index } as CSSProperties}>
      <g className="plate-float">
        <g className={`plate-lift ${active ? 'is-active' : ''}`}>{children}</g>
      </g>
    </g>
  )
}

/**
 * Vista explosionada: los cinco servicios de WASAKABE como capas de un mismo sistema,
 * flotando sin marco. Al pasar el cursor la pila se abre; la capa señalada se eleva,
 * el resto se atenúa y abajo se lee qué incluye.
 */
export default function ServiceStack() {
  const [active, setActive] = useState<number | null>(null)

  const entries = ORBITS.map((orbit, index) => ({
    orbit,
    index,
    service: SERVICES.find((item) => item.id === orbit.serviceId),
  }))

  const current = active === null ? null : entries[active]

  const activate = (index: number) => {
    setActive(index)
    playTick(520 + index * 90, 'sine', 0.03)
  }

  const clear = () => setActive(null)

  return (
    <div className="flex w-full flex-col">
      <svg
        viewBox="0 0 620 600"
        role="group"
        aria-label="WASAKABE service areas as layers of one system"
        className="stack-stage h-auto w-full overflow-visible"
        data-active={active ?? undefined}
      >
        <defs>
          <linearGradient id="plate-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-amethyst)', stopOpacity: 0.55 }} />
            <stop offset="1" style={{ stopColor: 'var(--color-ultraviolet)', stopOpacity: 0.95 }} />
          </linearGradient>
          <radialGradient id="stack-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0" style={{ stopColor: 'var(--color-lavender)', stopOpacity: 0.16 }} />
            <stop offset="1" style={{ stopColor: 'var(--color-lavender)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        <ellipse cx="170" cy="300" rx="230" ry="290" fill="url(#stack-aura)" />

        {/* Eje del sistema: una señal lo recorre de arriba abajo */}
        <g aria-hidden="true">
          <line className="stack-axis" x1="170" y1="20" x2="170" y2="580" />
          <circle className="stack-signal" cx="170" cy="20" r="2.5" />
        </g>

        {/* Capa visual: de abajo hacia arriba, para que las placas altas tapen a las bajas */}
        <g aria-hidden="true">
          {[...entries].reverse().map(({ orbit, index }) => (
            <a
              key={orbit.serviceId}
              href="#services"
              tabIndex={-1}
              className="plate-link"
              onMouseEnter={() => activate(index)}
              onMouseLeave={clear}
            >
              <Plate index={index} active={active === index}>
                <polygon className="plate-left" points={LEFT} />
                <polygon className="plate-right" points={RIGHT} />
                <polygon className="plate-top" points={TOP} />
                <g className="plate-glyph" transform="scale(1 0.5) rotate(45) scale(1.9)">
                  <ServiceGlyph name={orbit.glyph} />
                </g>
              </Plate>
            </a>
          ))}
        </g>

        {/* Capa de etiquetas: en orden lógico (01 → 05) para el teclado y los lectores de pantalla */}
        {entries.map(({ orbit, index, service }) => (
          <a
            key={orbit.serviceId}
            href="#services"
            className="plate-link"
            aria-label={`${service?.title ?? orbit.serviceId}: ${orbit.caption}`}
            onMouseEnter={() => activate(index)}
            onMouseLeave={clear}
            onFocus={() => activate(index)}
            onBlur={clear}
          >
            <Plate index={index} active={active === index}>
              <rect className="plate-label-hit" x={W + 36} y="-26" width="290" height="52" />
              <line className="plate-leader" x1={W + 6} y1="0" x2={W + 46} y2="0" />
              <text className="plate-num" x={W + 58} y="-8">
                0{index + 1}
              </text>
              <text className="plate-title" x={W + 58} y="15">
                {service?.title}
              </text>
            </Plate>
          </a>
        ))}
      </svg>

      <div
        key={active ?? 'idle'}
        aria-live="polite"
        className="pointer-events-none mt-2 flex min-h-12 animate-[fade-in_0.3s_ease-out_both] flex-col justify-start gap-1 text-[10px] uppercase tracking-widest text-lightpurple/80"
      >
        {current?.service ? (
          <>
            <span className="text-lavender">
              0{current.index + 1} · {current.service.title}
            </span>
            <span className="text-xs normal-case tracking-normal text-lightpurple/90">{current.orbit.caption}</span>
          </>
        ) : (
          <span className="flex justify-between">
            <span>Five layers</span>
            <span>One system</span>
          </span>
        )}
      </div>
    </div>
  )
}
