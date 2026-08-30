export interface AboutContent {
  photoUrl: string | null;
  brand: string;
  badgesTech: string[];
  badgesCreative: string[];
  eyebrow: string;
  headingStart: string;
  headingGold: string;
  headingEnd: string;
  pullQuote: string;
  text1: string;
  text2: string;
  text3Start: string;
  text3Link: string;
  text3End: string;
}

export interface ServiceCard {
  slug: string;
  position: number;
  iconUrl: string | null;
  title: string;
  description: string;
  ctaLabel: string;
}

export interface ServicesContent {
  eyebrow: string;
  titleStart: string;
  titleGold: string;
  sub: string;
  cards: ServiceCard[];
}

export interface ExperienceEntry {
  slug: string;
  startDate: string;
  endDate: string | null;
  company: string | null;
  location: string | null;
  periodLabel: string;
  role: string;
  highlights: string[];
  tags: string[];
}

export interface ExperienceContent {
  eyebrow: string;
  titleStart: string;
  titleGold: string;
  sub: string;
  entries: ExperienceEntry[];
}

export interface Channel {
  platform: string;
  url: string;
  colorHex: string | null;
  handle: string;
  description: string;
  stats: string[];
  label: string;
}

export interface CanalContent {
  eyebrow: string;
  titleStart: string;
  titleGold: string;
  sub: string;
  channels: Channel[];
}
