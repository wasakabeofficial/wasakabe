import {
  MdSecurity,
  MdArrowForward,
  MdLockOpen,
  MdTerminal,
} from "react-icons/md";
import { chica } from "../assets";
import "./Hero.css";

export default function Hero() {
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

          <p className="HeroDescription">
            A multi-disciplinary production studio where neural intelligence
            meets cinematic artistry. Deploying enterprise-grade software and
            high-end creative assets.
          </p>

          <div className="HeroButtons">
            <button className="HeroButton HeroButtonPrimary">
              <MdLockOpen className="HeroButtonIconAlt" aria-hidden="true" />
              AUTHENTICATE ACCESS
              <MdArrowForward className="HeroButtonIcon" aria-hidden="true" />
            </button>
            <button className="HeroButton HeroButtonSecondary">
              <MdTerminal className="HeroButtonIconAlt" aria-hidden="true" />
              VIEW PROTOCOLS
            </button>
          </div>
        </div>

        <div className="HeroImageWrap">
          <div className="HeroImageGlow" aria-hidden="true" />
          <img
            alt="Visual Asset Studio"
            src={chica}
            className="HeroImage "
            loading="eager"
          />
          <div className="HeroImageOverlay" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
