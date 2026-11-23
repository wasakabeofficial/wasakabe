/*
 * Calcula, en el navegador, anillos concéntricos alrededor de la silueta de una imagen
 * con transparencia (PNG recortado):
 *   1. Lee el canal alfa y lo convierte en una máscara de baja resolución.
 *   2. Calcula la distancia de cada punto a la silueta (transformada de distancia euclídea).
 *   3. Traza con "marching squares" la curva de nivel a cada distancia pedida.
 * El resultado son trazados SVG en las coordenadas de la imagen original.
 */

type Point = [number, number]

export interface SilhouetteRings {
  /** Tamaño de la imagen original (px): es el sistema de coordenadas de los trazos. */
  width: number
  height: number
  /** Margen que dejan los anillos por fuera de la imagen, en las mismas unidades. */
  pad: number
  /** Un trazo cerrado por cada radio pedido. */
  paths: string[]
}

const MASK_WIDTH = 240
const ALPHA_THRESHOLD = 40
const FAR = 1e20

/** Transformada de distancia 1D (Felzenszwalb & Huttenlocher): distancia al cuadrado. */
function distance1d(f: Float64Array, n: number, v: Int32Array, z: Float64Array, out: Float64Array): void {
  let k = 0
  v[0] = 0
  z[0] = -FAR
  z[1] = FAR

  for (let q = 1; q < n; q++) {
    let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
    while (s <= z[k]) {
      k--
      s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
    }
    k++
    v[k] = q
    z[k] = s
    z[k + 1] = FAR
  }

  k = 0
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++
    const delta = q - v[k]
    out[q] = delta * delta + f[v[k]]
  }
}

/** Distancia euclídea de cada celda al primer plano (celdas con valor 0). Modifica `grid`. */
function distanceField(grid: Float64Array, w: number, h: number): void {
  const size = Math.max(w, h)
  const line = new Float64Array(size)
  const out = new Float64Array(size)
  const v = new Int32Array(size)
  const z = new Float64Array(size + 1)

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) line[y] = grid[y * w + x]
    distance1d(line, h, v, z, out)
    for (let y = 0; y < h; y++) grid[y * w + x] = out[y]
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) line[x] = grid[y * w + x]
    distance1d(line, w, v, z, out)
    for (let x = 0; x < w; x++) grid[y * w + x] = Math.sqrt(out[x])
  }
}

/** Curvas de nivel (field <= iso es el interior) con interpolación lineal en cada arista. */
function contours(field: Float64Array, w: number, h: number, iso: number): Point[][] {
  const horizontalEdges = w * h
  const neighbors = new Map<number, number[]>()

  const link = (a: number, b: number) => {
    const listA = neighbors.get(a)
    if (listA) listA.push(b)
    else neighbors.set(a, [b])

    const listB = neighbors.get(b)
    if (listB) listB.push(a)
    else neighbors.set(b, [a])
  }

  const pointOf = (id: number): Point => {
    if (id < horizontalEdges) {
      const y = Math.floor(id / w)
      const x = id % w
      return [x + (iso - field[id]) / (field[id + 1] - field[id]), y]
    }
    const index = id - horizontalEdges
    const y = Math.floor(index / w)
    const x = index % w
    return [x, y + (iso - field[index]) / (field[index + w] - field[index])]
  }

  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w - 1; x++) {
      const tl = field[y * w + x]
      const tr = field[y * w + x + 1]
      const br = field[(y + 1) * w + x + 1]
      const bl = field[(y + 1) * w + x]
      const code = (tl <= iso ? 8 : 0) | (tr <= iso ? 4 : 0) | (br <= iso ? 2 : 0) | (bl <= iso ? 1 : 0)
      if (code === 0 || code === 15) continue

      const top = y * w + x
      const bottom = (y + 1) * w + x
      const left = horizontalEdges + y * w + x
      const right = horizontalEdges + y * w + x + 1
      const centerInside = (tl + tr + br + bl) / 4 <= iso

      switch (code) {
        case 1:
        case 14:
          link(left, bottom)
          break
        case 2:
        case 13:
          link(bottom, right)
          break
        case 3:
        case 12:
          link(left, right)
          break
        case 4:
        case 11:
          link(top, right)
          break
        case 6:
        case 9:
          link(top, bottom)
          break
        case 7:
        case 8:
          link(top, left)
          break
        case 5:
          if (centerInside) {
            link(top, left)
            link(bottom, right)
          } else {
            link(top, right)
            link(left, bottom)
          }
          break
        case 10:
          if (centerInside) {
            link(top, right)
            link(left, bottom)
          } else {
            link(top, left)
            link(bottom, right)
          }
          break
      }
    }
  }

  const visited = new Set<number>()
  const loops: Point[][] = []

  for (const start of neighbors.keys()) {
    if (visited.has(start)) continue

    const loop: Point[] = []
    let previous = -1
    let current = start

    while (!visited.has(current)) {
      visited.add(current)
      loop.push(pointOf(current))
      const options = neighbors.get(current) ?? []
      const next = options.find((id) => id !== previous && !visited.has(id))
      if (next === undefined) break
      previous = current
      current = next
    }

    if (loop.length > 8) loops.push(loop)
  }

  return loops
}

