import { useState, type CSSProperties } from 'react'
import { MdTerminal } from 'react-icons/md'
import { TIERS } from '../../data/tiers'
import { playTick } from '../../lib/sound'
import Reveal from '../../components/motion/Reveal'
import SectionTransition from '../../components/motion/SectionTransition'
import Accent from '../../components/ui/Accent'
import SectionHeading from '../../components/ui/SectionHeading'
import Slider from '../../components/ui/Slider'
import Tag from '../../components/ui/Tag'
import './WhoWeServe.css'

interface Selection {
  tier: number
  label: string
}

export default function WhoWeServe() {
  const [tier, setTier] = useState(0)
  const [selection, setSelection] = useState<Selection | null>(null)

  const current = TIERS[tier]
  const selectedLabel = selection?.tier === tier ? selection.label : null

  const changeTier = (index: number) => {
    setTier(index)
    playTick(500 + index * 120, 'sine', 0.03)
  }

  return (
    <SectionTransition
      id="who-we-serve"
      from="var(--color-lightpurple)"
      tone="var(--color-ultraviolet)"
      className="overflow-x-clip bg-ultraviolet text-white"
      innerClassName="px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="03 — WHO WE SERVE"
            description="Good technology is not only for large companies. We scale the solution to the size of the business, not the other way around."
          >
            From the corner shop to the <Accent>global</Accent> enterprise.
          </SectionHeading>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative mb-10 border border-lavender/25 bg-deep/60 p-6 shadow-2xl md:p-12">
            <div className="flex flex-col gap-8">
              <Slider
                count={TIERS.length}
                value={tier}
                onChange={changeTier}
                label="Business size"
                valueText={current.title}
                startLabel="SCALE 01 // MICRO"
                endLabel="SCALE 05 // ENTERPRISE"
              />

              <div className="grid grid-cols-1 items-start gap-8 border-t border-lightpurple/15 pt-6 lg:grid-cols-12">
                <div className="flex flex-col lg:col-span-6">
                  <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-lavender">
                    <span>{current.badge}</span>
                    <span>·</span>
                    <span>Operational scale</span>
                  </div>

                  <div className="mb-6 overflow-hidden pb-1">
                    <h3
                      key={current.id}
                      aria-live="polite"
                      className="tier-roll min-h-[1.2em] font-serif text-3xl font-normal text-white sm:text-4xl md:text-5xl"
                    >
                      {current.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wider text-lightpurple/70">Example organizations:</span>
                    <ul className="flex flex-wrap gap-2">
                      {current.tags.map((tag, index) => (
                        <li
                          key={`${current.id}-${tag}`}
                          className="tier-tag"
                          style={{ '--i': index } as CSSProperties}
                        >
                          <Tag
                            label={tag}
                            selected={selectedLabel === tag}
                            onSelect={() => setSelection({ tier, label: tag })}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="flex flex-col justify-between border border-lavender/30 bg-ultraviolet/70 p-6 md:p-8">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">
                          What we would typically build
                        </span>
                        <MdTerminal size={18} className="text-lavender" aria-hidden="true" />
                      </div>
                      <p
                        key={current.id}
                        className="tier-fade font-serif text-xl italic leading-relaxed text-white md:text-2xl"
                      >
                        “{current.build}”
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-lightpurple/15 pt-4 text-xs text-lightpurple/70">
                      <span>Illustrative example</span>
                      <span>{current.badge.split(' / ')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="py-4 text-center font-serif text-2xl font-normal italic text-lavender md:text-3xl">
            “Whatever the size, the standard is the same.”
          </p>
        </Reveal>
      </div>
    </SectionTransition>
  )
}
