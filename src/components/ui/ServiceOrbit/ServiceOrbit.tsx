import { useState, type CSSProperties } from 'react'
import { ORBITS } from '../../../data/orbit'
import { SERVICES } from '../../../data/services'
import { playTick } from '../../../lib/sound'
import ServiceGlyph from '../ServiceGlyph'
import './ServiceOrbit.css'

const CENTER = { x: 220, y: 245 }
const OUTER_RADIUS = 194
const TICK_ANGLES = [120, 240]

/**
 * Sistema de órbitas: cada servicio de WASAKABE es un nodo que gira alrededor del monograma WK.
 * Al señalar un nodo (o enfocarlo con el teclado) todo se detiene, el resto se atenúa
 * y abajo aparece qué incluye ese servicio.
 */
export default function ServiceOrbit() {
  const [active, setActive] = useState<number | null>(null)

  const activeOrbit = active === null ? null : ORBITS[active]
  const activeService = activeOrbit ? SERVICES.find((service) => service.id === activeOrbit.serviceId) : undefined

  const activate = (index: number) => {
    setActive(index)
    playTick(520 + index * 90, 'sine', 0.03)
  }

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 440 550"
        role="group"
        aria-label="WASAKABE service areas"
        className="orbit-stage h-full w-full"
        data-active={active ?? undefined}
      >
        {/* Retícula fina de fondo */}
        <g fill="none" stroke="var(--color-lavender)" strokeOpacity="0.08" strokeWidth="1">
          <path d={`M0 ${CENTER.y} H440 M${CENTER.x} 0 V550`} />
          <path d="M0 105 H440 M0 385 H440 M80 0 V550 M360 0 V550" />
        </g>

        {/* Arco brillante que recorre la órbita exterior */}
        <circle
          className="orbit-sweep"
          cx={CENTER.x}
          cy={CENTER.y}
          r={OUTER_RADIUS}
          fill="none"
          stroke="var(--color-lavender)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="80 1140"
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        />

        {ORBITS.map((orbit, index) => {
          const service = SERVICES.find((item) => item.id === orbit.serviceId)
          const isActive = active === index

          return (
            <g
              key={orbit.serviceId}
              className={`orbit ${index % 2 === 1 ? 'orbit-reverse' : ''} ${isActive ? 'is-active' : ''}`}
              style={
                {
                  transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
                  '--start': `${orbit.start}deg`,
                  '--duration': `${orbit.duration}s`,
                } as CSSProperties
              }
            >
              <circle
                className="orbit-ring"
                cx={CENTER.x}
                cy={CENTER.y}
                r={orbit.radius}
                fill="none"
                strokeDasharray={index % 2 === 1 ? '2 6' : undefined}
              />

              {TICK_ANGLES.map((angle) => (
                <circle
                  key={angle}
                  className="orbit-tick"
                  cx={CENTER.x + orbit.radius * Math.cos((angle * Math.PI) / 180)}
                  cy={CENTER.y + orbit.radius * Math.sin((angle * Math.PI) / 180)}
                  r="1.6"
                />
              ))}

              <a
                href="#services"
                className="orbit-node"
                aria-label={`${service?.title ?? orbit.serviceId}: ${orbit.caption}`}
                onMouseEnter={() => activate(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => activate(index)}
                onBlur={() => setActive(null)}
              >
                <g transform={`translate(${CENTER.x + orbit.radius} ${CENTER.y})`}>
                  <g className="orbit-node-inner">
                    <g className="orbit-node-scale">
                      <circle className="orbit-node-hit" r="24" />
                      <circle className="orbit-node-disc" r="16" />
                      <ServiceGlyph name={orbit.glyph} />
                    </g>
                  </g>
                </g>
              </a>
            </g>
          )
        })}

        {/* Núcleo: el monograma WK con un pulso suave */}
        <g>
          <circle className="core-halo" cx={CENTER.x} cy={CENTER.y} r="30" />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="30"
            fill="var(--color-ultraviolet)"
            fillOpacity="0.55"
            stroke="var(--color-lavender)"
            strokeOpacity="0.8"
          />
          <text x={CENTER.x} y={CENTER.y + 7} textAnchor="middle" className="core-text">
            WK
          </text>
        </g>
      </svg>

      <div
        key={active ?? 'idle'}
        aria-live="polite"
        className="pointer-events-none absolute inset-x-4 bottom-4 flex min-h-10 animate-[fade-in_0.3s_ease-out_both] flex-col justify-end gap-1 text-[10px] uppercase tracking-widest text-lightpurple/80"
      >
        {activeOrbit && activeService ? (
          <>
            <span className="text-lavender">
              0{(active ?? 0) + 1} · {activeService.title}
            </span>
            <span className="text-xs normal-case tracking-normal text-lightpurple/90">{activeOrbit.caption}</span>
          </>
        ) : (
          <span className="flex justify-between">
            <span>Five disciplines</span>
            <span>One standard</span>
          </span>
        )}
      </div>
    </div>
  )
}
