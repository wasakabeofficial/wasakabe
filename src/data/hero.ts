export interface Metric {
  label: string;
  value: string;
}

export interface ButtonConfig {
  label: string;
  primary: boolean;
}

export interface BadgeConfig {
  label: string;
  value: string;
}

export interface HeroContent {
  badge: { icon: string; text: string };
  title: { prefix: string; separator: string; highlight: string };
  description: string;
  buttons: ButtonConfig[];
  metrics: Metric[];
  imageAlt: string;
  badges: BadgeConfig[];
}

export const heroContent: HeroContent = {
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
};
