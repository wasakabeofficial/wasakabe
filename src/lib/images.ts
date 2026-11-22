/*
 * Busca las imágenes de src/assets/images por nombre de archivo (sin extensión).
 * Si el archivo no existe, getImage devuelve undefined y el componente
 * ImageSlot muestra un recuadro de reemplazo con la paleta.
 *
 * Nombres esperados por el diseño:
 *   wk-logo, server-corridor, circuit-macro, architecture
 */
const modules = import.meta.glob<string>('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byName = new Map<string, string>()

for (const [path, url] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? ''
  byName.set(file.replace(/\.[^.]+$/, ''), url)
}

export function getImage(name: string): string | undefined {
  return byName.get(name)
}
