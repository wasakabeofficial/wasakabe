import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useCanalContent } from "../../hooks/useCanalContent";
import "./Canal.css";

const iconByPlatform: Record<string, typeof FaYoutube> = {
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const nameByPlatform: Record<string, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

export default function Canal() {
  const { data: canal, loading } = useCanalContent();

  if (loading || !canal) return null;

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

        <div className="canal-grid">
          {canal.channels.map((channel) => {
            const Icon = iconByPlatform[channel.platform];
            const name = nameByPlatform[channel.platform] ?? channel.platform;
            return (
              <article key={channel.platform} className="canal-card">
                <div className="canal-card-top">
                  <Icon
                    className="canal-card-icon"
                    style={{ color: channel.colorHex ?? undefined }}
                    aria-hidden="true"
                  />
                  <span className="canal-card-name">{name}</span>
                </div>

                <span className="canal-card-handle">{channel.handle}</span>

                <p className="canal-card-desc">{channel.description}</p>

                <div className="canal-card-stats">
                  {channel.stats.map((stat) => (
                    <span key={stat} className="canal-card-stat">
                      {stat}
                    </span>
                  ))}
                </div>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="canal-card-btn"
                >
                  {channel.label} →
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
