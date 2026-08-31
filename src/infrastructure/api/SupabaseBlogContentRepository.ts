import type {
  BlogCategory,
  BlogPost,
  BlogPostSummary,
  IBlogContentRepository,
  LanguageCode,
} from "../../core";
import { supabase } from "./supabaseClient";

interface BlogCategoryRow {
  slug: string;
  blog_category_translations: { name: string }[];
}

interface BlogPostCategoryLinkRow {
  blog_categories: BlogCategoryRow | null;
}

interface BlogPostSummaryRow {
  slug: string;
  cover_image_url: string | null;
  published_at: string | null;
  blog_post_translations: { title: string; excerpt: string | null }[];
  blog_post_categories: BlogPostCategoryLinkRow[];
}

interface BlogPostDetailRow extends BlogPostSummaryRow {
  blog_post_translations: {
    title: string;
    excerpt: string | null;
    content: string;
    meta_description: string | null;
  }[];
}

function mapBlogCategoryLinks(
  categoryLinks: BlogPostCategoryLinkRow[],
): BlogCategory[] {
  return categoryLinks
    .filter(
      (categoryLink): categoryLink is { blog_categories: BlogCategoryRow } =>
        categoryLink.blog_categories != null,
    )
    .map((categoryLink) => ({
      slug: categoryLink.blog_categories.slug,
      name: categoryLink.blog_categories.blog_category_translations[0]?.name ?? "",
    }));
}

export class SupabaseBlogContentRepository implements IBlogContentRepository {
  async getBlogCategories(language: LanguageCode): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("slug, blog_category_translations!inner(name)")
      .eq("blog_category_translations.language_code", language)
      .order("slug");

    if (error || !data) {
      throw new Error(error?.message ?? "No se encontraron categorías de blog");
    }

    const categoryRows = data as unknown as BlogCategoryRow[];

    return categoryRows.map((categoryRow) => ({
      slug: categoryRow.slug,
      name: categoryRow.blog_category_translations[0].name,
    }));
  }

  async getPublishedBlogPosts(
    language: LanguageCode,
  ): Promise<BlogPostSummary[]> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "slug, cover_image_url, published_at, blog_post_translations!inner(title, excerpt), blog_post_categories(blog_categories(slug, blog_category_translations!inner(name)))",
      )
      .eq("status", "published")
      .eq("blog_post_translations.language_code", language)
      .eq(
        "blog_post_categories.blog_categories.blog_category_translations.language_code",
        language,
      )
      .order("published_at", { ascending: false });

    if (error || !data) {
      throw new Error(error?.message ?? "No se encontraron publicaciones");
    }

    const postRows = data as unknown as BlogPostSummaryRow[];

    return postRows.map(
      (postRow): BlogPostSummary => ({
        slug: postRow.slug,
        coverImageUrl: postRow.cover_image_url,
        publishedAt: postRow.published_at,
        title: postRow.blog_post_translations[0].title,
        excerpt: postRow.blog_post_translations[0].excerpt,
        categories: mapBlogCategoryLinks(postRow.blog_post_categories),
      }),
    );
  }

  async getBlogPostBySlug(
    slug: string,
    language: LanguageCode,
  ): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "slug, cover_image_url, published_at, blog_post_translations!inner(title, excerpt, content, meta_description), blog_post_categories(blog_categories(slug, blog_category_translations!inner(name)))",
      )
      .eq("status", "published")
      .eq("slug", slug)
      .eq("blog_post_translations.language_code", language)
      .eq(
        "blog_post_categories.blog_categories.blog_category_translations.language_code",
        language,
      )
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return null;

    const postRow = data as unknown as BlogPostDetailRow;
    const translation = postRow.blog_post_translations[0];

    return {
      slug: postRow.slug,
      coverImageUrl: postRow.cover_image_url,
      publishedAt: postRow.published_at,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      metaDescription: translation.meta_description,
      categories: mapBlogCategoryLinks(postRow.blog_post_categories),
    };
  }
}
