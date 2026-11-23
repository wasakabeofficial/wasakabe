import MagneticWrapper from '../../motion/MagneticWrapper'
import { playTick } from '../../../lib/sound'

interface TagProps {
  label: string
  selected?: boolean
  onSelect?: () => void
}

/** Etiqueta seleccionable con atracción magnética. */
export default function Tag({ label, selected = false, onSelect }: TagProps) {
  const state = selected
    ? 'border-lavender bg-lavender text-deep'
    : 'border-lavender/30 bg-deep/40 text-lavender hover:bg-lavender hover:text-deep'

  return (
    <MagneticWrapper>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => {
          playTick(900, 'sine', 0.02)
          onSelect?.()
        }}
        className={`border px-3 py-1 text-xs transition-colors ${state}`}
      >
        {label}
      </button>
    </MagneticWrapper>
  )
}
