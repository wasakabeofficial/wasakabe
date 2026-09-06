import { useI18n } from "../../i18n/I18nContext";
import { useBlogContent } from "../../hooks/useBlogContent";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import BlogPostCard from "./BlogPostCard";
import "./Blog.css";

export default function Blog() {
  const { t } = useI18n();
  const { posts, loading } = useBlogContent();
  const { elementRef, isVisible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="blog" className="blog">
      <div className="blog-layout">
        <div className="blog-header">
          <span className="blog-eyebrow">{t.blog.eyebrow}</span>
          <h2 className="blog-title">
            {t.blog.titleStart} <span className="blog-title-gold">{t.blog.titleGold}</span>
          </h2>
          <p className="blog-sub">{t.blog.sub}</p>
        </div>

        {!loading && posts.length === 0 && (
          <div
            ref={elementRef}
            className={`blog-empty reveal ${isVisible ? "is-visible" : ""}`}
          >
            <p className="blog-empty-text">{t.blog.empty}</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
