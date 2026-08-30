import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { ExperienceContent } from "../../core";

interface ExperienceContentState {
  data: ExperienceContent | null;
  loading: boolean;
}

export function useExperienceContent(): ExperienceContentState {
  const { experienceContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<ExperienceContentState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    experienceContentRepository
      .getExperienceContent(lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar Trayectoria:", error);
        if (!cancelled) {
          setState((previousState) => ({ ...previousState, loading: false }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [experienceContentRepository, lang]);

  return state;
}
