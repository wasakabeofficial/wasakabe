import type { LanguageCode } from "../../core";

export const FALLBACK_LANGUAGE: LanguageCode = "es";

/**
 * Idiomas a pedir a Supabase para un campo: el solicitado y, si no es el
 * de respaldo, también el de respaldo — así una fila sin traducción
 * propia todavía se recupera vía `pickTranslation` en vez de desaparecer.
 */
export function languageFilter(language: LanguageCode): LanguageCode[] {
  return language === FALLBACK_LANGUAGE ? [language] : [language, FALLBACK_LANGUAGE];
}

export function pickTranslation<T extends { language_code: string }>(
  translations: T[],
  language: LanguageCode,
): T | undefined {
  return (
    translations.find((t) => t.language_code === language) ??
    translations.find((t) => t.language_code === FALLBACK_LANGUAGE)
  );
}
