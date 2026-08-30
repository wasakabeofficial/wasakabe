import { useExperienceContent } from "../../hooks/useExperienceContent";
import "./Experience.css";

export default function Experience() {
  const { data: experience, loading } = useExperienceContent();

  if (loading || !experience) return null;

  return (
    <section className="experience" id="experience">
      <div className="experience-layout">
        <div className="experience-header">
          <span className="experience-eyebrow">{experience.eyebrow}</span>
          <h2 className="experience-title">
            {experience.titleStart}{" "}
            <span className="experience-title-gold">
              {experience.titleGold}
            </span>
          </h2>
          <p className="experience-sub">{experience.sub}</p>
        </div>

        <div className="experience-timeline">
          <div className="experience-line" aria-hidden="true" />

          {experience.entries.map((entry, index) => {
            return (
              <article
                key={entry.slug}
                className={`experience-item ${index % 2 === 0 ? "experience-item--left" : "experience-item--right"}`}
              >
                <div className="experience-dot" aria-hidden="true" />

                <div className="experience-card">
                  <span className="experience-period">
                    {entry.periodLabel}
                  </span>
                  <h3 className="experience-role">{entry.role}</h3>
                  <span className="experience-company">{entry.company}</span>
                  <span className="experience-location">
                    <span className="experience-flag" aria-hidden="true">🇲🇽</span>
                    {entry.location}
                  </span>

                  <ul className="experience-highlights">
                    {entry.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        className="experience-highlight"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="experience-tags">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="experience-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
