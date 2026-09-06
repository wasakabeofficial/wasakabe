import { useState, type CSSProperties } from "react";
import { MdPlayArrow } from "react-icons/md";
import { useCanalContent } from "../../hooks/useCanalContent";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import { useI18n } from "../../i18n/I18nContext";
import { iconByPlatform, nameByPlatform } from "../../utils/socialPlatforms";
import "./Canal.css";

const ACCENTS = [
  "var(--color-gold-400)",
  "var(--color-crim-400)",
  "var(--color-gold-400)",
  "var(--color-crim-400)",
];

function accentForIndex(index: number): string {
  return ACCENTS[index % ACCENTS.length];
}

export default function Canal() {
  const { data: canal, loading } = useCanalContent();
  const { t } = useI18n();
  const { elementRef, isVisible } = useRevealOnScroll<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading || !canal || canal.channels.length === 0) return null;

  const channels = canal.channels;
  const safeIndex = activeIndex < channels.length ? activeIndex : 0;
  const active = channels[safeIndex];
  const Icon = iconByPlatform[active.platform];
  const accent = accentForIndex(safeIndex);

  const goPrev = () =>
    setActiveIndex((i) => (i - 1 + channels.length) % channels.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % channels.length);

  return (
    <section id="canal" className="canal">
      <div className="canal-layout">
        <div className="canal-header">
          <span className="canal-eyebrow">{canal.eyebrow}</span>
          <h2 className="canal-title">
            {canal.titleStart}{" "}
            <span className="canal-title-gold">{canal.titleGold}</span>
          </h2>
          <p className="canal-sub">{canal.sub}</p>
        </div>

        <div
          ref={elementRef}
          className={`canal-tv reveal ${isVisible ? "is-visible" : ""}`}
          style={{ "--tv-accent": accent } as CSSProperties}
        >
          <div className="tv-set">
            <div className="tv-screen">
              <div className="tv-screen-vignette" aria-hidden="true" />
              <div className="tv-scanlines" aria-hidden="true" />

              <div className="tv-hud">
                <span className="tv-hud-live">
                  <span className="tv-hud-dot" />
                  {t.canal.liveLabel}
                </span>
                <span className="tv-hud-channel">
                  CH {String(safeIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <div key={active.platform} className="tv-content">
                {Icon && <Icon className="tv-content-icon" aria-hidden={true} />}
                <h3 className="tv-content-name">
                  {nameByPlatform[active.platform] ?? active.platform}
                </h3>
                <span className="tv-content-handle">{active.handle}</span>
                <p className="tv-content-desc">{active.description}</p>

                <div className="tv-content-stats">
                  {active.stats.map((stat) => (
                    <span key={stat} className="tv-content-stat">
                      {stat}
                    </span>
                  ))}
                </div>

                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tv-content-cta"
                >
                  <MdPlayArrow aria-hidden="true" />
                  {active.label}
                </a>
              </div>
            </div>

            <div className="tv-stand" aria-hidden="true" />
          </div>

          <div className="tv-remote">
            <div className="tv-remote-brand">
              <span className="tv-remote-power" aria-hidden="true" />
              WASAKABE·TV
            </div>

            <div className="tv-remote-pad" role="tablist" aria-label={canal.eyebrow}>
              {channels.map((channel, index) => {
                const ChannelIcon = iconByPlatform[channel.platform];
                return (
                  <button
                    key={channel.platform}
                    type="button"
                    role="tab"
                    aria-selected={index === safeIndex}
                    aria-label={nameByPlatform[channel.platform] ?? channel.platform}
                    className={`tv-remote-btn ${index === safeIndex ? "is-active" : ""}`}
                    style={{ "--btn-accent": accentForIndex(index) } as CSSProperties}
                    onClick={() => setActiveIndex(index)}
                  >
                    {ChannelIcon && <ChannelIcon aria-hidden="true" />}
                    <span className="tv-remote-btn-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="tv-remote-nav">
              <button
                type="button"
                className="tv-remote-nav-btn"
                onClick={goPrev}
                aria-label={t.canal.prevLabel}
              >
                CH −
              </button>
              <button
                type="button"
                className="tv-remote-nav-btn"
                onClick={goNext}
                aria-label={t.canal.nextLabel}
              >
                CH +
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
