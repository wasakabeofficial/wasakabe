import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useCanalContent } from "../../hooks/useCanalContent";
import CanalCard from "./CanalCard";
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

const accents = ["gold", "crimson", "gold", "crimson"] as const;

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
          {canal.channels.map((channel, index) => (
            <CanalCard
              key={channel.platform}
              name={nameByPlatform[channel.platform] ?? channel.platform}
              icon={iconByPlatform[channel.platform]}
              accent={accents[index]}
              handle={channel.handle}
              description={channel.description}
              stats={channel.stats}
              url={channel.url}
              label={channel.label}
              revealDelayMs={index * 90}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
