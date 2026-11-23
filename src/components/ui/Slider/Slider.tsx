import { useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { MdDragHandle } from 'react-icons/md'

interface SliderProps {
  /** Cantidad de posiciones (detents). */
  count: number
  /** Posición actual, empezando en 0. */
  value: number
  onChange: (index: number) => void
  /** Nombre accesible del control. */
  label: string
  /** Texto que lee el lector de pantalla para la posición actual. */
  valueText: string
  startLabel: string
  endLabel: string
}

/** Deslizador con posiciones fijas: se arrastra, se pulsa o se mueve con el teclado. */
export default function Slider({ count, value, onChange, label, valueText, startLabel, endLabel }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const last = count - 1
  const percent = (value / last) * 100

  const moveTo = (clientX: number) => {
    const track = trackRef.current
    if (!track) return

    const box = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width))
    const next = Math.round(ratio * last)
    if (next !== value) onChange(next)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    moveTo(event.clientX)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX)
  }

  const stopDragging = () => {
    dragging.current = false
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: Math.min(last, value + 1),
      ArrowUp: Math.min(last, value + 1),
      ArrowLeft: Math.max(0, value - 1),
      ArrowDown: Math.max(0, value - 1),
      Home: 0,
      End: last,
    }

    if (event.key in keys) {
      event.preventDefault()
      onChange(keys[event.key])
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-lavender">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>

      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={value + 1}
        aria-valuetext={valueText}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={onKeyDown}
        className="relative w-full cursor-pointer touch-none select-none py-4"
      >
        <div className="relative h-2 w-full border border-lavender/30 bg-ultraviolet/80">
          <div
            className="h-full bg-lavender transition-[width] duration-300 ease-out-expo"
            style={{ width: `${percent}%` }}
          />
        </div>

        {Array.from({ length: count }, (_, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-deep transition-colors duration-300 ${
              index <= value ? 'bg-lavender' : 'bg-lightpurple/60'
            }`}
            style={{ left: `${(index / last) * 100}%` }}
          />
        ))}

        <div
          aria-hidden="true"
          className="absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center border border-white bg-lightpurple text-deep shadow-lg transition-[left,scale] duration-300 ease-out-expo active:scale-95 active:cursor-grabbing"
          style={{ left: `${percent}%` }}
        >
          <MdDragHandle size={16} />
        </div>
      </div>
    </div>
  )
}
