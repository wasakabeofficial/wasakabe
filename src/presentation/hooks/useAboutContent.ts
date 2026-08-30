import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { AboutContent } from "../../core";

interface AboutContentState {
  data: AboutContent | null;
  loading: boolean;
}

export function useAboutContent(): AboutContentState {
  const { aboutContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<AboutContentState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    aboutContentRepository
      .getAboutContent(lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar About:", error);
        if (!cancelled) {
          setState((previousState) => ({ ...previousState, loading: false }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [aboutContentRepository, lang]);

  return state;
}
