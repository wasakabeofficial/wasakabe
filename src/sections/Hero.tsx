import { useEffect, useState } from 'react';
import { MdSecurity, MdArrowForward } from 'react-icons/md';
import { heroContent } from '../data/hero';
import { chica } from '../assets';
import styles from './Hero.module.css';

export default function Hero() {
  const { badge, title, description, buttons, metrics, imageAlt, badges } = heroContent;
  const [latency, setLatency] = useState(metrics[0].value);

  useEffect(() => {
    const interval = setInterval(() => {
      const base = 0.0004;
      const jitter = Math.random() * 0.00005 - 0.000025;
      setLatency((base + jitter).toFixed(4) + ' MS');
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const displayMetrics = metrics.map((m, i) =>
    i === 0 ? { ...m, value: latency } : m,
  );

  return (
    <section className={styles.hero}>
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.container}>
        {/* ---- Left: Content ---- */}
        <div className={styles.content}>
          {/* Protocol badge */}
          <div className={styles.badge}>
            <MdSecurity className={styles.badgeIcon} aria-hidden="true" />
            <span className={styles.badgeText}>{badge.text}</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            {title.prefix} {title.separator}
            <br />
            <span className={styles.titleHighlight}>{title.highlight}</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* CTA Buttons */}
          <div className={styles.buttons}>
            {buttons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className={`${styles.button} ${btn.primary ? styles.buttonPrimary : styles.buttonSecondary}`}
              >
                {btn.label}
                {btn.primary && (
                  <MdArrowForward className={styles.buttonIcon} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          {/* HUD Metrics */}
          <div className={styles.metrics}>
            {displayMetrics.map((metric) => (
              <div key={metric.label} className={styles.metricItem}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricValue}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: Visual ---- */}
        <div className={styles.imageArea}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} aria-hidden="true" />
            <img
              alt={imageAlt}
              src={chica}
              className={styles.image}
              loading="eager"
            />
            {/* Floating metadata badges */}
            <div className={styles.floatingBadges} aria-hidden="true">
              {badges.map((b) => (
                <div key={b.label} className={styles.floatingBadge}>
                  {b.label}: {b.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
