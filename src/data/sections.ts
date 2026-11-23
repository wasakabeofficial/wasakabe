import type { SectionMeta } from '../types'

/** Orden de las secciones: lo usan el menú, el indicador lateral y el scroll. */
export const SECTIONS: readonly SectionMeta[] = [
  { id: 'home', label: 'Home', number: '00' },
  { id: 'services', label: 'Services', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'who-we-serve', label: 'Who we serve', number: '03' },
  { id: 'channels', label: 'Channels', number: '04' },
  { id: 'blog', label: 'Blog', number: '05' },
  { id: 'contact', label: 'Contact', number: '06' },
]

export const SECTION_IDS: readonly string[] = SECTIONS.map((section) => section.id)
