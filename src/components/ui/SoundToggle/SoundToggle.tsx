import { useState } from 'react'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { isSoundEnabled, playTick, setSoundEnabled } from '../../../lib/sound'

interface SoundToggleProps {
  /** true cuando está sobre un fondo de color (el navbar en amatista): usa blanco en vez de lavanda. */
  onAccent?: boolean
}

/** Interruptor de los sonidos opcionales. Apagado por defecto. */
export default function SoundToggle({ onAccent = false }: SoundToggleProps) {
  const [on, setOn] = useState(isSoundEnabled())

  const toggle = () => {
    const next = !on
    setSoundEnabled(next)
    setOn(next)
    if (next) playTick(1100, 'sine', 0.05)
  }

  const hover = onAccent ? 'hover:border-white hover:text-white' : 'hover:border-lavender hover:text-white'
  const state = onAccent
    ? on
      ? 'border-white bg-white/15 text-white'
      : 'border-white/40 text-white/80'
    : on
      ? 'border-lavender text-lavender'
      : 'border-lightpurple/20 text-lightpurple/70'

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Turn interface sounds off' : 'Turn interface sounds on'}
      onClick={toggle}
      className={`flex items-center justify-center border p-2 transition-colors ${hover} ${state}`}
    >
      {on ? <MdVolumeUp size={18} aria-hidden="true" /> : <MdVolumeOff size={18} aria-hidden="true" />}
    </button>
  )
}
