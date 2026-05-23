export interface ButtonConfig {
  label: string;
  icon: string | null;
  primary: boolean;
}

export interface Metric {
  label: string;
  value: string;
}

export interface BadgeConfig {
  label: string;
  value: string;
}

export interface HeroContent {
  title: {
    prefix: string;
    highlight: string;
    separator: string;
    highlightDesktop: string;
  };
  descriptions: {
    mobile: string;
    desktop: string;
  };
  buttons: {
    mobile: ButtonConfig[];
    desktop: ButtonConfig[];
  };
  metrics: {
    mobile: Metric[];
    desktop: Metric[];
  };
  imageAlt: string;
  badges: BadgeConfig[];
}

export const heroContent: HeroContent = {
  title: {
    prefix: 'HYBRID',
    highlight: 'INTELLIGENCE',
    separator: '&',
    highlightDesktop: 'CREATIVE PRODUCTION',
  },
  descriptions: {
    mobile:
      'Architecting the next generation of digital assets through neural engineering and aggressive visual precision.',
    desktop:
      'A multi-disciplinary production studio where neural intelligence meets cinematic artistry. Deploying enterprise-grade software and high-end creative assets.',
  },
  buttons: {
    mobile: [
      { label: 'Authenticate Access', icon: 'lock_open', primary: true },
      { label: 'View Protocols', icon: 'terminal', primary: false },
    ],
    desktop: [
      { label: 'AUTHENTICATE ACCESS', icon: 'arrow_forward', primary: true },
      { label: 'VIEW PROTOCOLS', icon: null, primary: false },
    ],
  },
  metrics: {
    mobile: [
      { label: 'LATENCY', value: '02ms' },
      { label: 'UPTIME', value: '99.9%' },
      { label: 'NODES', value: '1,402' },
    ],
    desktop: [
      { label: 'NETWORK LATENCY', value: '0.0004 MS' },
      { label: 'UPTIME RECORD', value: '99.999%' },
      { label: 'ACTIVE NODES', value: '14,204' },
    ],
  },
  imageAlt: 'Wasaka Be Neural Operator',
  badges: [
    { label: 'BIO_ID', value: '99x-A' },
    { label: 'AUTH_LEVEL', value: 'OMEGA' },
  ],
};
