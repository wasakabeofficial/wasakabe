import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { BlogPostSummary, LanguageCode } from "../../core";

interface BlogContentState {
  posts: BlogPostSummary[];
  loading: boolean;
  lang: LanguageCode | null;
}

interface BlogContentResult {
  posts: BlogPostSummary[];
  loading: boolean;
}

export function useBlogContent(): BlogContentResult {
  const { blogContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<BlogContentState>({
    posts: [],
    loading: true,
    lang: null,
  });

  useEffect(() => {
    let cancelled = false;
    blogContentRepository
      .getPublishedBlogPosts(lang)
      .then((posts) => {
        if (!cancelled) setState({ posts, loading: false, lang });
      })
      .catch((error) => {
        console.error("Error al cargar Blog:", error);
        if (!cancelled) {
          setState({ posts: [], loading: false, lang });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [blogContentRepository, lang]);

  // Mientras `state.lang` no coincida con el idioma activo, los posts
  // guardados pertenecen al idioma anterior: se tratan como "cargando"
  // en vez de mostrarlos, hasta que la nueva petición resuelva.
  const isStale = state.lang !== lang;
  return {
    posts: isStale ? [] : state.posts,
    loading: isStale || state.loading,
  };
}
