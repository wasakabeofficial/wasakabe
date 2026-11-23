import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ORBITS } from '../../../data/orbit'
import { SERVICES } from '../../../data/services'
import { useImageSize } from '../../../hooks/useImageSize'
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion'
import { getImage } from '../../../lib/images'
import { playTick } from '../../../lib/sound'
import ServiceCaption from '../ServiceCaption'
import ServiceGlyph from '../ServiceGlyph'
import ServiceStack from '../ServiceStack'
import './PlanetOrbits.css'

/** Nombre del archivo (sin extensión) de la figura recortada, con transparencia, en src/assets/images. */
const FIGURE = 'hero-figure'

/* Sistema planetario alrededor del cuello de la figura. Medidas en píxeles de la imagen original. */
const REFERENCE_WIDTH = 512 // ancho, en unidades, al que se refieren todas las medidas de abajo
const DEFAULT_HEIGHT = 648 // alto por defecto (mientras se lee el tamaño real de la imagen)
const CENTER_Y = 0.51 // altura del centro, como fracción de la altura de la imagen (la base del cuello)
const TILT = -14 // inclinación de las órbitas, en grados
const FLATNESS = 0.3 // semieje menor / semieje mayor
const AXES = [215, 255, 295, 335, 375] // semieje mayor de cada órbita, de la más cercana a la más lejana
const PLANET_RADIUS = [24, 27, 30, 33, 36]
const PERIODS = [18, 26, 36, 48, 62] // segundos por vuelta: las órbitas internas son más rápidas
const PHASES = [0, 0.35, 0.7, 0.15, 0.55] // punto de la órbita en el que empieza cada planeta
const RING_COLORS = [
  'var(--color-lavender)',
  'var(--color-lightpurple)',
  'var(--color-amethyst)',
  'var(--color-lavender)',
  'var(--color-amethyst)',
]
const PLANET_TONES = ['amethyst', 'ultraviolet', 'amethyst', 'ultraviolet', 'amethyst']

type Tone = 'amethyst' | 'ultraviolet' | 'lavender'

interface MiniPlanet {
  /** Órbita en la que viaja (0 a 4). */
  orbit: number
  radius: number
  /** Punto de la órbita en el que empieza (0 a 1). */
  phase: number
  /** Multiplica el periodo de su órbita, para que no vayan todos al mismo ritmo. */
  pace: number
  tone: Tone
  /** Con anillo propio, como Saturno. */
  ring?: boolean
  /** Con una luna que gira a su alrededor. */
  moon?: boolean
}

/** Planetitas decorativas: no representan un servicio ni reciben el cursor. */
const MINI_PLANETS: readonly MiniPlanet[] = [
  { orbit: 0, radius: 7, phase: 0.5, pace: 1.12, tone: 'lavender' },
  { orbit: 0, radius: 5, phase: 0.85, pace: 0.92, tone: 'amethyst' },
  { orbit: 1, radius: 11, phase: 0.08, pace: 1.08, tone: 'amethyst', ring: true },
  { orbit: 1, radius: 5, phase: 0.62, pace: 0.9, tone: 'lavender' },
  { orbit: 2, radius: 8, phase: 0.3, pace: 1.1, tone: 'ultraviolet' },
  { orbit: 2, radius: 13, phase: 0.88, pace: 0.94, tone: 'lavender', moon: true },
  { orbit: 3, radius: 6, phase: 0.5, pace: 1.06, tone: 'amethyst' },
  { orbit: 3, radius: 10, phase: 0.18, pace: 0.96, tone: 'ultraviolet', ring: true },
  { orbit: 4, radius: 12, phase: 0.42, pace: 1.04, tone: 'amethyst', moon: true },
  { orbit: 4, radius: 6, phase: 0.78, pace: 0.9, tone: 'lavender' },
]

/** Trazo cerrado de una circunferencia centrada en (0, 0), para que una luna gire alrededor de su planeta. */
const circlePath = (radius: number) => `M${radius} 0 A${radius} ${radius} 0 0 1 ${-radius} 0 A${radius} ${radius} 0 0 1 ${radius} 0`

