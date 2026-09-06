import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { BlogPost } from "../../core";

interface BlogPostState {
  data: BlogPost | null;
  loading: boolean;
}

export function useBlogPost(slug: string): BlogPostState {
  const { blogContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<BlogPostState>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    blogContentRepository
      .getBlogPostBySlug(slug, lang)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar la publicación del blog:", error);
        if (!cancelled) setState({ data: null, loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, [blogContentRepository, slug, lang]);

  return state;
}
