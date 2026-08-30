import type { CSSProperties, ComponentType } from "react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

interface ServiceCardProps {
  position: number;
  title: string;
  description: string;
  ctaLabel: string;
  icon: ComponentType<{ "aria-hidden"?: boolean }>;
  accent: "gold" | "crimson";
  revealDelayMs: number;
}

export default function ServiceCard({
  position,
  title,
  description,
  ctaLabel,
  icon: Icon,
  accent,
  revealDelayMs,
}: ServiceCardProps) {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <article
      ref={elementRef}
      className={`services-card services-card--${accent} reveal ${isVisible ? "is-visible" : ""}`}
      style={{ "--reveal-delay": `${revealDelayMs}ms` } as CSSProperties}
    >
      <span className="services-card-num" aria-hidden="true">
        {String(position).padStart(2, "0")}
      </span>

      <div className="services-card-top">
        <span className="services-card-icon">
          <Icon aria-hidden={true} />
        </span>
        <h3 className="services-card-title">{title}</h3>
      </div>

      <div className="services-card-line" aria-hidden="true" />

      <p className="services-card-desc">{description}</p>

      <span className="services-card-cta">{ctaLabel}</span>
    </article>
  );
}
