import { useEffect, type CSSProperties } from 'react'
import { SECTIONS } from '../../../data/sections'
import './MobileMenu.css'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/** Panel a pantalla completa que se abre con un recorte circular desde la esquina. */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-menu"
      inert={!open}
      aria-hidden={!open}
      className={`mobile-menu fixed inset-0 z-40 flex flex-col justify-between bg-deep p-8 sm:p-12 nav:hidden ${
        open ? 'is-open' : ''
      }`}
    >
      <nav aria-label="Mobile" className="flex flex-col gap-6 pt-20 font-serif text-3xl sm:text-4xl">
        {SECTIONS.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onClose}
            className="mobile-menu-link text-lightpurple transition-colors hover:text-white"
            style={{ '--i': index } as CSSProperties}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-between border-t border-lightpurple/15 pt-6 text-[11px] uppercase tracking-widest text-lightpurple/60">
        <span>WASAKABE</span>
        <span>Software · AI · Networks</span>
      </div>
    </div>
  )
}
