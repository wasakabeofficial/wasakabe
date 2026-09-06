import type {
  BlogCategory,
  BlogPost,
  BlogPostSummary,
  IBlogContentRepository,
  LanguageCode,
} from "../../core";
import { supabase } from "./supabaseClient";
import { languageFilter, pickTranslation } from "./languageFallback";

interface BlogCategoryRow {
  slug: string;
  blog_category_translations: { language_code: string; name: string }[];
}

interface BlogPostCategoryLinkRow {
  blog_categories: BlogCategoryRow | null;
}

interface BlogPostSummaryRow {
  slug: string;
  cover_image_url: string | null;
  published_at: string | null;
  blog_post_translations: { language_code: string; title: string; excerpt: string | null }[];
  blog_post_categories: BlogPostCategoryLinkRow[];
}

interface BlogPostDetailRow extends BlogPostSummaryRow {
  blog_post_translations: {
    language_code: string;
    title: string;
    excerpt: string | null;
    content: string;
    meta_description: string | null;
  }[];
}

function mapBlogCategoryLinks(
  categoryLinks: BlogPostCategoryLinkRow[],
  language: LanguageCode,
): BlogCategory[] {
  return categoryLinks
    .filter(
      (categoryLink): categoryLink is { blog_categories: BlogCategoryRow } =>
        categoryLink.blog_categories != null,
    )
    .map((categoryLink) => ({
      slug: categoryLink.blog_categories.slug,
      name: pickTranslation(categoryLink.blog_categories.blog_category_translations, language)?.name ?? "",
    }));
}

export class SupabaseBlogContentRepository implements IBlogContentRepository {
  async getBlogCategories(language: LanguageCode): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("slug, blog_category_translations!inner(language_code, name)")
      .in("blog_category_translations.language_code", languageFilter(language))
      .order("slug");

    if (error || !data) {
      throw new Error(error?.message ?? "No se encontraron categorías de blog");
    }

    const categoryRows = data as unknown as BlogCategoryRow[];

    return categoryRows.map((categoryRow) => ({
      slug: categoryRow.slug,
      name: pickTranslation(categoryRow.blog_category_translations, language)?.name ?? "",
    }));
  }

  async getPublishedBlogPosts(
    language: LanguageCode,
  ): Promise<BlogPostSummary[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "slug, cover_image_url, published_at, blog_post_translations!inner(language_code, title, excerpt), blog_post_categories(blog_categories(slug, blog_category_translations!inner(language_code, name)))",
      )
      .eq("status", "published")
      .in("blog_post_translations.language_code", languageFilter(language))
      .in(
        "blog_post_categories.blog_categories.blog_category_translations.language_code",
        languageFilter(language),
      )
      .order("published_at", { ascending: false });

    if (error || !data) {
      throw new Error(error?.message ?? "No se encontraron publicaciones");
    }

    const postRows = data as unknown as BlogPostSummaryRow[];

    return postRows.map((postRow): BlogPostSummary => {
      const translation = pickTranslation(postRow.blog_post_translations, language);
      return {
        slug: postRow.slug,
        coverImageUrl: postRow.cover_image_url,
        publishedAt: postRow.published_at,
        title: translation?.title ?? "",
        excerpt: translation?.excerpt ?? null,
        categories: mapBlogCategoryLinks(postRow.blog_post_categories, language),
      };
    });
  }

  async getBlogPostBySlug(
    slug: string,
    language: LanguageCode,
  ): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "slug, cover_image_url, published_at, blog_post_translations!inner(language_code, title, excerpt, content, meta_description), blog_post_categories(blog_categories(slug, blog_category_translations!inner(language_code, name)))",
      )
      .eq("status", "published")
      .eq("slug", slug)
      .in("blog_post_translations.language_code", languageFilter(language))
      .in(
        "blog_post_categories.blog_categories.blog_category_translations.language_code",
        languageFilter(language),
      )
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return null;

    const postRow = data as unknown as BlogPostDetailRow;
    const translation = pickTranslation(postRow.blog_post_translations, language);
    if (!translation) return null;

    return {
      slug: postRow.slug,
      coverImageUrl: postRow.cover_image_url,
      publishedAt: postRow.published_at,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      metaDescription: translation.meta_description,
      categories: mapBlogCategoryLinks(postRow.blog_post_categories, language),
    };
  }
}
