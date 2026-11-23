import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { playTick } from '../../../lib/sound'
import './Accordion.css'

interface AccordionProps<T extends { id: string }> {
  items: readonly T[]
  /** Posición abierta al inicio; null para todo cerrado. */
  defaultOpen?: number | null
  label: string
  renderHeader: (item: T) => ReactNode
  renderPanel: (item: T) => ReactNode
}

/** Acordeón con una sola fila abierta a la vez y navegación con flechas. */
export default function Accordion<T extends { id: string }>({
  items,
  defaultOpen = 0,
  label,
  renderHeader,
  renderPanel,
}: AccordionProps<T>) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  const headers = useRef<Array<HTMLButtonElement | null>>([])

  const focusHeader = (index: number) => {
    headers.current[(index + items.length) % items.length]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targets: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowUp: index - 1,
      Home: 0,
      End: items.length - 1,
    }

    if (event.key in targets) {
      event.preventDefault()
      focusHeader(targets[event.key])
    }
  }

  return (
    <div role="group" aria-label={label} className="hairline-t">
      {items.map((item, index) => {
        const isOpen = open === index

        return (
          <div key={item.id} className={`accordion-row hairline-b ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              ref={(element) => {
                headers.current[index] = element
              }}
              id={`${item.id}-header`}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
              onClick={() => {
                setOpen(isOpen ? null : index)
                if (!isOpen) playTick(740, 'triangle', 0.03)
              }}
              onKeyDown={(event) => onKeyDown(event, index)}
              className="accordion-header"
            >
              {renderHeader(item)}
            </button>

            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-header`}
              inert={!isOpen}
              className="accordion-drawer"
            >
              <div className="overflow-hidden">
                <div className="pb-8 md:pb-10">{renderPanel(item)}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
