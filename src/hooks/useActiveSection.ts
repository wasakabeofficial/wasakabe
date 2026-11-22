import { useState } from 'react'
import { useScrollEffect } from './useScrollEffect'

/** Devuelve el id de la sección que ocupa el 40% superior de la pantalla. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0])

  useScrollEffect((scrollY) => {
    const marker = scrollY + window.innerHeight * 0.4
    let current = ids[0]

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element && marker >= element.offsetTop && marker < element.offsetTop + element.offsetHeight) {
        current = id
      }
    }

    setActive(current)
  })

  return active
}
