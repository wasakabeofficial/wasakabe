import { useState } from 'react'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { isSoundEnabled, playTick, setSoundEnabled } from '../../../lib/sound'

/** Interruptor de los sonidos opcionales. Apagado por defecto. */
export default function SoundToggle() {
  const [on, setOn] = useState(isSoundEnabled())

  const toggle = () => {
    const next = !on
    setSoundEnabled(next)
    setOn(next)
    if (next) playTick(1100, 'sine', 0.05)
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? 'Turn interface sounds off' : 'Turn interface sounds on'}
      onClick={toggle}
      className={`flex items-center justify-center border p-2 transition-colors hover:border-lavender hover:text-white ${
        on ? 'border-lavender text-lavender' : 'border-lightpurple/20 text-lightpurple/70'
      }`}
    >
      {on ? <MdVolumeUp size={18} aria-hidden="true" /> : <MdVolumeOff size={18} aria-hidden="true" />}
    </button>
  )
}
