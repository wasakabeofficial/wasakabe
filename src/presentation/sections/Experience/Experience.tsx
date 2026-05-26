import { useI18n } from "../../i18n/I18nContext";
import "./Experience.css";

const companies = [
  { company: "Neuropoint.ai", location: "San Pedro Garza García, N.L." },
  { company: "Like Capital", location: "San Pedro Garza García, N.L." },
  { company: "CBTA No. 5", location: "Huejutla de Reyes, Hgo." },
  { company: "IFRESH", location: "Pachuca, Hgo." },
];

export default function Experience() {
  const { t } = useI18n();
  const e = t.experience;

  return (
    <section className="experience" id="experience">
      <div className="experience-layout">
        <div className="experience-header">
          <span className="experience-eyebrow">{e.eyebrow}</span>
          <h2 className="experience-title">
            {e.titleStart} <span className="experience-title-gold">{e.titleGold}</span>
          </h2>
          <p className="experience-sub">{e.sub}</p>
        </div>

        <div className="experience-timeline">
          <div className="experience-line" aria-hidden="true" />

          {e.entries.map((item, i) => {
            const meta = companies[i];
            return (
              <article
                key={meta.company}
                className={`experience-item ${i % 2 === 0 ? "experience-item--left" : "experience-item--right"}`}
              >
                <div className="experience-dot" aria-hidden="true" />

                <div className="experience-card">
                  <span className="experience-period">{item.period}</span>
                  <h3 className="experience-role">{item.role}</h3>
                  <span className="experience-company">{meta.company}</span>
                  <span className="experience-location">
                    <span className="experience-flag" aria-hidden="true">🇲🇽</span>
                    {meta.location}
                  </span>

                  <ul className="experience-highlights">
                    {item.highlights.map((h, idx) => (
                      <li key={idx} className="experience-highlight">
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="experience-tags">
                    {item.tags.map((tag) => (
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
