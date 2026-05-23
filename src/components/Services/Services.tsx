import ServicesMobileView from './ServicesMobileView';
import ServicesDesktopView from './ServicesDesktopView';
import type { ReactNode } from 'react';
interface ServiceCapability {
  text: string;
}

interface ServiceDefinition {
  id: string;
  sectorId: string;
  title: string;
  icon: ReactNode;
  description: string;
  capabilities: ServiceCapability[];
  metadataLeft: string;
  metadataRight: string;
  visualType: 'image' | 'waveform';
  imageUrl: string;
}


const SECTION_TITLE = {
  breadcrumb: 'System Architecture ',
  last: 'SERVICES',
};

const services: ServiceDefinition[] = [
  {
    id: 'software-architecture',
    sectorId: 'SECTOR_ID: 01',
    title: 'SOFTWARE_ARCHITECTURE',
    icon: <MdTerminal className="text-headline-md text-blood-red" />,
    description:
      'Engineering robust digital foundations for the future landscape.',
    capabilities: [
      { text: 'Full-stack development' },
      { text: 'AI/ML integration' },
      { text: 'Scalable system design' },
      { text: 'Technical management' },
    ],
    metadataLeft: 'LOAD_STATUS: 100%',
    metadataRight: 'ENCRYPTION: ACTIVE',
    visualType: 'image',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuClA1G_qpuvx7NFoScrQ-299F7xe9IsKAWZkifo06mx4f1dKpwbstx7CaG63yaq5fXDMJpbdE6HjIWOI540qs6qAvaPBHbp0B3LTSyk1wcsZJuKQT9OxRzCGDr8EyqEqWoCaPA6c86WcRUgJ0riQoXzYkJQwaMEigsLB-GdbopYWOhkg9ImoPiXlrC5uy-5agMHQW2IC0rarfd0dsFkEWS3LnXiUKgmLwvpEPg-mByEoPXrky1S5AiGKZ0Ian6wUZGDILMd8xZ5roXO',
  },
  {
    id: 'cinematic-production',
    sectorId: 'SECTOR_ID: 02',
    title: 'CINEMATIC_PRODUCTION',
    icon: <MdMovie className="text-headline-md text-blood-red" />,
    description:
      'Visual narratives forged in high-fidelity 4K workflows.',
    capabilities: [
      { text: 'High-end video editing' },
      { text: 'Color grading (RAW)' },
      { text: 'Visual storytelling' },
      { text: 'Post-production Mastery' },
    ],
    metadataLeft: 'FRAME_RATE: 23.976',
    metadataRight: 'STATUS: RENDERING',
    visualType: 'image',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHBeWEpJZvC26Ccay0xcuiLMYfpeUhfjfFHOW1cIa1sPZDF_Stq-XpH5-eeYZYmu7Cn9qJcCyKptyoXuTpEQ3zY4SG2CfG1oyGB7EU1OXZWPhFwpbgzuHGhj1NO7bdwSh4GixBYnDulV06giacKgpasmzfrYqGXu_Fom7prgw8KEYPg-JPu9cC1oW_WLMI5TXVmHiiLjZpnwfLuMsznTHAKgOZh0FWG38F740b3UtRKHKC5tbQ0r1k6Jt-xPz8bC8UlFu293GNXShO',
  },
  {
    id: 'sonic-engineering',
    sectorId: 'SECTOR_ID: 03',
    title: 'SONIC_ENGINEERING',
    icon: <MdGraphicEq className="text-headline-md text-blood-red" />,
    description:
      'Hybrid soundscapes synthesized for peak auditory impact.',
    capabilities: [
      { text: 'Professional Beatmaking' },
      { text: 'SFX Design & Synthesis' },
      { text: 'Advanced Audio Mixing' },
      { text: 'Sonic Branding' },
    ],
    metadataLeft: 'SAMPLE_RATE: 96KHZ',
    metadataRight: 'BIT_DEPTH: 32-FLOAT',
    visualType: 'waveform',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDigwkCxku0bmo_7dFS2FmhosZvPANq1Lu88C4nVEZCdKpjbaBLd-owWhXUfp5xGcuJRQEqGxLJh04_c2IkfS36vbldbB54ZlAt15hlT2XU1OAmCAVuMASyCt4H3eucPpe9e7odLUP9v8T2XrhDvI2dtDkUO0ZBYCqa_yKBgAS2RHngRbhxWgKQl0U9f0CbfTYtCk_3oBKehCGnIutBMBfjeU2gwSI56K7ADDi6iw1kuH9FKCuwr8xuuFjJB_7rLcl-vGqz23f6H7Zs',
  },
];

import {
  MdTerminal,
  MdMovie,
  MdGraphicEq,
} from 'react-icons/md';


export default function Services () {
  return (
    <>
      <ServicesMobileView
        SECTION_TITLE={SECTION_TITLE}
        services={services}
      />
      <ServicesDesktopView
        SECTION_TITLE={SECTION_TITLE}
        services={services}
      />
    </>
  );
}

export type { ServiceDefinition, ServiceCapability };
