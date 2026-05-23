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
    description,
    descriptionMobile,
    buttons,
    buttonsMobile,
    metrics,
    metricsMobile,
    imageAlt,
    badges,
  } = heroContent;

  const [latencyMs, setLatencyMs] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(Math.floor(Math.random() * 5) + 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayMetrics = metrics.map((m, i) =>
    i === 0 ? { ...m, value: `0${latencyMs}ms` } : m,
  );

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

      <div className={styles.container}>
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
            <MdSecurity className={styles.badgeIcon} aria-hidden="true" />
            <span className={styles.badgeText}>{badge.text}</span>
          </div>

          {/* Title — both variants */}
          <h1 className={`${styles.title}`}>
            HYBRID{' '}
            <span className={styles.highlightMobile}>{'INTELLIGENCE'}</span>
            {' & '}
            <span className={styles.highlightDesktop}>{'CREATIVE PRODUCTION'}</span>
          </h1>

          {/* Descriptions */}
          <p className={styles.descMobile}>{descriptionMobile}</p>
          <p className={styles.descDesktop}>{description}</p>

          {/* ---- Mobile buttons ---- */}
          <div className={styles.buttonsMobile}>
            {buttonsMobile.map((btn) => {
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

          {/* ---- Desktop buttons ---- */}
          <div className={styles.buttonsDesktop}>
            {buttons.map((btn) => (
              <button
                key={btn.label}
                type="button"
                className={`${styles.btn} ${btn.primary ? styles.btnPrimaryDt : styles.btnOutlineDt}`}
              >
                {btn.label}
                {btn.primary && (
                  <MdArrowForward className={styles.btnArrowIcon} aria-hidden="true" />
                )}
              </button>
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

          {/* ---- Desktop metrics ---- */}
          <div className={styles.metricsDesktop}>
            {displayMetrics.map((m) => (
              <div key={m.label} className={styles.metricItemDt}>
                <span className={styles.metricLabelDt}>{m.label}</span>
                <span className={styles.metricValueDt}>{m.value}</span>
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
