import { useState, type FormEvent } from 'react'
import { MdArrowForward, MdAutorenew, MdCheck } from 'react-icons/md'
import { CHANNELS } from '../../data/channels'
import { SERVICES } from '../../data/services'
import { useToast } from '../../hooks/useToast'
import { sendInquiry } from '../../lib/inquiry'
import { playTick } from '../../lib/sound'
import type { InquiryData } from '../../types'
import Reveal from '../../components/motion/Reveal'
import SectionTransition from '../../components/motion/SectionTransition'
import Accent from '../../components/ui/Accent'
import Button from '../../components/ui/Button'
import Eyebrow from '../../components/ui/Eyebrow'
import FormField from '../../components/ui/FormField'
import ImageSlot from '../../components/ui/ImageSlot'
import './Contact.css'

type Status = 'idle' | 'sending' | 'done'

const SUBJECTS = [...SERVICES.map((service) => service.title), 'Other']
const EMPTY: InquiryData = { name: '', email: '', subject: SUBJECTS[0], message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const labelClass = 'text-xs font-semibold uppercase tracking-[0.22em] text-lavender'

export default function Contact() {
  const toast = useToast()
  const [values, setValues] = useState<InquiryData>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [delivered, setDelivered] = useState(false)
  const [shaking, setShaking] = useState(false)

  const update = (key: keyof InquiryData) => (value: string) => setValues((current) => ({ ...current, [key]: value }))

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return

    const valid = values.name.trim() && EMAIL_PATTERN.test(values.email) && values.message.trim()

    if (!valid) {
      setShaking(true)
      playTick(250, 'sawtooth', 0.1)
      window.setTimeout(() => setShaking(false), 600)
      return
    }

    setStatus('sending')
    playTick(700, 'sine', 0.05)

    const result = await sendInquiry(values)

    setDelivered(result.delivered)
    setStatus('done')
    toast.push(result.delivered ? 'Inquiry sent' : 'Demo only: the form is not connected yet')
    playTick(1200, 'sine', 0.08)
    setValues(EMPTY)
    window.setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <SectionTransition
      id="contact"
      from="var(--color-ultraviolet)"
      className="overflow-hidden bg-deep text-white"
      innerClassName="px-6 py-28 md:px-12 md:py-36 lg:px-20"
      exit={false}
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col lg:col-span-7">
            <Eyebrow className="mb-4">06 — CONTACT</Eyebrow>
            <h2 className="mb-8 font-serif text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl">
              Let's talk about your <Accent>next</Accent> system.
            </h2>

            <form onSubmit={handleSubmit} noValidate className={`mt-2 flex flex-col gap-8 ${shaking ? 'shake-error' : ''}`}>
              <FormField id="contact-name" label="Your full name" value={values.name} onChange={update('name')} required />
              <FormField
                id="contact-email"
                type="email"
                label="Corporate email address"
                value={values.email}
                onChange={update('email')}
                required
              />
              <FormField
                kind="select"
                id="contact-subject"
                label="Subject / engagement area"
                options={SUBJECTS}
                value={values.subject}
                onChange={update('subject')}
              />
              <FormField
                kind="textarea"
                id="contact-message"
                label="Brief requirements & scope"
                value={values.message}
                onChange={update('message')}
                required
              />

              <div className="pt-4">
                <Button type="submit" disabled={status === 'sending'} className="h-12 min-w-[190px] gap-3">
                  {status === 'idle' && (
                    <>
                      <span>Send inquiry</span>
                      <MdArrowForward size={16} aria-hidden="true" />
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <span>Sending</span>
                      <MdAutorenew size={16} className="animate-spin" aria-hidden="true" />
                    </>
                  )}
                  {status === 'done' && (
                    <>
                      <span>{delivered ? 'Inquiry sent' : 'Demo complete'}</span>
                      <MdCheck size={16} aria-hidden="true" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={150} className="flex flex-col pt-4 lg:col-span-5 lg:pt-14">
            <div className="flex flex-col gap-4 border-b border-lightpurple/20 pb-8">
              <span className={labelClass}>Direct routing</span>
              <div className="font-serif text-2xl text-white md:text-3xl">[corporate email]</div>
              <p className="text-sm leading-relaxed text-lightpurple/80">
                Tell us what you need and we will reply with a clear next step.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-b border-lightpurple/20 py-6">
              <span className={labelClass}>Social channels</span>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-lightpurple">
                {CHANNELS.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      {channel.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 aspect-[4/5] w-full max-w-sm overflow-hidden border border-lightpurple/25 bg-deep">
              <ImageSlot name="server-corridor" alt="Night infrastructure" className="contrast-125 mix-blend-luminosity opacity-85" />
              <div className="pointer-events-none absolute inset-0 bg-ultraviolet/40 mix-blend-multiply" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-widest text-lightpurple/70">
                <span>WASAKABE</span>
                <span>WK</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  )
}
