import { useEffect, useState } from 'react'

interface ImageSize {
  width: number
  height: number
}

interface Result extends ImageSize {
  url: string
}

/** Tamaño natural de la imagen (null mientras carga o si no hay imagen). */
export function useImageSize(url: string | undefined): ImageSize | null {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!url) return

    let cancelled = false
    const image = new Image()
    image.src = url

    image
      .decode()
      .then(() => {
        if (!cancelled) setResult({ url, width: image.naturalWidth, height: image.naturalHeight })
      })
      .catch(() => {
        // Si no se puede leer, el componente usa un tamaño por defecto.
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return result && result.url === url ? { width: result.width, height: result.height } : null
}