/** El lazo exterior es el de mayor superficie envolvente. */
function outerLoop(loops: Point[][]): Point[] | undefined {
  let best: Point[] | undefined
  let bestArea = -1

  for (const loop of loops) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    for (const [x, y] of loop) {
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }
    const area = (maxX - minX) * (maxY - minY)
    if (area > bestArea) {
      bestArea = area
      best = loop
    }
  }

  return best
}

/**
 * Traza un anillo por cada radio (en píxeles de la imagen original) alrededor de la silueta
 * de `url`, que debe ser una imagen del mismo origen con canal alfa.
 */
export async function traceSilhouette(url: string, radii: readonly number[]): Promise<SilhouetteRings> {
  const image = new Image()
  image.src = url
  await image.decode()

  const width = image.naturalWidth
  const height = image.naturalHeight
  const scale = width / MASK_WIDTH
  const maskHeight = Math.round(height / scale)
  const margin = Math.ceil(Math.max(...radii) / scale) + 3
  const gridWidth = MASK_WIDTH + margin * 2
  const gridHeight = maskHeight + margin * 2

  const canvas = document.createElement('canvas')
  canvas.width = MASK_WIDTH
  canvas.height = maskHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) throw new Error('Canvas 2D is not available')

  context.drawImage(image, 0, 0, MASK_WIDTH, maskHeight)
  const { data } = context.getImageData(0, 0, MASK_WIDTH, maskHeight)

  const field = new Float64Array(gridWidth * gridHeight).fill(FAR)
  for (let y = 0; y < maskHeight; y++) {
    for (let x = 0; x < MASK_WIDTH; x++) {
      if (data[(y * MASK_WIDTH + x) * 4 + 3] > ALPHA_THRESHOLD) {
        field[(y + margin) * gridWidth + x + margin] = 0
      }
    }
  }
  distanceField(field, gridWidth, gridHeight)

  const paths = radii.map((radius) => {
    const loop = outerLoop(contours(field, gridWidth, gridHeight, radius / scale))
    if (!loop) return ''

    const step = Math.max(1, Math.floor(loop.length / 700))
    const points = loop.filter((_, index) => index % step === 0)
    const commands = points.map(([x, y], index) => {
      const px = ((x - margin + 0.5) * scale).toFixed(1)
      const py = ((y - margin + 0.5) * scale).toFixed(1)
      return `${index === 0 ? 'M' : 'L'}${px} ${py}`
    })

    return `${commands.join(' ')} Z`
  })

  return { width, height, pad: Math.max(...radii) + 12, paths }
}
