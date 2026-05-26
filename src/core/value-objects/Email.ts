/** Códigos de error de validación de email */
export type EmailErrorCode =
  | "empty"
  | "tooLong"
  | "invalidFormat"
  | "noTld"
  | "localNotAllowed"
  | "invalidTld";

const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export function validateEmailFormat(value: string): EmailErrorCode | null {
  const trimmed = value.trim();

  if (!trimmed) return "empty";
  if (trimmed.length > 254) return "tooLong";
  if (!EMAIL_REGEX.test(trimmed)) return "invalidFormat";

  const domain = trimmed.slice(trimmed.lastIndexOf("@") + 1).toLowerCase();

  if (!domain.includes(".")) return "noTld";
  if (domain.startsWith("localhost")) return "localNotAllowed";

  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2 || tld.length > 63) return "invalidTld";

  return null;
}
