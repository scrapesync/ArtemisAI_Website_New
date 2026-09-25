import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { ArtemisGlyph, ArrowLeftIcon, MenuIcon } from '../../components/Icons'
import { PlatformMark } from '../../components/PlatformMark'
import { PLATFORM_LABEL, type Platform } from '../../components/platforms'
import { useCarousel } from '../../lib/useCarousel'
import { useInView } from '../../lib/useInView'
import page from '../../styles/page.module.css'
import { AnswerScreen, ConnectScreen, WatchScreen } from './screens'
import s from './ConnectOnce.module.css'

const DWELL_MS = 5000

const PLATFORMS: Platform[] = ['meta', 'facebook', 'instagram', 'tiktok', 'youtube', 'x']
/** Three repetitions, so the marquee can loop one repetition's width seamlessly. */
const REPEATS = 3

const STEPS = [
  {
    chip: 'Connect your page',
    title: 'Connect your page',
    line: (
      <>
        Sign in with Facebook. ArtemisAI reads two years of your history to learn <em>your</em>{' '}
        audience.
      </>
    ),
    status: 'Connected · 5 pages',
    Screen: ConnectScreen,
  },
  {
    chip: 'It watches 24/7',
    title: 'It watches 24/7',
    line: (
      <>
        Every post and comment, so it knows what a normal day looks like, and notices when it
        isn&rsquo;t.
      </>
    ),
    status: 'Watching 3 pages',
    Screen: WatchScreen,
  },
  {
    chip: 'You get answers',
    title: 'You get answers',
    line: (
      <>One thing to do today, in plain English, with the numbers behind every claim.</>
    ),
    status: 'Ready when you are',
    Screen: AnswerScreen,
  },
]

export function ConnectOnce() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 })
  const [held, setHeld] = useState(false)

  const { index, goTo } = useCarousel({
    length: STEPS.length,
    dwellMs: DWELL_MS,
    active: inView,
    paused: held,
    resetOnExit: true,
  })

  const { railRef, trackRef, railX } = useChipRail(index)

  return (
    <section
      ref={ref}
      id="connect"
      className={`${page.frame} ${page.section} ${inView ? s.seen : ''} ${held ? s.held : ''}`}
      data-animate={inView ? 'running' : 'paused'}
      style={{ '--dwell-ms': `${DWELL_MS}ms` } as CSSProperties}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <div className={s.grid}>
        <div className={s.copy}>
          <h2 className={s.title} data-reveal={inView ? 'in' : undefined} style={{ transitionDelay: '0.1s' }}>
            Connect once.
            <br />
            It just runs.
          </h2>

          <div
            className={s.platformRow}
            data-reveal={inView ? 'in' : undefined}
            style={{ transitionDelay: '0.15s' }}
          >
            <div className={s.marquee} aria-hidden="true" title={PLATFORMS.map((p) => PLATFORM_LABEL[p]).join(', ')}>
              <div className={s.track}>
                {Array.from({ length: REPEATS }).flatMap((_, r) =>
                  PLATFORMS.map((platform) => (
                    <span key={`${r}-${platform}`} className={s.tile}>
                      <PlatformMark platform={platform} size={platform === 'x' ? 14 : 16} />
                    </span>
                  )),
                )}
              </div>
              {/* Everything routes into one hub. Near-black with a white mark, as the
                  prototype has it — the README calls this hub mint, but the markup does not,
                  and the mint around it comes from the section.

                  The mark is the roundel rather than the prototype's triangle: the roundel is
                  the brand mark (it is the wordmark's glyph and the Art E avatar), and at
                  19px the triangle reads as a warning sign rather than as ArtemisAI. */}
              <span className={s.hub} aria-hidden="true">
                <ArtemisGlyph size={19} />
              </span>
            </div>
            <p className={s.platformNote}>Every platform you post on, already connected.</p>
          </div>

          <div
            className={s.rail}
            ref={railRef}
            data-reveal={inView ? 'in' : undefined}
            style={{ transitionDelay: '0.2s' }}
            role="tablist"
            aria-label="Setup steps"
          >
            <div className={s.railTrack} ref={trackRef} style={{ translate: `${railX}px 0` }}>
              {STEPS.map((step, i) => (
                <button
                  key={step.chip}
                  role="tab"
                  id={`co-tab-${i}`}
                  aria-selected={index === i}
                  aria-controls={`co-step-${i}`}
                  className={`${s.chip} ${index === i ? s.on : ''}`}
                  onClick={() => goTo(i)}
                >
                  <span className={s.sweep} />
                  <i>0{i + 1}</i>
                  <b>{step.chip}</b>
                </button>
              ))}
            </div>
          </div>

          <div
            className={s.stepCopy}
            data-reveal={inView ? 'in' : undefined}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* Keyed on the step, so React remounts it and the entry animation replays. */}
            <div key={index} className={inView ? s.swap : undefined} id={`co-step-${index}`} role="tabpanel" aria-labelledby={`co-tab-${index}`}>
              <h3>{STEPS[index].title}</h3>
              <p>{STEPS[index].line}</p>
            </div>
          </div>
        </div>

        <div className={s.phone} data-reveal={inView ? 'in' : undefined} style={{ transitionDelay: '0.2s' }}>
          <div className={s.tilt}>
            <DeviceFrame variant="connect" chrome scale={0.72}>
              <div className={s.screenSurface}>
                <div className={s.screenGlow} />

                <div className={s.bar}>
                  <span className={s.barIcon}>
                    <ArrowLeftIcon size={16} />
                  </span>
                  <span className={s.who}>
                    <span className={s.avatar}>
                      <ArtemisGlyph size={16} />
                    </span>
                    <span>
                      <b>Art E</b>
                      <small>
                        <i className={s.pulse} />
                        {STEPS[index].status}
                      </small>
                    </span>
                  </span>
                  <span className={s.barIcon}>
                    <MenuIcon size={16} />
                  </span>
                </div>

                {STEPS.map(({ Screen, chip }, i) => (
                  <div
                    key={chip}
                    className={`${s.screen} ${i === index ? s.screenOn : ''} ${i < index ? s.screenUp : ''}`}
                    inert={i !== index}
                  >
                    <Screen />
                  </div>
                ))}
              </div>
            </DeviceFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Slides the chip rail so the live chip sits at its left edge, clamped so the track never
 * scrolls past its own end. Chips are short enough to fit at desktop widths; this only does
 * anything once the rail is narrower than the three chips together.
 */
function useChipRail(index: number) {
  const railRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [railX, setRailX] = useState(0)

  useLayoutEffect(() => {
    const rail = railRef.current
    const track = trackRef.current
    if (!rail || !track) return

    const slide = () => {
      const chip = track.children[index] as HTMLElement | undefined
      if (!chip) return
      const overflow = track.scrollWidth - rail.clientWidth
      const next = overflow <= 1 ? 0 : Math.max(0, Math.min(overflow, chip.offsetLeft - 2))
      setRailX(-next)
    }

    slide()
    const observer = new ResizeObserver(slide)
    observer.observe(rail)
    return () => observer.disconnect()
  }, [index])

  return { railRef, trackRef, railX }
}
