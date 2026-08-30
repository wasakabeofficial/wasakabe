import { useRef, type CSSProperties, type MouseEvent } from "react";
import { useAboutContent } from "../../hooks/useAboutContent";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import { yo } from "../../../assets";
import "./About.css";

export default function About() {
  const { data: about, loading } = useAboutContent();
  const { elementRef: mediaRef, isVisible: isMediaVisible } =
    useRevealOnScroll<HTMLDivElement>();
  const { elementRef: bodyRef, isVisible: isBodyVisible } =
    useRevealOnScroll<HTMLDivElement>();
  const tiltRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = tiltRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-py * 10).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(px * 10).toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    const card = tiltRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  if (loading || !about) return null;

  return (
    <section id="about" className="about">
      <div className="about-layout">
        <div
          ref={mediaRef}
          className={`about-media reveal reveal--left ${isMediaVisible ? "is-visible" : ""}`}
        >
          <div
            ref={tiltRef}
            className="about-tilt"
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
          >
            <div className="about-img-wrap">
              <img
                src={about.photoUrl ?? yo}
                alt="Alan de Jesús Martínez Hernández — Wasaka Be"
                className="about-img"
                loading="lazy"
              />
              <div className="about-img-glow" aria-hidden="true" />
            </div>

            <div className="about-tag">
              <span className="about-tag-dot" aria-hidden="true" />
              <div className="about-tag-text">
                <span className="about-tag-name">Alan Martínez</span>
                <span className="about-tag-brand">{about.brand}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={bodyRef}
          className={`about-body reveal reveal--right ${isBodyVisible ? "is-visible" : ""}`}
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          <span className="about-eyebrow">{about.eyebrow}</span>

          <h2 className="about-heading">
            {about.headingStart}
            <br />
            <span className="about-heading-gold">{about.headingGold}</span> {about.headingEnd}
          </h2>

          <div className="about-quote">
            <span className="about-quote-mark" aria-hidden="true">“</span>
            <p className="about-pull">{about.pullQuote}</p>
          </div>

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

          <div className="about-skills">
            <div className="about-skill-group">
              <span className="about-skill-label">Técnico</span>
              <div className="about-badges">
                {about.badgesTech.map((label) => (
                  <span key={label} className="about-badge about-badge--tech">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-skill-group">
              <span className="about-skill-label">Creativo</span>
              <div className="about-badges">
                {about.badgesCreative.map((label) => (
                  <span key={label} className="about-badge about-badge--creative">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
