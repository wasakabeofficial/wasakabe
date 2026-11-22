import { useState } from 'react'
import { MdSwapHoriz } from 'react-icons/md'
import { BLOG_POSTS } from '../../data/blog'
import { playTick } from '../../lib/sound'
import Reveal from '../../components/motion/Reveal'
import SectionTransition from '../../components/motion/SectionTransition'
import TiltCard from '../../components/motion/TiltCard'
import Accent from '../../components/ui/Accent'
import ImageSlot from '../../components/ui/ImageSlot'
import SectionHeading from '../../components/ui/SectionHeading'
import './Blog.css'

export default function Blog() {
  // order[0] es el artículo destacado; al pulsar uno pequeño, intercambia lugar con él.
  const [order, setOrder] = useState(BLOG_POSTS)
  const [featured, ...others] = order

  const swapWithFeatured = (position: number) => {
    setOrder((current) => {
      const next = [...current]
      ;[next[0], next[position]] = [next[position], next[0]]
      return next
    })
    playTick(940, 'triangle', 0.04)
  }

  return (
    <SectionTransition
      id="blog"
      from="var(--color-deep)"
      className="bg-ultraviolet text-white"
      innerClassName="px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <Reveal className="mb-16">
          <SectionHeading eyebrow="05 — BLOG">
            Notes from the <Accent>studio</Accent>
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <TiltCard className="group h-full border border-lavender/25 bg-deep/50 p-6 shadow-xl">
              <article key={featured.id} className="swap-in flex flex-col">
                <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden border border-lightpurple/20 bg-ultraviolet">
                  <ImageSlot
                    name={featured.image}
                    alt={featured.imageAlt}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-deep/20 transition-colors group-hover:bg-transparent" />
                </div>
                <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-widest text-lavender">
                  <span>{featured.tag}</span>
                  <span>·</span>
                  <span>Featured</span>
                </div>
                <h3 className="mb-3 font-serif text-2xl font-normal leading-snug text-white transition-colors group-hover:text-lavender sm:text-3xl md:text-4xl">
                  {featured.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-lightpurple/85 md:text-base">{featured.summary}</p>
              </article>
            </TiltCard>
          </Reveal>

          <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:gap-10">
            {others.map((post, index) => (
              <Reveal key={index} delay={(index + 1) * 120}>
                <TiltCard className="group border border-lavender/20 bg-deep/40 transition-colors hover:border-lavender/60">
                  <button
                    type="button"
                    onClick={() => swapWithFeatured(index + 1)}
                    aria-label={`Make "${post.title}" the featured note`}
                    className="flex w-full flex-col p-5 text-left"
                  >
                    <span key={post.id} className="swap-in flex flex-col">
                      <span className="relative mb-4 block aspect-[16/9] w-full overflow-hidden border border-lightpurple/20 bg-ultraviolet">
                        <ImageSlot
                          name={post.image}
                          alt={post.imageAlt}
                          className="transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-deep/30 transition-colors group-hover:bg-transparent" />
                      </span>
                      <span className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-lavender">
                        <span>{post.tag}</span>
                        <MdSwapHoriz
                          size={16}
                          className="text-lightpurple/60 transition-colors group-hover:text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mb-2 font-serif text-xl leading-snug text-white transition-colors group-hover:text-lavender sm:text-2xl">
                        {post.title}
                      </span>
                      <span className="font-sans text-xs leading-relaxed text-lightpurple/80 sm:text-sm">
                        {post.summary}
                      </span>
                    </span>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionTransition>
  )
}
