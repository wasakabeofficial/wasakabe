import { useState } from "react";
import { MdFolder, MdFolderOpen, MdDescription } from "react-icons/md";
import { useExperienceContent } from "../../hooks/useExperienceContent";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import breinitLogo from "../../../assets/logos/breinit.png";
import neuropointLogo from "../../../assets/logos/neuropoint.svg";
import likeCapitalLogo from "../../../assets/logos/likecapital.png";

import "./Experience.css";

const COMPANY_LOGOS: Record<string, string> = {
  breinit: breinitLogo,
  "neuropoint.ai": neuropointLogo,
  neuropoint: neuropointLogo,
  "like capital": likeCapitalLogo,
};

function logoForCompany(company: string | null): string | null {
  if (!company) return null;
  return COMPANY_LOGOS[company.trim().toLowerCase()] ?? null;
}

export default function Experience() {
  const { data: experience, loading } = useExperienceContent();
  const { elementRef: headerRef, isVisible: isHeaderVisible } =
    useRevealOnScroll<HTMLDivElement>();
  const { elementRef: explorerRef, isVisible: isExplorerVisible } =
    useRevealOnScroll<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading || !experience) return null;

  const entries = experience.entries;
  const active = entries[activeIndex];

  return (
    <section className="experience" id="experience">
      <div className="experience-layout">
        <div
          ref={headerRef}
          className={`experience-header reveal ${isHeaderVisible ? "is-visible" : ""}`}
        >
          <span className="experience-eyebrow">{experience.eyebrow}</span>
          <h2 className="experience-title">
            {experience.titleStart}{" "}
            <span className="experience-title-gold">{experience.titleGold}</span>
          </h2>
          <p className="experience-sub">{experience.sub}</p>
        </div>

        <div
          ref={explorerRef}
          className={`experience-explorer reveal ${isExplorerVisible ? "is-visible" : ""}`}
        >
          <div className="explorer-path">
            <MdFolderOpen aria-hidden="true" />
            <span>Trayectoria</span>
          </div>

          <div className="explorer-folders" role="tablist" aria-label={experience.eyebrow}>
            {entries.map((entry, index) => {
              const logo = logoForCompany(entry.company);
              return (
                <button
                  key={entry.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  className={`explorer-folder ${index === activeIndex ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                >
                  {logo ? (
                    <span className="explorer-folder-logo">
                      <img src={logo} alt="" />
                    </span>
                  ) : index === activeIndex ? (
                    <MdFolderOpen aria-hidden="true" className="explorer-folder-icon" />
                  ) : (
                    <MdFolder aria-hidden="true" className="explorer-folder-icon" />
                  )}
                  <span className="explorer-folder-name">
                    {entry.company ?? entry.role}
                  </span>
                  <span className="explorer-folder-period">{entry.periodLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="explorer-window">
            <div className="explorer-window-header">
              {logoForCompany(active.company) ? (
                <span className="explorer-window-logo">
                  <img src={logoForCompany(active.company)!} alt="" />
                </span>
              ) : (
                <MdFolderOpen aria-hidden="true" className="explorer-window-icon" />
              )}
              <div className="explorer-window-heading">
                <h3 className="explorer-window-role">{active.role}</h3>
                <span className="explorer-window-meta">
                  {active.company}
                  {active.company && active.location ? " · " : ""}
                  {active.location && (
                    <>
                      <span aria-hidden="true">🇲🇽</span> {active.location}
                    </>
                  )}
                </span>
              </div>
              <span className="explorer-window-period">{active.periodLabel}</span>
            </div>

            <div className="explorer-files">
              {active.highlights.map((highlight, index) => (
                <div key={index} className="explorer-file">
                  <MdDescription aria-hidden="true" className="explorer-file-icon" />
                  <span className="explorer-file-text">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="explorer-tags">
              {active.tags.map((tag) => (
                <span key={tag} className="explorer-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
