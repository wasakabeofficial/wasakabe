import { useI18n } from "../../i18n/I18nContext";
import { yo } from "../../../assets";
import "./About.css";

export default function About() {
  const { t } = useI18n();
  const about = t.about;

  const badges = [
    ...about.badgesTech.map((label) => ({ label, type: "tech" as const })),
    ...about.badgesCreative.map((label) => ({ label, type: "creative" as const })),
  ];

  return (
    <section className="about">
      <div className="about-layout">
        <div className="about-media">
          <div className="about-frame" aria-hidden="true" />
          <div className="about-frame-corner" aria-hidden="true" />
          <img
            src={yo}
            alt="Alan de Jesús Martínez Hernández — Wasaka Be"
            className="about-img"
            loading="lazy"
          />
          <div className="about-img-glow" aria-hidden="true" />
        </div>

        <div className="about-body">
          <div className="about-accent-bar" aria-hidden="true" />

          <span className="about-eyebrow">{about.eyebrow}</span>

          <h2 className="about-heading">
            {about.headingStart}
            <br />
            <span className="about-heading-gold">{about.headingGold}</span> {about.headingEnd}
          </h2>

          <p className="about-pull">{about.pullQuote}</p>

          <p className="about-text">{about.text1}</p>
          <p className="about-text">{about.text2}</p>

          <p className="about-text">
            <span className="about-credential">
              {about.text3Start}
              <a
                href="https://www.uthh.edu.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="about-link"
              >
                {about.text3Link}
              </a>
              <span className="about-credential-sep" aria-hidden="true" />
              {about.text3End}
              <span className="about-brand">{about.brand}</span>
            </span>
          </p>

          <div className="about-divider" aria-hidden="true" />

          <div className="about-badges">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`about-badge about-badge--${badge.type}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
