import { MdNorthEast } from 'react-icons/md'
import { SERVICES } from '../../data/services'
import Reveal from '../../components/motion/Reveal'
import SectionTransition from '../../components/motion/SectionTransition'
import Accent from '../../components/ui/Accent'
import Accordion from '../../components/ui/Accordion'
import ImageSlot from '../../components/ui/ImageSlot'
import SectionHeading from '../../components/ui/SectionHeading'

export default function Services() {
  return (
    <SectionTransition
      id="services"
      from="var(--color-deep)"
      className="bg-deep"
      innerClassName="px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <Reveal className="mb-16">
          <SectionHeading eyebrow="01 — SERVICES">
            What we <Accent>build</Accent>
          </SectionHeading>
        </Reveal>

        <Reveal delay={120}>
          <Accordion
            items={SERVICES}
            label="Services"
            renderHeader={(service) => (
              <span className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <span className="accordion-shift flex items-start gap-6 md:items-center md:gap-10">
                  <span className="font-serif text-lg text-amethyst md:text-2xl">{service.number}</span>
                  <span className="flex flex-col">
                    <span className="font-serif text-2xl font-normal text-white sm:text-3xl md:text-4xl">
                      {service.title}
                    </span>
                    <span className="mt-1 max-w-xl font-sans text-sm text-lightpurple/80">{service.description}</span>
                  </span>
                </span>
                <span className="flex items-center justify-between gap-6 md:justify-end">
                  <span className="hidden font-mono text-xs uppercase tracking-widest text-lightpurple/60 md:inline">
                    Details
                  </span>
                  <MdNorthEast size={24} className="accordion-arrow text-amethyst" aria-hidden="true" />
                </span>
              </span>
            )}
            renderPanel={(service) => (
              <div className="grid grid-cols-1 items-center gap-6 border-t border-lightpurple/15 pt-6 md:grid-cols-12">
                <div className="relative h-36 overflow-hidden border border-lavender/30 bg-deep md:col-span-4">
                  <ImageSlot
                    name={service.image}
                    alt={service.imageAlt}
                    className="contrast-125 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-ultraviolet/50 mix-blend-multiply" />
                </div>
                <ul className="flex flex-col gap-2 text-xs text-lightpurple/90 md:col-span-8 md:text-sm">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-lavender" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
        </Reveal>
      </div>
    </SectionTransition>
  )
}
