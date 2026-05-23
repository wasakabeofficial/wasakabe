import { useEffect, useState } from 'react';
import { MdLockOpen, MdTerminal, MdArrowForward } from 'react-icons/md';
import type { IconType } from 'react-icons';
import { heroContent } from '../data/hero';
import { chica } from '../assets';
import styles from './Hero.module.css';

const iconMap: Record<string, IconType> = {
  lock_open: MdLockOpen,
  terminal: MdTerminal,
  arrow_forward: MdArrowForward,
};

export default function Hero() {
  const { title, descriptions, buttons, metrics, imageAlt, badges } = heroContent;
  const [latencyMs, setLatencyMs] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mobileLatency = `0${latencyMs}ms`;

  return (
    <section className={styles.hero}>
      {/* ---- Shared backgrounds ---- */}
      <div className={styles.gridOverlay} aria-hidden="true" />
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

      <div className={styles.inner}>
        {/* ---- Desktop: side image ---- */}
        <div className={styles.desktopImageArea}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow} aria-hidden="true" />
            <img
              alt={imageAlt}
              src={chica}
              className={styles.desktopImage}
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
          {/* Status pulse — mobile only */}
          <div className={styles.statusRow}>
            <span className={styles.statusDot} />
          </div>

          {/* Protocol badge — desktop only */}
          <div className={styles.badge}>
            <MdArrowForward className={styles.badgeIcon} aria-hidden="true" />
            <span className={styles.badgeText}>CRIMSON PROTOCOL ACTIVE</span>
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            {title.prefix}{' '}
            <span className={styles.highlightMobile}>{title.highlight}</span>
            {' '}{title.separator}{' '}
            <span className={styles.highlightDesktop}>{title.highlightDesktop}</span>
          </h1>

          {/* Descriptions */}
          <p className={`${styles.desc} ${styles.descMobile}`}>
            {descriptions.mobile}
          </p>
          <p className={`${styles.desc} ${styles.descDesktop}`}>
            {descriptions.desktop}
          </p>

          {/* ---- Buttons ---- */}
          <div className={styles.buttons}>
            {/* Mobile buttons */}
            <div className={styles.buttonsMobile}>
              {buttons.mobile.map((btn) => {
                const Icon = btn.icon ? iconMap[btn.icon] : null;
                return (
                  <button
                    key={btn.label}
                    type="button"
                    className={`${styles.btn} ${btn.primary ? styles.btnPrimary : styles.btnOutline}`}
                  >
                    {Icon && <Icon className={styles.btnIcon} />}
                    {btn.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop buttons */}
            <div className={styles.buttonsDesktop}>
              {buttons.desktop.map((btn) => {
                const Icon = btn.icon ? iconMap[btn.icon] : null;
                return (
                  <button
                    key={btn.label}
                    type="button"
                    className={`${styles.btn} ${btn.primary ? styles.btnPrimary : styles.btnOutline}`}
                  >
                    {btn.label}
                    {Icon && <Icon className={styles.btnIcon} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- Metrics ---- */}
          <div className={styles.metrics}>
            {/* Mobile metrics */}
            <div className={styles.metricsMobile}>
              {metrics.mobile.map((m, i) => (
                <div
                  key={m.label}
                  className={styles.metricItem}
                  data-border={i === 1 ? true : undefined}
                >
                  <span className={styles.metricLabel}>{m.label}</span>
                  <span className={styles.metricValue}>
                    {m.label === 'LATENCY' ? mobileLatency : m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop metrics */}
            <div className={styles.metricsDesktop}>
              {metrics.desktop.map((m) => (
                <div key={m.label} className={styles.metricHud}>
                  <span className={styles.metricLabel}>{m.label}</span>
                  <span className={styles.metricValue}>{m.value}</span>
                </div>
              ))}
            </div>
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
