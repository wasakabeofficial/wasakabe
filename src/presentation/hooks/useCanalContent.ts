import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { CanalContent } from "../../core";

interface CanalContentState {
  data: CanalContent | null;
  loading: boolean;
}

export function useCanalContent(): CanalContentState {
  const { canalContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<CanalContentState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    canalContentRepository
      .getCanalContent(lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar Canal:", error);
        if (!cancelled) {
          setState((previousState) => ({ ...previousState, loading: false }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [canalContentRepository, lang]);

  return state;
}
