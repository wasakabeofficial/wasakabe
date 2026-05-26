import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useI18n } from "../../i18n/I18nContext";
import "./Canal.css";

const youtubeId = import.meta.env.VITE_YOUTUBE_ID as string;
const facebookPageId = import.meta.env.VITE_FACEBOOK_PAGE_ID as string;

const iconMap = [FaYoutube, FaFacebook, FaInstagram, FaLinkedin] as const;
const colorMap = ["#FF0000", "#1877F2", "#E4405F", "#0A66C2"] as const;
const nameMap = ["YouTube", "Facebook", "Instagram", "LinkedIn"] as const;
const urlMap = [
  `https://youtube.com/channel/${youtubeId}`,
  `https://facebook.com/${facebookPageId}`,
  `https://instagram.com/wasakabeofficial`,
  "https://linkedin.com/company/wasakabeofficial",
] as const;

export default function Canal() {
  const { t } = useI18n();
  const canal = t.canal;

  return (
    <section id="canal" className="canal">
      <div className="canal-layout">
        <div className="canal-header">
          <span className="canal-eyebrow">{canal.eyebrow}</span>
          <h2 className="canal-title">
            {canal.titleStart} <span className="canal-title-gold">{canal.titleGold}</span>
          </h2>
          <p className="canal-sub">{canal.sub}</p>
        </div>

        <div className="canal-grid">
          {canal.channels.map((ch, i) => {
            const Icon = iconMap[i];
            const color = colorMap[i];
            const name = nameMap[i];
            const url = urlMap[i];
            return (
              <article key={name} className="canal-card">
                <div className="canal-card-top">
                  <Icon
                    className="canal-card-icon"
                    style={{ color }}
                    aria-hidden="true"
                  />
                  <span className="canal-card-name">{name}</span>
                </div>

                <span className="canal-card-handle">{ch.handle}</span>

                <p className="canal-card-desc">{ch.description}</p>

                <div className="canal-card-stats">
                  {ch.stats.map((stat) => (
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
                  {ch.label} →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
