import type { BlogPostSummary } from "../../../core";
import BlogCoverArt from "./BlogCoverArt";
import "./Blog.css";

export default function BlogPostCard({ post }: { post: BlogPostSummary }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-card"
    >
      <div className="blog-card-cover">
        {post.coverImageUrl ? (
          <img src={post.coverImageUrl} alt="" className="blog-card-image" />
        ) : (
          <BlogCoverArt categorySlug={post.categories[0]?.slug} />
        )}
      </div>
      <div className="blog-card-body">
        <h3 className="blog-card-title">{post.title}</h3>
      </div>
    </a>
  );
}
