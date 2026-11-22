import type { InquiryData } from '../types'

export interface InquiryResult {
  /** true solo cuando el mensaje llegó realmente a un servidor. */
  delivered: boolean
}

/**
 * MARCADOR DE POSICIÓN: todavía no hay un backend conectado, así que el
 * mensaje NO se envía. Cuando exista el servicio, sustituye este cuerpo por
 * la llamada real y devuelve { delivered: true } si tuvo éxito.
 */
export async function sendInquiry(data: InquiryData): Promise<InquiryResult> {
  void data
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return { delivered: false }
}
