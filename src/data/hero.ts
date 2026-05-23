export interface Metric {
  label: string;
  value: string;
}

export interface ButtonConfig {
  label: string;
  icon?: string;
  primary: boolean;
}

export interface BadgeConfig {
  label: string;
  value: string;
}

export interface HeroContent {
  /* Desktop */
  badge: { icon: string; text: string };
  title: { prefix: string; separator: string; highlight: string };
  description: string;
  buttons: ButtonConfig[];
  metrics: Metric[];
  imageAlt: string;
  badges: BadgeConfig[];
  /* Mobile */
  descriptionMobile: string;
  buttonsMobile: ButtonConfig[];
  metricsMobile: Metric[];
}

export const heroContent: HeroContent = {
  /* ─── Desktop ─── */
  badge: {
    icon: 'security',
    text: 'CRIMSON PROTOCOL ACTIVE',
  },
  title: {
    prefix: 'HYBRID INTELLIGENCE',
    separator: '&',
    highlight: 'CREATIVE PRODUCTION',
  },
  description:
    'A multi-disciplinary production studio where neural intelligence meets cinematic artistry. Deploying enterprise-grade software and high-end creative assets.',
  buttons: [
    { label: 'AUTHENTICATE ACCESS', primary: true },
    { label: 'VIEW PROTOCOLS', primary: false },
  ],
  metrics: [
    { label: 'NETWORK LATENCY', value: '0.0004 MS' },
    { label: 'UPTIME RECORD', value: '99.999%' },
    { label: 'ACTIVE NODES', value: '14,204' },
  ],
  imageAlt: 'Wasaka Be Neural Operator',
  badges: [
    { label: 'BIO_ID', value: '99x-A' },
    { label: 'AUTH_LEVEL', value: 'OMEGA' },
  ],

  /* ─── Mobile ─── */
  descriptionMobile:
    'Architecting the next generation of digital assets through neural engineering and aggressive visual precision.',
  buttonsMobile: [
    { label: 'Authenticate Access', icon: 'lock_open', primary: true },
    { label: 'View Protocols', icon: 'terminal', primary: false },
  ],
  metricsMobile: [
    { label: 'LATENCY', value: '02ms' },
    { label: 'UPTIME', value: '99.9%' },
    { label: 'NODES', value: '1,402' },
  ],
};
