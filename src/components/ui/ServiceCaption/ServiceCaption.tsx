import { ORBITS } from '../../../data/orbit'
import { SERVICES } from '../../../data/services'

interface ServiceCaptionProps {
  /** Índice del servicio señalado (0 a 4) o null. */
  active: number | null
  className?: string
}

/** Texto breve con el nombre del servicio señalado y qué incluye. Sin servicio señalado no muestra nada. */
export default function ServiceCaption({ active, className = '' }: ServiceCaptionProps) {
  const orbit = active === null ? null : ORBITS[active]
  const service = orbit ? SERVICES.find((item) => item.id === orbit.serviceId) : undefined

  return (
    <div
      aria-live="polite"
      className={`pointer-events-none flex flex-col items-center text-center text-[10px] uppercase tracking-widest text-lightpurple/80 ${className}`}
    >
      {orbit && service && (
        <div key={active} className="flex animate-[fade-in_0.3s_ease-out_both] flex-col items-center gap-1">
          <span className="text-lavender">
            0{(active ?? 0) + 1} · {service.title}
          </span>
          <span className="text-xs normal-case tracking-normal text-lightpurple/90">{orbit.caption}</span>
        </div>
      )}
    </div>
  )
}
