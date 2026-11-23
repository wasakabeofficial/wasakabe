export interface SectionMeta {
  id: string
  label: string
  /** Número que se muestra en el indicador lateral. */
  number: string
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  items: string[]
  /** Nombre del archivo (sin extensión) en src/assets/images. */
  image: string
  imageAlt: string
}

export interface Tier {
  id: string
  badge: string
  title: string
  tags: string[]
  build: string
}

export interface Channel {
  id: string
  name: string
  handle: string
  tag: string
  url: string
  /** Nombre del archivo (sin extensión) en src/assets/images. */
  preview: string
}

export interface BlogPost {
  id: string
  tag: string
  title: string
  summary: string
  image: string
  imageAlt: string
}

export interface InquiryData {
  name: string
  email: string
  subject: string
  message: string
}

export type GlyphKey = 'software' | 'ai' | 'networks' | 'creative' | 'planning'

export interface OrbitItem {
  /** Id del servicio al que representa (ver data/services). */
  serviceId: string
  glyph: GlyphKey
  /** Texto corto que aparece al señalar el nodo. */
  caption: string
  /** Radio de la órbita en el lienzo del SVG. */
  radius: number
  /** Segundos que tarda en dar una vuelta. */
  duration: number
  /** Ángulo inicial en grados. */
  start: number
}
