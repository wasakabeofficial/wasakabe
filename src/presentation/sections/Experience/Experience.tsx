import { useExperienceContent } from "../../hooks/useExperienceContent";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import ExperienceItem from "./ExperienceItem";
import "./Experience.css";

export default function Experience() {
  const { data: experience, loading } = useExperienceContent();
  const { elementRef: timelineRef, isVisible: isTimelineVisible } =
    useRevealOnScroll<HTMLDivElement>();

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

        <div
          ref={timelineRef}
          className={`experience-timeline ${isTimelineVisible ? "experience-timeline--visible" : ""}`}
        >
          <div className="experience-line" aria-hidden="true" />

          {experience.entries.map((entry, index) => (
            <ExperienceItem
              key={entry.slug}
              side={index % 2 === 0 ? "left" : "right"}
              periodLabel={entry.periodLabel}
              role={entry.role}
              company={entry.company}
              location={entry.location}
              highlights={entry.highlights}
              tags={entry.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
