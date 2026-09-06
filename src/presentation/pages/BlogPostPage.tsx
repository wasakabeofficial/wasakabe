import type { MouseEvent } from "react";
import { useBlogPost } from "../hooks/useBlogPost";
import { useBlogContent } from "../hooks/useBlogContent";
import { useI18n } from "../i18n/I18nContext";
import BlogCoverArt from "../sections/Blog/BlogCoverArt";
import "./BlogPostPage.css";

const MAX_RELATED_POSTS = 3;

interface BlogPostPageProps {
  slug: string;
}

function formatPublishedDate(publishedAt: string | null, lang: string): string | null {
  if (!publishedAt) return null;
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishedAt));
}

export default function BlogPostPage({ slug }: BlogPostPageProps) {
  const { t, lang } = useI18n();
  const bp = t.blogPost;
  const { data: post, loading } = useBlogPost(slug);
  const { posts: allPosts } = useBlogContent();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, MAX_RELATED_POSTS);

  const handleBackClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Mismo patrón que ServiceDetailPage: si esta pestaña se abrió desde
    // el sitio (la card del blog abre en una pestaña nueva), la cerramos
    // en vez de navegar dentro de ella.
    if (window.opener) {
      event.preventDefault();
      window.close();
    }
  };

  if (loading) return null;

  if (!post) {
    return (
      <main className="blog-post-page">
        <div className="blog-post-layout">
          <a href="/#blog" className="blog-post-back" onClick={handleBackClick}>{bp.back}</a>
          <h1 className="blog-post-title">{bp.notFoundTitle}</h1>
          <p className="blog-post-desc">{bp.notFoundDesc}</p>
        </div>
      </main>
    );
  }

  const publishedDate = formatPublishedDate(post.publishedAt, lang);
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <main className="blog-post-page">
      <div className="blog-post-layout">
        <a href="/#blog" className="blog-post-back" onClick={handleBackClick}>{bp.back}</a>

        <div className="blog-post-cover">
          {post.coverImageUrl ? (
            <img src={post.coverImageUrl} alt="" />
          ) : (
            <BlogCoverArt categorySlug={post.categories[0]?.slug} />
          )}
        </div>

        <header className="blog-post-hero">
          {(post.categories.length > 0 || publishedDate) && (
            <div className="blog-post-meta">
              {post.categories.map((category) => (
                <span key={category.slug} className="blog-post-category">
                  {category.name}
                </span>
              ))}
              {publishedDate && <span className="blog-post-date">{publishedDate}</span>}
            </div>
          )}

          <h1 className="blog-post-title">{post.title}</h1>
          {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
        </header>

        <article className="blog-post-content">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>

        {relatedPosts.length > 0 && (
          <section className="blog-post-related">
            <h2 className="blog-post-related-heading">{bp.relatedHeading}</h2>
            <div className="blog-post-related-list">
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-related-item"
                >
                  <div className="blog-related-thumb">
                    {relatedPost.coverImageUrl ? (
                      <img src={relatedPost.coverImageUrl} alt="" />
                    ) : (
                      <BlogCoverArt categorySlug={relatedPost.categories[0]?.slug} />
                    )}
                  </div>
                  <div className="blog-related-body">
                    {relatedPost.categories[0] && (
                      <span className="blog-related-category">
                        {relatedPost.categories[0].name}
                      </span>
                    )}
                    <h3 className="blog-related-title">{relatedPost.title}</h3>
                  </div>
                  <span className="blog-related-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
