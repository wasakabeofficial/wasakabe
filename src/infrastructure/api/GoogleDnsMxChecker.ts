import type {
  IEmailVerifier,
  EmailVerificationResult,
} from "../../core";

/* ─── Tipos para la respuesta de DNS Google ─── */
interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface DnsResponse {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: Array<{ name: string; type: number }>;
  Answer?: DnsAnswer[];
}

/* ─── Constantes ─── */
const NO_MX_WARNING =
  "El dominio no tiene servidores de correo configurados. Si es correcto, puedes enviar igual.";
const CACHE_MAX_AGE_MS = 30 * 60 * 1000; // 30 min

/* ─── Cache con expiración ─── */
interface CacheEntry {
  hasMX: boolean;
  timestamp: number;
}

const mxCache = new Map<string, CacheEntry>();

function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_MAX_AGE_MS;
}

export class GoogleDnsMxChecker implements IEmailVerifier {
  async verify(email: string): Promise<EmailVerificationResult> {
    const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
    const cached = mxCache.get(domain);

    if (cached && isCacheValid(cached)) {
      return cached.hasMX
        ? { valid: true, reason: null, warning: null }
        : { valid: true, reason: null, warning: NO_MX_WARNING };
    }

    try {
      const res = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`
      );

      if (!res.ok) {
        return {
          valid: true,
          reason: null,
          warning: "No se pudo consultar el servidor DNS.",
        };
      }

      const data: DnsResponse = await res.json();

      /* Status === 3 → NXDOMAIN (dominio no existe) */
      if (data.Status === 3) {
        mxCache.set(domain, { hasMX: false, timestamp: Date.now() });
        return { valid: true, reason: null, warning: NO_MX_WARNING };
      }

      const answerRecords = data.Answer ?? [];
      const mxRecords = answerRecords.filter((record) => record.type === 15);
      const hasMX = mxRecords.length > 0;

      mxCache.set(domain, { hasMX, timestamp: Date.now() });

      return hasMX
        ? { valid: true, reason: null, warning: null }
        : { valid: true, reason: null, warning: NO_MX_WARNING };
    } catch {
      return {
        valid: true,
        reason: null,
        warning: "Error de red al verificar el dominio del correo.",
      };
    }
  }
}
