import { useEffect, useState } from 'react'
import { traceSilhouette, type SilhouetteRings } from '../lib/silhouette'

interface Result {
  url: string
  rings: SilhouetteRings
}

/**
 * Calcula los anillos de la silueta de `url`. Devuelve null mientras se calculan
 * (o si no hay imagen). `radii` debe ser una constante estable.
 */
export function useSilhouetteRings(url: string | undefined, radii: readonly number[]): SilhouetteRings | null {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!url) return

    let cancelled = false

    traceSilhouette(url, radii)
      .then((rings) => {
        if (!cancelled) setResult({ url, rings })
      })
      .catch(() => {
        // Si la imagen no se puede analizar, el visual se muestra sin anillos.
      })

    return () => {
      cancelled = true
    }
  }, [url, radii])

  return result && result.url === url ? result.rings : null
}
