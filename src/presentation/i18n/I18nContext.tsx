/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  translations,
  type LanguageCode,
  type TranslationSet,
} from "./translations";

/* ─── Helpers ─── */

function getInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem("wasakabe-lang") as LanguageCode | null;
  if (saved && saved in translations) return saved;
  const browserLang = navigator.language?.slice(0, 2) as LanguageCode;
  if (browserLang in translations) return browserLang;
  return "es";
}

function setStoredLanguage(lang: LanguageCode) {
  try {
    localStorage.setItem("wasakabe-lang", lang);
  } catch {
    /* no-op */
  }
}

/* ─── Context ─── */

export interface I18nContextValue {
  lang: LanguageCode;
  t: TranslationSet;
  setLang: (lang: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ─── Provider ─── */

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(getInitialLanguage);

  const setLang = useCallback((next: LanguageCode) => {
    setLangState(next);
    setStoredLanguage(next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : next;
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, t: translations[lang], setLang }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/* ─── Hook ─── */

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
