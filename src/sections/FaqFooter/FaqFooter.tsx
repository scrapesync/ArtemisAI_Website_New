import { Fragment, useId, useState } from 'react'
import { ArtemisMark, CheckIcon } from '../../components/Icons'
import { PlatformMark } from '../../components/PlatformMark'
import { PLATFORM_LABEL } from '../../components/platforms'
import {
  CONTACT_EMAIL,
  CTA_LABEL,
  NETLIFY_FORM,
  PENDING_LINKS,
  SIGNUP_ANCHOR,
  type SocialPlatform,
} from '../../lib/constants'
import { useReveal } from '../../lib/useInView'
import page from '../../styles/page.module.css'
import { FAQ, FOOTER_BLURB, LEGAL } from './content'
import s from './FaqFooter.module.css'

const SOCIALS: SocialPlatform[] = ['facebook', 'instagram', 'tiktok', 'youtube', 'x']

export function FaqFooter() {
  const { ref, seen } = useReveal<HTMLElement>(0.12)

  return (
    <section ref={ref} id="faq" className={`${page.section} ${seen ? s.seen : ''}`}>
      <div className={`${page.frame} ${s.faq}`}>
        <div className={s.column}>
          <div className={s.head}>
            <h2 className={s.title}>
              <Words words={['Fair', 'questions,']} />
              <Words words={['straight', 'answers.']} accent offset={3} />
            </h2>
            <p className={s.lead} data-reveal={seen ? 'in' : undefined} style={{ transitionDelay: '0.3s' }}>
              The things people ask before they connect a page.
            </p>
          </div>

          <div className={s.list} data-reveal={seen ? 'in' : undefined} style={{ transitionDelay: '0.4s' }}>
            <Accordion />
          </div>
        </div>
      </div>

      <div className={s.cta}>
        <div className={s.dots} aria-hidden="true" />
        <div className={s.ctaGlow} aria-hidden="true" />
        <div className={`${page.frame} ${s.ctaInner}`}>
          <h2 className={`${s.title} ${s.ctaTitle}`}>
            <Words words={['Run', 'your', 'page.']} />
            <Words words={["We'll", 'run', 'the', 'numbers.']} accent offset={3} />
          </h2>
          <p className={s.lead} data-reveal={seen ? 'in' : undefined} style={{ transitionDelay: '0.5s' }}>
            Free while the pilot runs. Leave your email and we&apos;ll be in touch when your
            spot opens.
          </p>
          <SignupForm seen={seen} />
        </div>
      </div>

      <div className={page.frame}>
        <Footer />
      </div>
    </section>
  )
}

/**
 * One line of the heading, one word per span, each rising 110ms behind the last.
 *
 * The spaces sit *between* the spans rather than inside them: a trailing space inside an
 * inline-block is collapsed away, which runs every word together.
 */
