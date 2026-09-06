export interface BlogCategory {
  slug: string;
  name: string;
}

export interface BlogPostSummary {
  slug: string;
  coverImageUrl: string | null;
  publishedAt: string | null;
  title: string;
  excerpt: string | null;
  categories: BlogCategory[];
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  metaDescription: string | null;
}
