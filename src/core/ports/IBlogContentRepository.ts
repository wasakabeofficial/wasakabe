import type { LanguageCode } from "../value-objects/Language";
import type {
  BlogCategory,
  BlogPost,
  BlogPostSummary,
} from "../value-objects/BlogContent";

export interface IBlogContentRepository {
  getBlogCategories(language: LanguageCode): Promise<BlogCategory[]>;
  getPublishedBlogPosts(language: LanguageCode): Promise<BlogPostSummary[]>;
  getBlogPostBySlug(
    slug: string,
    language: LanguageCode,
  ): Promise<BlogPost | null>;
}
