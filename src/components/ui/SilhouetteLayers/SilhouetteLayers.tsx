import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ORBITS } from '../../../data/orbit'
import { SERVICES } from '../../../data/services'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { useSilhouetteRings } from '../../../hooks/useSilhouetteRings'
import { getImage } from '../../../lib/images'
import { playTick } from '../../../lib/sound'
import ServiceGlyph from '../ServiceGlyph'
import ServiceLegend from '../ServiceLegend'
import ServiceStack from '../ServiceStack'
import './SilhouetteLayers.css'

/** Nombre del archivo (sin extensión) de la figura recortada, con transparencia, en src/assets/images. */
const FIGURE = 'hero-figure'

/** Distancia de cada capa a la silueta (px de la imagen original), de la más cercana a la más lejana. */
const RADII = [8, 20, 32, 44, 56]

/** Un color de la paleta por capa y los segundos que tarda la luz en dar una vuelta. */
const COLORS = [
  'var(--color-lightpurple)',
  'var(--color-lavender)',
  'var(--color-amethyst)',
  'var(--color-lavender)',
  'var(--color-amethyst)',
]
const LAPS = [26, 34, 42, 52, 64]

/**
 * La figura recortada con cinco capas que rodean solo su silueta, una por servicio.
 * Cada capa tiene una luz que la recorre y un nodo con el símbolo del servicio que
 * circula alrededor de la figura. Al señalar un nodo o un número, todo se detiene,
 * esa capa se ilumina y abajo se lee qué incluye el servicio.
 *
 * Si no existe src/assets/images/hero-figure.(png|webp|jpg), muestra ServiceStack.
 */
export default function SilhouetteLayers() {
  const url = getImage(FIGURE)
  const rings = useSilhouetteRings(url, RADII)
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Con movimiento reducido los nodos se quedan quietos.
  useEffect(() => {
    if (reduced) svgRef.current?.pauseAnimations()
  }, [reduced, rings])

  if (!url) return <ServiceStack />

  const activate = (index: number) => {
    setActive(index)
    svgRef.current?.pauseAnimations()
    playTick(520 + index * 90, 'sine', 0.03)
  }

  const clear = () => {
    setActive(null)
    if (!reduced) svgRef.current?.unpauseAnimations()
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-fit max-w-full">
        <img
          src={url}
          alt="Illustration of a cyber-augmented character"
          className="silhouette-figure block h-auto max-h-[66vh] w-auto max-w-full select-none"
          draggable={false}
        />

        {rings && (
          <svg
            ref={svgRef}
            viewBox={`${-rings.pad} ${-rings.pad} ${rings.width + rings.pad * 2} ${rings.height + rings.pad * 2}`}
            role="group"
            aria-label="WASAKABE service areas as layers around the figure"
            className="ring-stage pointer-events-none absolute overflow-visible"
            style={{
              left: `${(-rings.pad / rings.width) * 100}%`,
              top: `${(-rings.pad / rings.height) * 100}%`,
              width: `${((rings.width + rings.pad * 2) / rings.width) * 100}%`,
              height: `${((rings.height + rings.pad * 2) / rings.height) * 100}%`,
            }}
            data-active={active ?? undefined}
          >
            <defs>
              {/* Las capas se desvanecen hacia abajo y hacia la derecha, donde la imagen está cortada */}
              <linearGradient
                id="ring-fade-y"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1={rings.height * 0.66}
                x2="0"
                y2={rings.height * 0.9}
              >
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
              <linearGradient
                id="ring-fade-x"
                gradientUnits="userSpaceOnUse"
                x1={rings.width * 0.8}
                y1="0"
                x2={rings.width * 0.97}
                y2="0"
              >
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </linearGradient>
              {['x', 'y'].map((axis) => (
                <mask
                  key={axis}
                  id={`ring-mask-${axis}`}
                  maskUnits="userSpaceOnUse"
                  x={-rings.pad}
                  y={-rings.pad}
                  width={rings.width + rings.pad * 2}
                  height={rings.height + rings.pad * 2}
                >
                  <rect
                    x={-rings.pad}
                    y={-rings.pad}
                    width={rings.width + rings.pad * 2}
                    height={rings.height + rings.pad * 2}
                    fill={`url(#ring-fade-${axis})`}
                  />
                </mask>
              ))}
            </defs>

            <g mask="url(#ring-mask-x)">
              <g mask="url(#ring-mask-y)">
                {rings.paths.map((d, index) => (
                  <g
                    key={index}
                    className={`ring ${active === index ? 'is-active' : ''}`}
                    style={{ '--ring-color': COLORS[index] } as CSSProperties}
                  >
                    <path id={`silhouette-ring-${index}`} className="ring-line" d={d} pathLength="100" />
                    <path
                      className="ring-run"
                      d={d}
                      pathLength="100"
                      style={{
                        animationDuration: `${LAPS[index]}s`,
                        animationDirection: index % 2 === 1 ? 'reverse' : 'normal',
                      }}
                    />
                  </g>
                ))}

                {ORBITS.map((orbit, index) => {
                  const service = SERVICES.find((item) => item.id === orbit.serviceId)

                  return (
                    <a
                      key={orbit.serviceId}
                      href="#services"
                      className={`ring-node pointer-events-auto ${active === index ? 'is-active' : ''}`}
                      aria-label={`${service?.title ?? orbit.serviceId}: ${orbit.caption}`}
                      onMouseEnter={() => activate(index)}
                      onMouseLeave={clear}
                      onFocus={() => activate(index)}
                      onBlur={clear}
                    >
                      <g>
                        <animateMotion
                          dur={`${LAPS[index] * 1.4}s`}
                          begin={`-${index * 9}s`}
                          repeatCount="indefinite"
                          calcMode="linear"
                          keyPoints={index % 2 === 1 ? '1;0' : '0;1'}
                          keyTimes="0;1"
                        >
                          <mpath href={`#silhouette-ring-${index}`} />
                        </animateMotion>
                        <g className="ring-node-scale">
                          <circle className="ring-node-hit" r="30" />
                          <circle className="ring-node-disc" r="19" />
                          <g transform="scale(1.15)">
                            <ServiceGlyph name={orbit.glyph} />
                          </g>
                        </g>
                      </g>
                    </a>
                  )
                })}
              </g>
            </g>
          </svg>
        )}
      </div>

      <ServiceLegend active={active} onActivate={activate} onClear={clear} />
    </div>
  )
}
