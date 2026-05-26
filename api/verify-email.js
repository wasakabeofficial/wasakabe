/**
 * POST /api/verify-email
 *
 * Verifica si un correo electrónico realmente existe mediante:
 *   1. Resolución de registros MX (DNS nativo)
 *   2. Handshake SMTP con el servidor de correo (RCPT TO)
 *
 * Funciona como:
 *   - Vercel Serverless Function (exporta handler)
 *   - Servidor local standalone (node api/verify-email.js)
 */

import { promises as dns } from "node:dns";
import net from "node:net";

const SMTP_TIMEOUT = 8000;
const FROM_DOMAIN = "wasakabe.com";
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

function validarFormato(email) {
  const trimmed = email.trim();
  if (!trimmed) return "El correo no puede estar vacío.";
  if (trimmed.length > 254) return "El correo es demasiado largo.";
  if (!emailRegex.test(trimmed)) return "El formato del correo no es válido.";
  const domain = trimmed.slice(trimmed.lastIndexOf("@") + 1).toLowerCase();
  if (!domain.includes(".")) return "El dominio debe tener un TLD válido.";
  const tld = domain.split(".").pop();
  if (tld.length < 2 || tld.length > 63)
    return "El TLD del correo no es válido.";
  return null;
}

async function resolverMX(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return {
      records: records.sort((a, b) => a.priority - b.priority),
      error: null,
    };
  } catch (err) {
    if (
      err.code === "ENOTFOUND" ||
      err.code === "ENODATA" ||
      err.code === "NXDOMAIN"
    ) {
      return { records: [], error: "nxdomain" };
    }
    return { records: [], error: "dns_error" };
  }
}

function smtpVerify(email, host) {
  return new Promise((resolve) => {
    let buffer = "";
    let step = 0;
    let resolved = false;

    const done = (result) => {
      if (!resolved) {
        resolved = true;
        socket.destroy();
        resolve(result);
      }
    };

    const send = (cmd) => socket.write(cmd + "\r\n");

    const socket = new net.Socket();
    socket.setTimeout(SMTP_TIMEOUT);
    socket.connect(25, host);

    socket.on("data", (raw) => {
      buffer += raw.toString();
      while (buffer.includes("\r\n")) {
        const idx = buffer.indexOf("\r\n");
        const line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 2);

        const code = parseInt(line.substring(0, 3), 10);

        if (step === 0) {
          if (code === 220) {
            step = 1;
            send(`HELO ${FROM_DOMAIN}`);
          } else {
            done(null);
          }
        } else if (step === 1) {
          if (code === 250) {
            step = 2;
            send(`MAIL FROM:<verify@${FROM_DOMAIN}>`);
          } else {
            done(null);
          }
        } else if (step === 2) {
          if (code === 250) {
            step = 3;
            send(`RCPT TO:<${email}>`);
          } else {
            done(null);
          }
        } else if (step === 3) {
          if (code === 250) {
            done(true);
          } else if (code >= 550 && code < 560) {
            done(false);
          } else {
            done(null);
          }
        }
      }
    });

    socket.on("error", () => done(null));
    socket.on("timeout", () => done(null));
    socket.on("close", () => done(null));
  });
}

async function verifyEmail(email) {
  const errorFormato = validarFormato(email);
  if (errorFormato) {
    return { exists: false, confidence: "high", reason: errorFormato };
  }

  const domain = email
    .trim()
    .slice(email.trim().lastIndexOf("@") + 1)
    .toLowerCase();
  const mxResult = await resolverMX(domain);

  if (mxResult.error === "dns_error") {
    return {
      exists: null,
      confidence: "low",
      reason:
        "No se pudo consultar el dominio en este momento. Intenta de nuevo.",
      mxRecords: [],
    };
  }

  if (mxResult.records.length === 0) {
    return {
      exists: false,
      confidence: "high",
      reason:
        "El dominio del correo no existe o no tiene servidores de correo configurados.",
      mxRecords: [],
    };
  }

  const mxHost = mxResult.records[0].exchange;

  try {
    const smtpResult = await smtpVerify(email, mxHost);

    if (smtpResult === true) {
      return {
        exists: true,
        confidence: "high",
        reason: "El servidor de correo confirmó que el buzón existe.",
        mxRecords: mxResult.records,
      };
    }

    if (smtpResult === false) {
      return {
        exists: false,
        confidence: "high",
        reason: "El servidor de correo reportó que el buzón no existe.",
        mxRecords: mxResult.records,
      };
    }

    return {
      exists: null,
      confidence: "low",
      reason:
        "No se pudo verificar el buzón (el servidor no confirmó ni rechazó). El dominio tiene correo configurado.",
      mxRecords: mxResult.records,
    };
  } catch {
    return {
      exists: null,
      confidence: "low",
      reason: "Error al conectar con el servidor de correo.",
      mxRecords: mxResult.records,
    };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido. Usa POST." });
    return;
  }

  const { email } = req.body || {};

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "El campo 'email' es requerido." });
    return;
  }

  const result = await verifyEmail(email);
  res.status(200).json(result);
}

if (
  process.argv[1] &&
  process.argv[1].replace(/\\/g, "/").endsWith("api/verify-email.js")
) {
  const http = await import("node:http");

  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method !== "POST" || req.url !== "/api/verify-email") {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { email } = JSON.parse(body);
        if (!email) throw new Error("email required");
        const result = await verifyEmail(email);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(
      `🚀 Email verification API running on http://localhost:${PORT}`,
    );
  });
}
