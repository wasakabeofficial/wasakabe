import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

interface ExperienceItemProps {
  side: "left" | "right";
  periodLabel: string;
  role: string;
  company: string | null;
  location: string | null;
  highlights: string[];
  tags: string[];
}

export default function ExperienceItem({
  side,
  periodLabel,
  role,
  company,
  location,
  highlights,
  tags,
}: ExperienceItemProps) {
  const { elementRef, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <article
      ref={elementRef}
      className={`experience-item experience-item--${side} reveal reveal--${side} ${isVisible ? "is-visible" : ""}`}
    >
      <div className="experience-dot" aria-hidden="true" />

      <div className="experience-card">
        <span className="experience-period">{periodLabel}</span>
        <h3 className="experience-role">{role}</h3>
        <span className="experience-company">{company}</span>
        <span className="experience-location">
          <span className="experience-flag" aria-hidden="true">🇲🇽</span>
          {location}
        </span>

        <ul className="experience-highlights">
          {highlights.map((highlight, highlightIndex) => (
            <li key={highlightIndex} className="experience-highlight">
              {highlight}
            </li>
          ))}
        </ul>

        <div className="experience-tags">
          {tags.map((tag) => (
            <span key={tag} className="experience-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
