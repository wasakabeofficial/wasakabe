import type { ReactNode } from 'react'
import Eyebrow from '../Eyebrow'

interface SectionHeadingProps {
  eyebrow: string
  children: ReactNode
  tone?: 'light' | 'dark'
  /** Texto de apoyo bajo el titular. */
  description?: string
  className?: string
}

/** Etiqueta + titular serif de una sección. */
export default function SectionHeading({
  eyebrow,
  children,
  tone = 'light',
  description,
  className = '',
}: SectionHeadingProps) {
  const heading = tone === 'dark' ? 'text-deep' : 'text-white'

  return (
    <div className={`flex flex-col ${className}`}>
      <Eyebrow tone={tone} className="mb-4">
        {eyebrow}
      </Eyebrow>
      <h2 className={`max-w-4xl font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-6xl ${heading}`}>
        {children}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-lightpurple opacity-90 md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
