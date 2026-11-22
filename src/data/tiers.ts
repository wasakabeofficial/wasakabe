import type { Tier } from '../types'

/*
 * Describen A QUIÉN PUEDE SERVIR WASAKABE, no a quién ha servido.
 * No añadir marcas reales ni afirmaciones sobre trabajos pasados.
 */
export const TIERS: readonly Tier[] = [
  {
    id: 'corner',
    badge: 'TIER 01 / 05',
    title: 'Corner business',
    tags: ['Bakery', 'Hardware store', 'Clothing store', 'Salon'],
    build:
      'A simple site that sells, an AI assistant that answers customers and books appointments, and an inventory that stays in order.',
  },
  {
    id: 'small',
    badge: 'TIER 02 / 05',
    title: 'Small business',
    tags: ['Restaurant', 'Event venue', 'Clinic', 'Workshop'],
    build: 'Online booking and quotes, customer records, and automatic reminders.',
  },
  {
    id: 'growing',
    badge: 'TIER 03 / 05',
    title: 'Growing company',
    tags: ['Call center', 'Logistics', 'School', 'Agency'],
    build:
      'A CRM shaped around your process, live dashboards, and AI assistants for repetitive work.',
  },
  {
    id: 'large',
    badge: 'TIER 04 / 05',
    title: 'Large organization',
    tags: ['Retail chain', 'Manufacturer', 'Hospital group'],
    build: 'ERP and CRM integration with AI, monitored infrastructure, and network analysis.',
  },
  {
    id: 'global',
    badge: 'TIER 05 / 05',
    title: 'Global enterprise',
    tags: ['Multinational manufacturer', 'Financial group', 'Telecom operator'],
    build: 'AI agents at scale, ERP and CRM integration, and monitoring across many sites.',
  },
]
