import { useState } from 'react';
import ExperienceMobileView from './ExperienceMobileView';
import ExperienceDesktopView from './ExperienceDesktopView';

// ─── Types ───────────────────────────────────────────

export interface SectionTitle {
  breadcrumb: string;
  title: string;
}

interface ExperienceEntry {
  id: string;
  logId: string;
  company: string;
  position: string;
  tenure: string;
  description: string;
  achievements: string[];
  stack: string[];
  metrics?: Array<{ label: string; value: string; suffix?: string }>;
}

// ─── Data ────────────────────────────────────────────

const SECTION_TITLE = {
  breadcrumb: 'Compiling Career Timeline...',
  title: 'PROFESSIONAL_ARCHIVE',
};

const entries: ExperienceEntry[] = [
  {
    id: 'neuropoint',
    logId: 'EXPERIENCE_LOG_01',
    company: 'NEUROPOINT_AI',
    position: 'Full Stack AI Engineer',
    tenure: '2025 — PRESENT',
    description:
      'Architecting and deploying production-ready conversational AI agent ecosystems, intelligent autonomic monitoring systems, and specialized logistics AI frameworks.',
    achievements: [
      'Engineered end-to-end conversational AI agents for automated 24/7 appointment scheduling and voice/text workflows.',
      'Architected an intelligent alerting and autonomous routing engine by integrating AI agents with Zabbix and GNS3.',
      'Orchestrated automated web scraping pipelines and AI-driven engagement agents on LinkedIn for B2B lead acquisition.',
    ],
    stack: ['PYTHON', 'FLASK', 'ZABBIX', 'GNS3', 'AI_AGENTS', 'LINUX'],
    metrics: [
      { label: 'AVAILABILITY', value: '24/7' },
      { label: 'WORKFLOWS', value: 'AUTOMATED' },
    ],
  },
  {
    id: 'like-capital',
    logId: 'EXPERIENCE_LOG_02',
    company: 'LIKE_CAPITAL',
    position: 'Mobile Developer',
    tenure: '2025',
    description:
      'Spearheaded full-lifecycle mobile engineering using React Native, delivering secure payment infrastructure and real-time civic impact modules.',
    achievements: [
      'Served as sole lead from initial architecture to deployment and maintenance on Google Play Store and Apple App Store.',
      'Architected and integrated a secure, PCI-compliant payment infrastructure via Stripe managing complex transaction logic.',
      'Engineered a private networking ecosystem (Connect) and a real-time Citizen Reporting system for urban incidents.',
    ],
    stack: ['React Native', 'Stripe API', 'TypeScript', 'JavaScript', 'Scrum'],
    metrics: [
      { label: 'STORES', value: 'CROSS-PLATFORM' },
      { label: 'COMPLIANCE', value: 'PCI' },
    ],
  },
  {
    id: 'cbta',
    logId: 'EXPERIENCE_LOG_03',
    company: 'CBTA_05',
    position: 'Full Stack Software Engineer',
    tenure: '2023 — 2024',
    description:
      'Designed a cross-platform digital ecosystem utilizing layered and hexagonal architectures for synchronized web, mobile, and wearable systems.',
    achievements: [
      'Engineered a scalable API using Python (Flask) under Hexagonal Architecture to strictly decouple business logic.',
      'Leveraged React.js + Vite (TypeScript) for web and Flutter for mobile and smartwatches, ensuring a synchronized UX.',
      'Developed an advanced conversational AI integration for Amazon Alexa to query academic records in real-time.',
    ],
    stack: ['Python', 'Flask', 'React.js', 'Vite', 'TypeScript', 'Flutter', 'DevOps', 'CI/CD'],
    metrics: [
      { label: 'PLATFORMS', value: '3', suffix: ' ecosystem' },
      { label: 'CONTROL', value: 'AUTOMATED' },
    ],
  },
  {
    id: 'ifresh',
    logId: 'EXPERIENCE_LOG_04',
    company: 'IFRESH',
    position: 'Software Engineer',
    tenure: '2024',
    description:
      'Performed evolutionary maintenance on enterprise systems while leading data migrations and implementing systematic diagnostic QA workflows.',
    achievements: [
      'Maintained and resolved critical bugs on enterprise platforms based on Java (Spring Boot) and PHP (Laravel).',
      'Led the cleaning and migration of legacy data, optimizing databases for special characters and administrative data consistency.',
      'Designed an automated alert system for institutional records and integrated ticketing logic under DSD-Core standards.',
    ],
    stack: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'SQL', 'Data Migration', 'QA Analysis'],
    metrics: [
      { label: 'INTEGRITY', value: 'LEGACY_CLEAN' },
      { label: 'STANDARD', value: 'DSD-CORE' },
    ],
  },
];
// ─── Component ───────────────────────────────────────

export default function Experience () {
  const [selectedId, setSelectedId] = useState(entries[0].id);

  return (
    <>
      <ExperienceMobileView
        SECTION_TITLE={SECTION_TITLE}
        entries={entries}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ExperienceDesktopView
        SECTION_TITLE={SECTION_TITLE}
        entries={entries}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </>
  );
}

export type { ExperienceEntry };
