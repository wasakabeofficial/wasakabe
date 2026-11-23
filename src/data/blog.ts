import type { BlogPost } from '../types'

/* Contenido de marcador de posición: no hay artículos reales todavía. */
export const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 'post-1',
    tag: 'ENGINEERING NOTE',
    title: '[Article title 1]',
    summary: '[Summary]',
    image: 'circuit-macro',
    imageAlt: 'Silicon interconnects',
  },
  {
    id: 'post-2',
    tag: 'SYSTEM NOTE',
    title: '[Article title 2]',
    summary: '[Summary]',
    image: 'architecture',
    imageAlt: 'Architectural concrete',
  },
  {
    id: 'post-3',
    tag: 'NETWORKS',
    title: '[Article title 3]',
    summary: '[Summary]',
    image: 'server-corridor',
    imageAlt: 'Server corridor',
  },
]
