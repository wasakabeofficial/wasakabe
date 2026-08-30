import { useEffect, useState } from "react";
import { useDependencies } from "../context/DependenciesContext";
import { useI18n } from "../i18n/I18nContext";
import type { BlogPostSummary } from "../../core";

interface BlogContentState {
  posts: BlogPostSummary[];
  loading: boolean;
}

export function useBlogContent(): BlogContentState {
  const { blogContentRepository } = useDependencies();
  const { lang } = useI18n();
  const [state, setState] = useState<BlogContentState>({
    posts: [],
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    blogContentRepository
      .getPublishedBlogPosts(lang)
      .then((posts) => {
        if (!cancelled) setState({ posts, loading: false });
      })
      .catch((error) => {
        console.error("Error al cargar Blog:", error);
        if (!cancelled) {
          setState((previousState) => ({ ...previousState, loading: false }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [blogContentRepository, lang]);

  return state;
}
