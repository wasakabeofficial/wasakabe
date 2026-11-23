/*
 * Sonidos opcionales de la interfaz, sintetizados con Web Audio.
 * Están APAGADOS por defecto: solo suenan si la persona los activa.
 */
type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext }

let context: AudioContext | null = null
let enabled = false

export function isSoundEnabled(): boolean {
  return enabled
}

export function setSoundEnabled(value: boolean): void {
  enabled = value
}

export function playTick(frequency = 820, type: OscillatorType = 'sine', duration = 0.025): void {
  if (!enabled) return

  try {
    const Context = window.AudioContext ?? (window as AudioWindow).webkitAudioContext
    if (!Context) return

    context ??= new Context()
    if (context.state === 'suspended') void context.resume()

    const oscillator = context.createOscillator()
    const gain = context.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, context.currentTime)
    gain.gain.setValueAtTime(0.04, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration)

    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + duration)
  } catch {
    // Si el audio no está disponible, la interfaz sigue funcionando sin sonido.
  }
}
