import { Fragment, useEffect, useRef } from 'react'
import { DeviceFrame } from '../../components/DeviceFrame'
import { PlatformBadges } from '../../components/PlatformBadges'
import { CONNECT_LABEL, CTA_LABEL } from '../../lib/constants'
import { scrollToSignup } from '../../lib/scrollToSignup'
import { useInView } from '../../lib/useInView'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import page from '../../styles/page.module.css'
import { ChatScreen } from './ChatScreen'
import s from './Hero.module.css'

const HEADLINE = ['Change', 'the', 'way', 'you', 'build', 'on', 'social', 'media.']

/**
 * Tilts the device toward the pointer and lifts it slightly as the page scrolls.
 *
 * Both signals write to one transform on one element, coalesced into a single rAF callback —
 * the prototype wrote directly from the mousemove handler, which the handoff asks us to
 * throttle. `enabled` is false once the hero leaves the viewport, which also stops the
 * per-frame `getBoundingClientRect` for the rest of the page.
 */
function useDeviceParallax(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return
    // A touch device fires pointermove while dragging, which tilts the phone on every swipe.
    // The effect is for a mouse, so ask for a mouse.
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    let mx = 0
    let my = 0
    let frame = 0

    const write = () => {
      frame = 0
      const top = el.getBoundingClientRect().top
      const lift = Math.max(-140, -top * 0.1)
      el.style.transform = `translateY(${lift}px) rotateY(${mx * 7}deg) rotateX(${-my * 5}deg)`
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
      schedule()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    schedule()

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', schedule)
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = ''
    }
  }, [enabled])

  return ref
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const { ref: inViewRef, inView } = useInView<HTMLElement>({ threshold: 0 })
  const parallaxRef = useDeviceParallax(!reducedMotion && inView)

  return (
    <section
      ref={inViewRef}
      className={`${page.frame} ${s.hero}`}
      id="top"
      data-animate={inView ? 'running' : 'paused'}
    >
      <div className={s.copy}>
        <h1 className={s.title}>
          {HEADLINE.map((word, i) => (
            // The space must sit *between* the spans: a trailing space inside an
            // inline-block is collapsed away, which runs every word together.
            <Fragment key={word}>
              <span className={s.word} style={{ animationDelay: `${0.4 + i * 0.06}s` }}>
                {word}
              </span>
              {i < HEADLINE.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>

        <p className={`${s.rise} ${s.lead}`}>
          Artemis watches your pages every minute, so you spend your time on the work instead of
          the feed.
        </p>

        <div className={`${s.rise} ${s.ctas}`}>
          <button className={s.primary} onClick={scrollToSignup}>
            {CTA_LABEL}
          </button>
          <button className={s.secondary} onClick={scrollToSignup}>
            <PlatformBadges size={32} overlap={-9} />
            <span>{CONNECT_LABEL}</span>
          </button>
        </div>
      </div>

      <div className={s.phoneSlot}>
        <div className={s.parallax} ref={parallaxRef}>
          <div className={s.tilt}>
            <DeviceFrame variant="hero" scale={0.72}>
              <ChatScreen />
            </DeviceFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
