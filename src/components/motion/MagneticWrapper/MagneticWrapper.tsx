import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useMagnetic } from '../../../hooks/useMagnetic'

interface MagneticWrapperProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/** Envuelve un elemento para que se atraiga ligeramente hacia el cursor. */
export default function MagneticWrapper({ children, className = '', style }: MagneticWrapperProps) {
  const ref = useRef<HTMLSpanElement>(null)
  useMagnetic(ref)

  return (
    <span
      ref={ref}
      style={style}
      className={`inline-flex transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  )
}
