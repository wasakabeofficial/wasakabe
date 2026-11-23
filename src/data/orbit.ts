import type { OrbitItem } from '../types'

/*
 * Una órbita por área de servicio, de la más cercana al centro a la más lejana.
 * Los textos describen lo que WASAKABE ofrece (ver data/services.ts).
 */
export const ORBITS: readonly OrbitItem[] = [
  {
    serviceId: 'software',
    glyph: 'software',
    caption: 'Web, mobile, desktop, databases, QA and testing',
    radius: 50,
    duration: 34,
    start: -60,
  },
  {
    serviceId: 'ai',
    glyph: 'ai',
    caption: 'AI agents, ERP and CRM integration, n8n workflows',
    radius: 86,
    duration: 46,
    start: 40,
  },
  {
    serviceId: 'networks',
    glyph: 'networks',
    caption: 'Zabbix monitoring, Nmap scanning, Wireshark analysis',
    radius: 122,
    duration: 58,
    start: 150,
  },
  {
    serviceId: 'creative',
    glyph: 'creative',
    caption: 'Film and video, beats and music, indie games',
    radius: 158,
    duration: 70,
    start: -130,
  },
  {
    serviceId: 'planning',
    glyph: 'planning',
    caption: 'Project methodologies, mentoring and advisory',
    radius: 194,
    duration: 84,
    start: 100,
  },
]
