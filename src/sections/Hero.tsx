import { useEffect, useState } from 'react';
import { MdSecurity, MdArrowForward, MdLockOpen, MdTerminal } from 'react-icons/md';
import type { IconType } from 'react-icons';
import { heroContent } from '../data/hero';
import { chica } from '../assets';
import styles from './Hero.module.css';

const iconMap: Record<string, IconType> = {
  lock_open: MdLockOpen,
  terminal: MdTerminal,
};

export default function Hero() {
  const {
    badge,
    title,
    description,
    descriptionMobile,
    buttons,
    buttonsMobile,
    metrics,
    metricsMobile,
    imageAlt,
    badges,
  } = heroContent;

  /* Desktop: float jitter */
  const [latency, setLatency] = useState(metrics[0].value);

  useEffect(() => {
    const interval = setInterval(() => {
      const base = 0.0004;
      const jitter = Math.random() * 0.00005 - 0.000025;
      setLatency((base + jitter).toFixed(4) + ' MS');
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  /* Mobile: integer ms */
  const [latencyMs, setLatencyMs] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayMetrics = metrics.map((m, i) =>
    i === 0 ? { ...m, value: latency } : m,
  );

  return (
    <section className={styles.hero}>
      {/* ---- Shared backgrounds ---- */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scanline} aria-hidden="true" />

      {/* ---- Mobile: image as background ---- */}
      <div className={styles.mobileImageBg}>
        <img
          alt={imageAlt}
          src={chica}
          className={styles.mobileImage}
          loading="eager"
        />
        <div className={styles.crimsonOverlay} aria-hidden="true" />
      </div>

      <div className={styles.container}>
        {/* ---- Desktop: right image ---- */}
        <div className={styles.imageArea}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} aria-hidden="true" />
            <img
              alt={imageAlt}
              src={chica}
              className={styles.image}
              loading="eager"
            />
            <div className={styles.floatingBadges} aria-hidden="true">
              {badges.map((b) => (
                <div key={b.label} className={styles.floatingBadge}>
                  {b.label}: {b.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Content ---- */}
        <div className={styles.content}>
          {/* Status pulse – mobile only */}
          <div className={styles.statusRow}>
            <span className={styles.statusDot} />
          </div>

          {/* Protocol badge */}
          <div className={styles.badge}>
            <MdSecurity className={styles.badgeIcon} aria-hidden="true" />
            <span className={styles.badgeText}>{badge.text}</span>
          </div>

          {/* Title – desktop variant */}
          <h1 className={styles.titleDesktop}>
            {title.prefix} {title.separator}
            <br />
            <span className={styles.titleHighlight}>{title.highlight}</span>
          </h1>

          {/* Title – mobile variant */}
          <h1 className={styles.titleMobile}>
            HYBRID{' '}
            <span className={styles.highlightMobile}>INTELLIGENCE</span>
            {' & CREATIVE PRODUCTION'}
          </h1>

          {/* Descriptions */}
          <p className={styles.desc}>{description}</p>
          <p className={styles.descMobile}>{descriptionMobile}</p>

          {/* ---- Desktop buttons ---- */}
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

          {/* ---- Mobile buttons ---- */}
          <div className={styles.buttonsMobile}>
            {buttonsMobile.map((btn) => {
              const Icon = btn.icon ? iconMap[btn.icon] : null;
              return (
                <button
                  key={btn.label}
                  type="button"
                  className={`${styles.buttonMb} ${btn.primary ? styles.btnPrimaryMb : styles.btnOutlineMb}`}
                >
                  {Icon && <Icon className={styles.btnIconMb} />}
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* ---- Desktop metrics ---- */}
          <div className={styles.metrics}>
            {displayMetrics.map((metric) => (
              <div key={metric.label} className={styles.metricItem}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={styles.metricValue}>{metric.value}</span>
              </div>
            ))}
          </div>

          {/* ---- Mobile metrics ---- */}
          <div className={styles.metricsMobile}>
            {metricsMobile.map((m, i) => (
              <div
                key={m.label}
                className={styles.metricItemMb}
                data-border={i === 1 || undefined}
              >
                <span className={styles.metricLabelMb}>{m.label}</span>
                <span className={styles.metricValueMb}>
                  {m.label === 'LATENCY' ? `0${latencyMs}ms` : m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Mobile footer ---- */}
      <footer className={styles.footer}>
        <div className={styles.footerInner} />
      </footer>
    </section>
  );
}
