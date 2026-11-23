import type { ReactNode } from 'react'
import MagneticWrapper from '../../motion/MagneticWrapper'
import { playTick } from '../../../lib/sound'

type Variant = 'primary' | 'outline'
type Size = 'md' | 'sm'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Si se indica, se renderiza como enlace. */
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  magnetic?: boolean
  className?: string
  onClick?: () => void
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans uppercase transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.97] disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-lightpurple font-semibold text-deep hover:bg-white',
  outline: 'border border-lavender/40 font-medium text-lavender hover:border-lavender hover:bg-lavender/10',
}

const sizes: Record<Size, string> = {
  md: 'px-7 py-3.5 text-xs tracking-[0.14em]',
  sm: 'px-5 py-2.5 text-xs tracking-wider',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  magnetic = true,
  className = '',
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  const handleClick = () => {
    playTick(700, 'sine', 0.02)
    onClick?.()
  }

  const control = href ? (
    <a href={href} className={classes} onClick={handleClick}>
      {children}
    </a>
  ) : (
    <button type={type} disabled={disabled} className={classes} onClick={handleClick}>
      {children}
    </button>
  )

  return magnetic ? <MagneticWrapper>{control}</MagneticWrapper> : control
}
