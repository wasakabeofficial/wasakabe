import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { ServiceDetailContent } from "../../core";

interface ServiceDetailContentState {
  data: ServiceDetailContent | null;
  loading: boolean;
}

export function useServiceDetailContent(slug: string): ServiceDetailContentState {
  const { serviceDetailContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<ServiceDetailContentState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    serviceDetailContentRepository
      .getServiceDetailContent(slug, lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar el detalle del servicio:", error);
        if (!cancelled) setState({ data: null, loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, [serviceDetailContentRepository, slug, lang]);

  return state;
}
