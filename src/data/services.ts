import type { Service } from '../types'

export const SERVICES: readonly Service[] = [
  {
    id: 'software',
    number: '01',
    title: 'Software & quality',
    description:
      'Web back end and front end, mobile and desktop applications, databases, and the QA and testing that keep them working.',
    items: [
      'Web development (back end and front end)',
      'Mobile & desktop applications',
      'Databases, QA & systematic testing',
    ],
    image: 'circuit-macro',
    imageAlt: 'Macro of code on a screen',
  },
  {
    id: 'ai',
    number: '02',
    title: 'AI & automation',
    description:
      'AI agents for customer service and appointment booking, AI inside your ERP or CRM, and n8n workflows that remove repetitive work.',
    items: [
      'AI agents (consulting, appointment scheduling, customer support)',
      'AI implementation in ERP and CRM systems',
      'Workflow automation with n8n',
    ],
    image: 'circuit-macro',
    imageAlt: 'Abstract node and connector workflow',
  },
  {
    id: 'networks',
    number: '03',
    title: 'Networks & monitoring',
    description:
      'Monitoring with Zabbix, scanning with Nmap and traffic analysis with Wireshark, so problems become visible early.',
    items: [
      'Infrastructure monitoring with Zabbix',
      'Network scanning with Nmap',
      'Traffic analysis with Wireshark',
    ],
    image: 'server-corridor',
    imageAlt: 'Server corridor and network monitoring',
  },
  {
    id: 'creative',
    number: '04',
    title: 'Creative production',
    description: 'Video and film production, beats and music production, and simple indie games.',
    items: [
      'Filmmaking & video production',
      'Beats & music production',
      'Simple indie video games',
    ],
    image: 'architecture',
    imageAlt: 'Film and music production',
  },
  {
    id: 'planning',
    number: '05',
    title: 'Planning, mentoring & advisory',
    description:
      'Project methodologies and planning, plus mentoring and advisory for teams and individuals.',
    items: [
      'Project methodologies and planning',
      'Mentoring for engineering teams and individuals',
      'Strategic technology advisory',
    ],
    image: 'architecture',
    imageAlt: 'Planning timeline',
  },
]
