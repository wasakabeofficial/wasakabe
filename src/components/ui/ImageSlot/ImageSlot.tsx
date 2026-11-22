import { getImage } from '../../../lib/images'
import './ImageSlot.css'

interface ImageSlotProps {
  /** Nombre del archivo (sin extensión) en src/assets/images. */
  name: string
  alt: string
  /** Otros nombres a probar si `name` no existe. */
  fallbacks?: string[]
  className?: string
  /** Carga inmediata (solo para imágenes visibles al abrir la página). */
  eager?: boolean
}

/**
 * Muestra la imagen si existe en src/assets/images; si no, un recuadro de
 * reemplazo con la paleta y el texto "[Image: ...]".
 */
export default function ImageSlot({ name, alt, fallbacks = [], className = '', eager = false }: ImageSlotProps) {
  const source = [name, ...fallbacks].map(getImage).find(Boolean)

  if (source) {
    return (
      <img
        src={source}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div role="img" aria-label={alt} className={`image-slot h-full w-full ${className}`}>
      <span>[Image: {alt}]</span>
    </div>
  )
}