function Words({
  words,
  accent = false,
  offset = 0,
}: {
  words: string[]
  accent?: boolean
  offset?: number
}) {
  return (
    <span className={`${s.line} ${accent ? s.accent : ''}`}>
      {words.map((word, i) => (
        <Fragment key={word}>
          <span className={s.word} style={{ transitionDelay: `${(offset + i) * 0.11}s` }}>
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}

function Accordion() {
  const [open, setOpen] = useState(0)
  const id = useId()

  return (
    <>
      {FAQ.map(({ q, a }, i) => {
        const isOpen = open === i
        return (
          <div key={q} className={`${s.item} ${isOpen ? s.open : ''}`}>
            <h3>
              <button
                className={s.question}
                id={`${id}-q${i}`}
                // The prototype has neither of these; the handoff asks that the real build add them.
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{q}</span>
                <span className={s.plusMinus} aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div className={s.answer} id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`}>
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The page's single conversion action.
 *
 * Posts to Netlify Forms. Netlify detects forms by parsing the built HTML, which never sees
 * a React-rendered one — the static twin in index.html is what registers `trial-signup`, and
 * these field names must stay in sync with it.
 *
 * Note that this only succeeds on a Netlify deploy. Against the Vite dev server the POST has
 * nowhere to go, and the form reports the failure rather than pretending to have worked.
 */
function SignupForm({ seen }: { seen: boolean }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /* Captured before the first await: React clears currentTarget once the handler returns. */
    const form = e.currentTarget
    const address = email.trim()

    if (!EMAIL.test(address)) {
      setError('That doesn’t look like an email address.')
      return
    }

    setSending(true)
    try {
      /* Built from the form itself rather than from a hand-written object, so every field the
         markup declares is actually submitted. That matters for the honeypot: Netlify only
         sees the fields in the POST body, and a hardcoded value would never carry what a bot
         typed, leaving the trap catching nothing. */
      const body = new URLSearchParams()
      new FormData(form).forEach((value, key) => {
        if (typeof value === 'string') body.append(key, value)
      })
      body.set('form-name', NETLIFY_FORM)
      body.set('email', address)

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!response.ok) throw new Error(String(response.status))
      setSaved(address)
      setEmail('')
    } catch {
      setError('Something went wrong on our end. Try again in a moment.')
    } finally {
      setSending(false)
    }
  }

  if (saved) {
    return (
      <div className={s.done} role="status">
        <span className={s.doneTick}>
          <CheckIcon size={11} />
        </span>
        <span>You&apos;re on the list. We&apos;ll email {saved}.</span>
      </div>
    )
  }

  return (
    <form
      id={SIGNUP_ANCHOR}
      className={s.form}
      name={NETLIFY_FORM}
      method="POST"
      data-netlify="true"
      onSubmit={submit}
      data-reveal={seen ? 'in' : undefined}
      style={{ transitionDelay: '0.65s' }}
      noValidate
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM} />
      <label className={s.honeypot}>
        Leave this field empty
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={s.pill}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          placeholder="you@yourbusiness.co.uk"
          aria-label="Your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${SIGNUP_ANCHOR}-error` : undefined}
          autoComplete="email"
        />
        <button type="submit" className={s.submit} disabled={sending}>
          {sending ? 'Sending…' : CTA_LABEL}
        </button>
      </div>

      {error && (
        <p className={s.error} id={`${SIGNUP_ANCHOR}-error`} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div className={s.brandColumn}>
          <span className={s.lockup}>
            <ArtemisMark size={20} />
            Artemis
          </span>
          <p className={s.blurb}>{FOOTER_BLURB}</p>
          <div className={s.social}>
            {SOCIALS.map((platform) => {
              const href = PENDING_LINKS.social[platform]
              const mark = <PlatformMark platform={platform} color="currentColor" size={platform === 'x' ? 13 : 15} />
              return href ? (
                <a
                  key={platform}
                  className={s.socialLink}
                  href={href}
                  aria-label={PLATFORM_LABEL[platform]}
                  rel="noopener"
                >
                  {mark}
                </a>
              ) : (
                <span
                  key={platform}
                  className={s.socialLink}
                  aria-label={`${PLATFORM_LABEL[platform]}, coming soon`}
                  aria-disabled="true"
                  role="link"
                >
                  {mark}
                </span>
              )
            })}
          </div>
        </div>

        <div className={s.linkColumn}>
          <span className={s.linkHeading}>Company</span>
          <nav className={s.links} aria-label="Company">
            <PendingLink href={PENDING_LINKS.company.about}>About us</PendingLink>
            <a href="#how">How it works</a>
            <PendingLink href={PENDING_LINKS.company.careers}>Careers</PendingLink>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </nav>
        </div>
      </div>

      <div className={s.legal}>
        <span>{LEGAL}</span>
        <div className={s.legalLinks}>
          <PendingLink href={PENDING_LINKS.legal.privacy}>Privacy</PendingLink>
          <PendingLink href={PENDING_LINKS.legal.terms}>Terms</PendingLink>
        </div>
      </div>
    </footer>
  )
}

/** Renders a real link when a destination exists, and an announced placeholder when it does not. */
function PendingLink({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (href) return <a href={href}>{children}</a>
  return (
    <span aria-disabled="true" title="Coming soon">
      {children}
    </span>
  )
}
