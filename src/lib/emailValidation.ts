/*
 * ─── Validación de correo electrónico ───
 *
 * Niveles de validación:
 *   1. Formato (regex) → HARD BLOCK (frontend)
 *   2. SMTP verification → DEEP CHECK (backend API)
 *   3. Fallback MX DNS → SOFT CHECK (frontend vía Google DNS)
 *
 * El backend intenta un handshake SMTP con el servidor MX
 * para confirmar si el buzón realmente existe. Si el backend
 * no está disponible, se cae al check MX vía DNS-over-HTTPS.
 */

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const mxCache = new Map<string, boolean>();

export interface EmailValidation {
  valid: boolean;
  reason: string | null;
  warning: string | null;
}

function validarFormato(email: string): EmailValidation | null {
  const trimmed = email.trim();

  if (!trimmed) {
    return {
      valid: false,
      reason: "El correo no puede estar vacío.",
      warning: null,
    };
  }

  if (trimmed.length > 254) {
    return {
      valid: false,
      reason: "El correo es demasiado largo.",
      warning: null,
    };
  }

  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      reason: "El formato del correo no es válido. Ej: usuario@dominio.com",
      warning: null,
    };
  }

  const atIndex = trimmed.lastIndexOf("@");
  const domain = trimmed.slice(atIndex + 1).toLowerCase();

  if (!domain.includes(".")) {
    return {
      valid: false,
      reason: "El dominio debe tener un TLD válido (ej: .com, .mx, .org).",
      warning: null,
    };
  }

  const tld = domain.split(".").pop()?.toLowerCase() ?? "";
  if (tld.length < 2 || tld.length > 63) {
    return {
      valid: false,
      reason: "El TLD del correo no es válido.",
      warning: null,
    };
  }

  if (domain.startsWith("localhost")) {
    return {
      valid: false,
      reason: "No se permiten correos locales.",
      warning: null,
    };
  }

  return null;
}

async function checkMXFallback(domain: string): Promise<boolean> {
  const cached = mxCache.get(domain);
  if (cached !== undefined) return cached;

  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
    );

    if (!res.ok) return true;

    const data = await res.json();

    if (data.Status === 3) {
      mxCache.set(domain, false);
      return false;
    }

    const records: string[] = data.Answer ?? [];
    const tieneMx = records.some(
      (r: string) => !r.includes("0 .") && r.includes(" preference"),
    );

    mxCache.set(domain, tieneMx);
    return tieneMx;
  } catch {
    return true;
  }
}

export async function validateEmail(email: string): Promise<EmailValidation> {
  const formato = validarFormato(email);
  if (formato) return formato;

  try {
    const res = await fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("API not available");

    const data = await res.json();

    if (data.exists === false && data.confidence === "high") {
      return {
        valid: false,
        reason: data.reason || "El buzón de correo no existe.",
        warning: null,
      };
    }

    if (data.exists === true) {
      return { valid: true, reason: null, warning: null };
    }

    if (data.exists === false && data.confidence === "low") {
      return {
        valid: true,
        reason: null,
        warning: data.reason || "No se pudo verificar el correo completamente.",
      };
    }

    if (data.confidence === "low" && data.mxRecords?.length > 0) {
      return {
        valid: true,
        reason: null,
        warning:
          "No se pudo verificar el buzón, pero el dominio existe y tiene correo configurado.",
      };
    }

    return { valid: true, reason: null, warning: null };
  } catch {
    const domain = email
      .trim()
      .slice(email.trim().lastIndexOf("@") + 1)
      .toLowerCase();
    const mxOk = await checkMXFallback(domain);

    if (!mxOk) {
      return {
        valid: true,
        reason: null,
        warning:
          "El dominio no tiene servidores de correo configurados. Si es correcto, puedes enviar igual.",
      };
    }

    return { valid: true, reason: null, warning: null };
  }
}
