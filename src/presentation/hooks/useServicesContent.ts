import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { ServicesContent } from "../../core";

interface ServicesContentState {
  data: ServicesContent | null;
  loading: boolean;
}

export function useServicesContent(): ServicesContentState {
  const { servicesContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<ServicesContentState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    servicesContentRepository
      .getServicesContent(lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar Servicios:", error);
        if (!cancelled) {
          setState((previousState) => ({ ...previousState, loading: false }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [servicesContentRepository, lang]);

  return state;
}
