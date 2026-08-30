import type { CSSProperties, ComponentType } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

interface CanalCardProps {
  name: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  accent: "gold" | "crimson";
  handle: string;
  description: string;
  stats: string[];
  url: string;
  label: string;
  revealDelayMs: number;
}

export default function CanalCard({
  name,
  icon: Icon,
  accent,
  handle,
  description,
  stats,
  url,
  label,
  revealDelayMs,
}: CanalCardProps) {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <article
      ref={elementRef}
      className={`canal-card canal-card--${accent} reveal ${isVisible ? "is-visible" : ""}`}
      style={{ "--reveal-delay": `${revealDelayMs}ms` } as CSSProperties}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="canal-card-corner-link"
        aria-label={label}
      >
        <MdArrowOutward aria-hidden="true" />
      </a>

      <div className="canal-card-top">
        <Icon className="canal-card-icon" aria-hidden={true} />
        <span className="canal-card-name">{name}</span>
      </div>

      <span className="canal-card-handle">{handle}</span>

      <p className="canal-card-desc">{description}</p>

      <div className="canal-card-stats">
        {stats.map((stat) => (
          <span key={stat} className="canal-card-stat">
            {stat}
          </span>
        ))}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="canal-card-btn"
      >
        {label} →
      </a>
    </article>
  );
}
