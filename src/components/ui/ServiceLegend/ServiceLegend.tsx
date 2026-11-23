import { ORBITS } from '../../../data/orbit'
import { SERVICES } from '../../../data/services'

interface ServiceLegendProps {
  /** Índice del servicio señalado (0 a 4) o null. */
  active: number | null
  onActivate: (index: number) => void
  onClear: () => void
}

/** Números 01–05 que activan cada servicio, y una línea que dice qué incluye el señalado. */
export default function ServiceLegend({ active, onActivate, onClear }: ServiceLegendProps) {
  const orbit = active === null ? null : ORBITS[active]
  const service = orbit ? SERVICES.find((item) => item.id === orbit.serviceId) : undefined

  return (
    <>
      <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-widest">
        {ORBITS.map((item, index) => (
          <li key={item.serviceId}>
            <button
              type="button"
              onMouseEnter={() => onActivate(index)}
              onMouseLeave={onClear}
              onFocus={() => onActivate(index)}
              onBlur={onClear}
              onClick={() => {
                window.location.hash = 'services'
              }}
              aria-label={SERVICES.find((entry) => entry.id === item.serviceId)?.title ?? item.serviceId}
              className={`px-1 py-1 transition-colors ${
                active === index ? 'text-lavender' : 'text-lightpurple/60 hover:text-lavender'
              }`}
            >
              0{index + 1}
            </button>
          </li>
        ))}
      </ul>

      <div
        key={active ?? 'idle'}
        aria-live="polite"
        className="pointer-events-none mt-1 flex min-h-12 w-full animate-[fade-in_0.3s_ease-out_both] flex-col items-center gap-1 text-center text-[10px] uppercase tracking-widest text-lightpurple/80"
      >
        {orbit && service ? (
          <>
            <span className="text-lavender">
              0{(active ?? 0) + 1} · {service.title}
            </span>
            <span className="text-xs normal-case tracking-normal text-lightpurple/90">{orbit.caption}</span>
          </>
        ) : (
          <span>Five layers · One system</span>
        )}
      </div>
    </>
  )
}
