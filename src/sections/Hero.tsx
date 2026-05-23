import { useEffect, useState } from "react";
import {
  MdSecurity,
  MdArrowForward,
  MdLockOpen,
  MdTerminal,
} from "react-icons/md";
import { heroContent } from "../data/hero";
import { chica } from "../assets";
import "./Hero.css";

export default function Hero() {
  const { description, metrics, imageAlt, badges } = heroContent;
  const [latency, setLatency] = useState(metrics[0].value);
  const [latencyMs, setLatencyMs] = useState(2);

  useEffect(() => {
    const latencyTimer = setInterval(() => {
      const base = 0.0004;
      const jitter = Math.random() * 0.00005 - 0.000025;
      setLatency((base + jitter).toFixed(4) + " MS");
    }, 1500);
    const latencyMsTimer = setInterval(() => {
      setLatencyMs(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => {
      clearInterval(latencyTimer);
      clearInterval(latencyMsTimer);
    };
  }, []);

  const displayMetrics = metrics.map((metric, index) =>
    index === 0 ? { ...metric, value: latency } : metric,
  );

  return (
    <section className="Hero">
      <div className="HeroGrid" aria-hidden="true" />
      <div className="HeroVignette" aria-hidden="true" />
      <div className="HeroScanline" aria-hidden="true" />

      <div className="HeroLayout">
        <div className="HeroContent">
          <div className="HeroPulse">
            <span className="HeroPulseDot" />
          </div>

          <div className="HeroBadge">
            <MdSecurity className="HeroBadgeIcon" aria-hidden="true" />
            <span className="HeroBadgeText">CRIMSON PROTOCOL ACTIVE</span>
          </div>

          <h1 className="HeroTitle">
            HYBRID <span className="HeroHighlightAlt">INTELLIGENCE</span>
            {" & "}
            <span className="HeroHighlight">CREATIVE PRODUCTION</span>
          </h1>

          <p className="HeroDescription">{description}</p>

          <div className="HeroButtons">
            <button className="HeroButton HeroButtonPrimary">
              <MdLockOpen className="HeroButtonIconAlt" aria-hidden="true" />
              Authenticate Access
              <MdArrowForward className="HeroButtonIcon" aria-hidden="true" />
            </button>
            <button className="HeroButton HeroButtonSecondary">
              <MdTerminal className="HeroButtonIconAlt" aria-hidden="true" />
              View Protocols
            </button>
          </div>

          <div className="HeroMetrics">
            <div className="HeroMetric">
              <span className="HeroMetricLabel">
                <span className="HeroDesktop">NETWORK </span>LATENCY
              </span>
              <span className="HeroMetricValue">
                <span className="HeroDesktop">{displayMetrics[0].value}</span>
                <span className="HeroMobile">0{latencyMs}ms</span>
              </span>
            </div>
            <div className="HeroMetric">
              <span className="HeroMetricLabel">
                UPTIME<span className="HeroDesktop"> RECORD</span>
              </span>
              <span className="HeroMetricValue">
                <span className="HeroDesktop">99.999%</span>
                <span className="HeroMobile">99.9%</span>
              </span>
            </div>
            <div className="HeroMetric">
              <span className="HeroMetricLabel">
                <span className="HeroDesktop">ACTIVE </span>NODES
              </span>
              <span className="HeroMetricValue">
                <span className="HeroDesktop">14,204</span>
                <span className="HeroMobile">1,402</span>
              </span>
            </div>
          </div>
        </div>
        <div className="HeroImageWrap">
          <div className="HeroImageGlow" aria-hidden="true" />
          <img
            alt={imageAlt}
            src={chica}
            className="HeroImage"
            loading="eager"
          />
          <div className="HeroImageOverlay" aria-hidden="true" />
          <div className="HeroBadges" aria-hidden="true">
            {badges.map((badge) => (
              <div key={badge.label} className="HeroBadgeFloat">
                {badge.label}: {badge.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="HeroFooter">
        <div className="HeroFooterInner" />
      </footer>
    </section>
  );
}
