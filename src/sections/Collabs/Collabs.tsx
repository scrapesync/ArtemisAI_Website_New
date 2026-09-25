import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '../../components/Icons'
import { useCarousel } from '../../lib/useCarousel'
import { useInView } from '../../lib/useInView'
import page from '../../styles/page.module.css'
import { MATCHES, YOU, type Identity } from './content'
import s from './Collabs.module.css'

const DWELL_MS = 8000

export function Collabs() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const [hovered, setHovered] = useState(false)

  const { index, goTo, next, prev } = useCarousel({
    length: MATCHES.length,
    dwellMs: DWELL_MS,
    active: inView,
    paused: hovered,
    // Unlike Belief, Collabs keeps its place when scrolled away.
    resetOnExit: false,
  })

  const live = (i: number) => inView && index === i

  return (
    <section
      ref={ref}
      id="collabs"
      className={`${page.frame} ${page.section}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className={s.title}>
        <span data-reveal={inView ? 'in' : undefined} style={{ transitionDelay: '0.1s' }}>
          Who to collaborate with.
        </span>
        <span data-reveal={inView ? 'in' : undefined} style={{ transitionDelay: '0.22s' }}>
          And why.
        </span>
      </h2>

      <p
        className={s.sub}
        data-reveal={inView ? 'in' : undefined}
        style={{ transitionDelay: '0.4s' }}
      >
        Businesses, creators and pages worth working with. Who they are, why it makes sense, who
        you&rsquo;d reach, and what you could run together.
      </p>

      <div
        className={s.row}
        data-reveal={inView ? 'in' : undefined}
        style={{ transitionDelay: '0.55s' }}
      >
        <div className={s.cell}>
          <div data-surface="mock" className={`${s.panel} ${s.fixedPanel}`}>
            <Placeholder identity={YOU} />
            <div className={s.scrim} />
            <Tag identity={YOU} />
          </div>
        </div>

        <div className={s.cell}>
          {MATCHES.map(({ identity }, i) => (
            <div
              key={identity.name}
              data-surface="mock"
              className={`${s.panel} ${live(i) ? s.on : ''}`}
              inert={!live(i)}
            >
              <Placeholder identity={identity} />
              <div className={s.scrim} />
              <Tag identity={identity} />
            </div>
          ))}
        </div>

        {MATCHES.map(({ identity, reach }, i) => (
          <div
            key={identity.name}
            className={`${s.badge} ${live(i) ? s.on : ''}`}
            aria-hidden={!live(i)}
          >
            {reach}
            <span>new people</span>
          </div>
        ))}
      </div>

      <div
        className={s.captions}
        data-reveal={inView ? 'in' : undefined}
        style={{ transitionDelay: '0.7s' }}
      >
        {MATCHES.map(({ identity, caption }, i) => (
          <div
            key={identity.name}
            className={`${s.caption} ${live(i) ? s.on : ''}`}
            inert={!live(i)}
          >
            <p>
              <i>Why</i>
              <span>{caption.why}</span>
            </p>
            <p>
              <i>Reach</i>
              <span>{caption.reach}</span>
            </p>
            <p>
              <i>Together</i>
              <span>{caption.together}</span>
            </p>
          </div>
        ))}
      </div>

      <div
        className={s.controls}
        data-reveal={inView ? 'in' : undefined}
        style={{ transitionDelay: '0.8s' }}
      >
        <div className={s.dots}>
          {MATCHES.map(({ identity }, i) => (
            <button
              key={identity.name}
              className={s.dot}
              aria-label={`Slide ${i + 1}`}
              aria-current={index === i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className={s.arrows}>
          <button className={s.arrow} onClick={prev} aria-label="Previous">
            <ArrowLeftIcon size={14} />
          </button>
          <button className={s.arrow} onClick={next} aria-label="Next">
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Tag({ identity }: { identity: Identity }) {
  return (
    <div className={s.tag}>
      <span className={s.avatar}>{identity.monogram}</span>
      <span>
        <span className={s.name}>
          {identity.name}
          <i className={s.verified}>
            <CheckIcon size={9} />
          </i>
        </span>
        <span className={s.meta}>{identity.meta}</span>
      </span>
      <span className={s.chip}>{identity.chip}</span>
    </div>
  )
}

/**
 * Stands in for photography that has not been shot yet. The handoff's own images are
 * placeholder stock the brief says must be replaced, and the four Collabs ones were live
 * Pexels URLs rather than files. Replace this with an <img> when real photography lands —
 * the panels need to read as a café, a market, a creator and a florist, because the caption
 * copy depends on it.
 */
function Placeholder({ identity }: { identity: Identity }) {
  return (
    <div className={s.placeholder} style={{ ['--tone' as string]: identity.tone }}>
      <span className={s.placeholderMark}>{identity.monogram}</span>
    </div>
  )
}
