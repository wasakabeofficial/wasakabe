import { SECTIONS } from '../../../data/sections'

interface SideIndicatorProps {
  activeId: string
}

/** Indicador fijo en el borde izquierdo (solo escritorio ancho): "03 / 06" y nombre de la sección. */
export default function SideIndicator({ activeId }: SideIndicatorProps) {
  const index = Math.max(0, SECTIONS.findIndex((section) => section.id === activeId))
  const section = SECTIONS[index]
  const railPercent = Math.max(16, (index / (SECTIONS.length - 1)) * 100)

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 select-none flex-col items-start gap-3 lg:left-8 xl:flex"
    >
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-lightpurple/60">
        <span key={section.id} className="animate-[fade-in_0.4s_ease-out_both] font-semibold text-lavender">
          {section.number}
        </span>
        <span className="text-lightpurple/30">/</span>
        <span>{String(SECTIONS.length - 1).padStart(2, '0')}</span>
      </div>

      <div className="relative h-14 w-px overflow-hidden bg-lightpurple/15">
        <div
          className="absolute left-0 top-0 w-full bg-lavender transition-[height] duration-500 ease-out"
          style={{ height: `${railPercent}%` }}
        />
      </div>

      <span
        key={section.id}
        className="origin-top-left translate-y-8 -rotate-90 animate-[fade-in_0.4s_ease-out_both] whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.25em] text-lightpurple/60"
      >
        {section.label}
      </span>
    </aside>
  )
}