interface MiniPlanetViewProps {
  planet: MiniPlanet
  path: string
  period: number
}

/** Una planetita que viaja por su órbita, con anillo y luna opcionales. */
function MiniPlanetView({ planet, path, period }: MiniPlanetViewProps) {
  const duration = period * planet.pace
  const moonOrbit = planet.radius + 9

  return (
    <g className="mini-planet" aria-hidden="true">
      <animateMotion
        path={path}
        dur={`${duration.toFixed(1)}s`}
        begin={`-${(planet.phase * duration).toFixed(2)}s`}
        repeatCount="indefinite"
        rotate="0"
      />
      {planet.ring && (
        <ellipse className="mini-ring" rx={planet.radius * 2} ry={planet.radius * 0.62} transform="rotate(-22)" />
      )}
      <circle className="mini-body" r={planet.radius} fill={`url(#planet-${planet.tone})`} />
      {planet.ring && (
        <g transform="rotate(-22)" clipPath="url(#orbit-clip-front)">
          <ellipse className="mini-ring" rx={planet.radius * 2} ry={planet.radius * 0.62} />
        </g>
      )}
      {planet.moon && (
        <circle className="mini-moon" r="2.8">
          <animateMotion path={circlePath(moonOrbit)} dur="6s" repeatCount="indefinite" rotate="0" />
        </circle>
      )}
    </g>
  )
}

interface LayerProps {
  /** 'back' dibuja la mitad lejana de las órbitas (detrás de la figura); 'front', la cercana. */
  side: 'back' | 'front'
  active: number | null
  onActivate: (index: number) => void
  onClear: () => void
}

/** Un lado del sistema: elipses y planetas, recortados a la mitad que corresponde. */
function OrbitLayer({ side, active, onActivate, onClear }: LayerProps) {
  const interactive = side === 'front'

  return (
    <g clipPath={`url(#orbit-clip-${side})`}>
      {ORBITS.map((orbit, index) => {
        const a = AXES[index]
        const b = a * FLATNESS
        const radius = PLANET_RADIUS[index]
        const service = SERVICES.find((item) => item.id === orbit.serviceId)
        const path = `M${a} 0 A${a} ${b} 0 0 1 ${-a} 0 A${a} ${b} 0 0 1 ${a} 0`

        return (
          <g
            key={orbit.serviceId}
            className={`orbit-group ${active === index ? 'is-active' : ''}`}
            style={{ '--ring-color': RING_COLORS[index] } as CSSProperties}
          >
            <ellipse className="orbit-ring" rx={a} ry={b} />

            {MINI_PLANETS.filter((planet) => planet.orbit === index).map((planet, position) => (
              <MiniPlanetView key={position} planet={planet} path={path} period={PERIODS[index]} />
            ))}

            <a
              href="#services"
              className="planet-link"
              tabIndex={interactive ? undefined : -1}
              aria-hidden={interactive ? undefined : true}
              aria-label={interactive ? `${service?.title ?? orbit.serviceId}: ${orbit.caption}` : undefined}
              onMouseEnter={() => onActivate(index)}
              onMouseLeave={onClear}
              onFocus={interactive ? () => onActivate(index) : undefined}
              onBlur={interactive ? onClear : undefined}
            >
              <g>
                <animateMotion
                  path={path}
                  dur={`${PERIODS[index]}s`}
                  begin={`-${(PHASES[index] * PERIODS[index]).toFixed(2)}s`}
                  repeatCount="indefinite"
                  rotate="0"
                />
                <g className="planet-scale">
                  <circle className="planet-hit" r={radius + 10} />
                  <circle className="planet-body" r={radius} fill={`url(#planet-${PLANET_TONES[index]})`} />
                  <g className="planet-glyph" transform={`scale(${(radius / 14).toFixed(2)})`}>
                    <ServiceGlyph name={orbit.glyph} />
                  </g>
                </g>
              </g>
            </a>
          </g>
        )
      })}
    </g>
  )
}

