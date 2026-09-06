import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { AboutContent, LanguageCode } from "../../core";

interface AboutContentState {
  data: AboutContent | null;
  loading: boolean;
  lang: LanguageCode | null;
}

interface AboutContentResult {
  data: AboutContent | null;
  loading: boolean;
}

export function useAboutContent(): AboutContentResult {
  const { aboutContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<AboutContentState>({
    data: null,
    loading: true,
    lang: null,
  });

  useEffect(() => {
    let cancelled = false;
    aboutContentRepository
      .getAboutContent(lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, lang });
      })
      .catch((error) => {
        console.error("Error al cargar About:", error);
        if (!cancelled) {
          setState({ data: null, loading: false, lang });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [aboutContentRepository, lang]);

  // Mientras `state.lang` no coincida con el idioma activo, los datos
  // guardados pertenecen al idioma anterior: se tratan como "cargando"
  // en vez de mostrarlos, hasta que la nueva petición resuelva.
  const isStale = state.lang !== lang;
  return {
    data: isStale ? null : state.data,
    loading: isStale || state.loading,
  };
}
