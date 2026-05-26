import type {
  IEmailVerifier,
  EmailVerificationResult,
} from "../../core";

/* ─── Tipo para la respuesta de la API verify-email ─── */
interface VerifyEmailResponse {
  exists: boolean | null;
  confidence: "high" | "low";
  reason?: string;
  mxRecords?: Array<{ priority: number; exchange: string }>;
}

export class BackendEmailVerifier implements IEmailVerifier {
  async verify(email: string): Promise<EmailVerificationResult> {
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        return {
          valid: true,
          reason: null,
          warning: "El servicio de verificación no está disponible.",
        };
      }

      const data: VerifyEmailResponse = await res.json();

      if (data.exists === false && data.confidence === "high") {
        return { valid: false, reason: data.reason ?? null, warning: null };
      }

      if (data.exists === true) {
        return { valid: true, reason: null, warning: null };
      }

      if (data.exists === false && data.confidence === "low") {
        return {
          valid: true,
          reason: null,
          warning:
            data.reason ?? "No se pudo verificar el correo completamente.",
        };
      }

      return {
        valid: true,
        reason: null,
        warning: data.reason ?? null,
      };
    } catch {
      return {
        valid: true,
        reason: null,
        warning: "Error de red al verificar el correo.",
      };
    }
  }
}