/**
 * La figura, quieta, en el centro de un sistema planetario: cada servicio es un planeta que gira
 * en una órbita elíptica inclinada, acompañado de planetitas decorativas. La mitad lejana de cada
 * órbita pasa por detrás de la figura y la cercana por delante, como los anillos de Saturno.
 * Al señalar un planeta el sistema se detiene, esa órbita se ilumina y se lee qué incluye el servicio.
 *
 * Si no existe src/assets/images/hero-figure.(png|webp|jpg), muestra ServiceStack.
 */
export default function PlanetOrbits() {
  const url = getImage(FIGURE)
  const size = useImageSize(url)
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Con movimiento reducido los planetas se quedan quietos.
  useEffect(() => {
    if (reduced) svgRef.current?.pauseAnimations()
  }, [reduced, size])

  if (!url) return <ServiceStack />

  // La geometría del sistema está en unidades de una imagen de 512 px de ancho; una imagen de
  // mayor resolución se escala a esas unidades para que las órbitas conserven sus proporciones.
  const width = REFERENCE_WIDTH
  const height = size ? Math.round((size.height * REFERENCE_WIDTH) / size.width) : DEFAULT_HEIGHT
  const cx = width / 2
  const cy = height * CENTER_Y
  const padX = Math.max(0, AXES[AXES.length - 1] - width / 2) + 40
  const padY = 70
  const frame = `translate(${cx} ${cy}) rotate(${TILT})`

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
    <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`${-padX} ${-padY} ${width + padX * 2} ${height + padY * 2}`}
        role="group"
        aria-label="WASAKABE service areas as planets orbiting the figure"
        className="orbit-system block h-auto w-full max-w-none lg:-mx-[12%] lg:w-[124%]"
        data-active={active ?? undefined}
      >
        <defs>
          {/* Las órbitas se recortan en el sistema inclinado: arriba = lado lejano, abajo = lado cercano */}
          <clipPath id="orbit-clip-back">
            <rect x="-2000" y="-2000" width="4000" height="2000" />
          </clipPath>
          <clipPath id="orbit-clip-front">
            <rect x="-2000" y="0" width="4000" height="2000" />
          </clipPath>
          {/* Sombreado esférico de los planetas con colores de la paleta */}
          <radialGradient id="planet-amethyst" cx="34%" cy="30%" r="78%">
            <stop offset="0" style={{ stopColor: 'var(--color-lightpurple)' }} />
            <stop offset="0.45" style={{ stopColor: 'var(--color-amethyst)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-deep)' }} />
          </radialGradient>
          <radialGradient id="planet-ultraviolet" cx="34%" cy="30%" r="78%">
            <stop offset="0" style={{ stopColor: 'var(--color-lavender)' }} />
            <stop offset="0.45" style={{ stopColor: 'var(--color-ultraviolet)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-deep)' }} />
          </radialGradient>
          <radialGradient id="planet-lavender" cx="34%" cy="30%" r="78%">
            <stop offset="0" style={{ stopColor: '#fff' }} />
            <stop offset="0.4" style={{ stopColor: 'var(--color-lavender)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-ultraviolet)' }} />
          </radialGradient>
        </defs>

        {/* Mitad lejana: detrás de la figura */}
        <g transform={frame}>
          <OrbitLayer side="back" active={active} onActivate={activate} onClear={clear} />
        </g>

        {/* La figura, sin movimiento */}
        <image
          className="orbit-figure"
          href={url}
          width={width}
          height={height}
          role="img"
          aria-label="Illustration of a cyber-augmented character"
        />

        {/* Mitad cercana: delante de la figura */}
        <g transform={frame}>
          <OrbitLayer side="front" active={active} onActivate={activate} onClear={clear} />
        </g>
      </svg>

      {/* Solo aparece al señalar un planeta; sobre la parte difuminada de abajo, sin ocupar espacio */}
      <ServiceCaption active={active} className="absolute inset-x-0 bottom-[6%]" />
    </div>
  )
}
