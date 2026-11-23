import Reveal from '../../components/motion/Reveal'
import ScrollQuote from '../../components/motion/ScrollQuote'
import SectionTransition from '../../components/motion/SectionTransition'
import Accent from '../../components/ui/Accent'
import Eyebrow from '../../components/ui/Eyebrow'
import ImageSlot from '../../components/ui/ImageSlot'

const PRINCIPLES = [
  { term: 'Our mission', text: 'Turn complex technical problems into systems people can rely on.' },
  { term: 'Our vision', text: 'A company known for work that holds up over time.' },
  { term: 'Our approach', text: 'Clear scope, honest estimates, and code the next person can understand.' },
]

export default function About() {
  return (
    <SectionTransition
      id="about"
      from="var(--color-deep)"
      tone="var(--color-lightpurple)"
      className="bg-lightpurple text-deep"
      innerClassName="px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <Eyebrow tone="dark" className="mb-6">
                02 — ABOUT
              </Eyebrow>
              <h2 className="mb-8 font-serif text-4xl font-normal leading-[1.08] text-deep sm:text-5xl md:text-6xl">
                Engineering with <Accent tone="dark">discipline</Accent>, built to last.
              </h2>
            </Reveal>

            <ScrollQuote
              text="“We would rather build one thing that holds up than ten that almost do.”"
              className="my-6 border-l-2 border-ultraviolet pl-6 font-serif text-2xl italic leading-snug text-deep/90 md:text-3xl"
            />

            <Reveal delay={120}>
              <figure className="mt-8 overflow-hidden border border-deep/20 bg-deep/5 shadow-md">
                <div className="h-72 md:h-96">
                  <ImageSlot name="architecture" alt="Architectural concrete facade" />
                </div>
                <figcaption className="flex justify-between border-t border-deep/15 bg-lightpurple/60 p-3 text-[10px] font-medium uppercase tracking-[0.2em] text-deep/80">
                  <span>Architecture</span>
                  <span>WASAKABE</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={150} className="flex flex-col pt-2 lg:col-span-5 lg:pt-14">
            <p className="mb-10 font-sans text-base leading-relaxed text-deep/85">
              WASAKABE is a technology company focused on software architecture, artificial intelligence systems, and
              creative digital production.
            </p>
            <dl className="hairline-dark-t flex flex-col">
              {PRINCIPLES.map((principle) => (
                <div key={principle.term} className="hairline-dark-b py-6">
                  <dt className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-ultraviolet">
                    {principle.term}
                  </dt>
                  <dd className="m-0 text-sm leading-relaxed text-deep md:text-base">{principle.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  )
}
