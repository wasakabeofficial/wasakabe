/*
 * Busca las imágenes de src/assets/images por nombre de archivo (sin extensión).
 * Si el archivo no existe, getImage devuelve undefined y el componente
 * ImageSlot muestra un recuadro de reemplazo con la paleta.
 *
 * Nombres esperados por el diseño:
 *   wk-logo, server-corridor, circuit-macro, architecture
 */
const modules = import.meta.glob<string>('../assets/images/*.{jpg,jpeg,png,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byName = new Map<string, string>()

for (const [path, url] of Object.entries(modules)) {
  const file = path.split('/').pop() ?? ''
  const name = file.replace(/\.[^.]+$/, '')

  // Si hay un SVG y una imagen rasterizada con el mismo nombre, gana la rasterizada
  // (por ejemplo, un PNG nuevo sustituye al SVG provisional sin tener que borrarlo).
  if (file.endsWith('.svg') && byName.has(name)) continue
  byName.set(name, url)
}

export function getImage(name: string): string | undefined {
  return byName.get(name)
}
