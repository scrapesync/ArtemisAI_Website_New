import { useCallback, useEffect, useRef, useState } from 'react'
import { useCarousel } from '../../lib/useCarousel'
import { useCountUp } from '../../lib/useCountUp'
import { useReveal } from '../../lib/useInView'
import page from '../../styles/page.module.css'
import { MobileDeck } from './MobileDeck'
import { TABS } from './content'
import { ScorePane, StormPane, WindowPane } from './panes'
import s from './WhatWeDo.module.css'

const DWELL_MS = 5000
/** How long a hand-picked tab holds before the idle cycle takes over again. */
const MANUAL_HOLD_MS = 15000

export function WhatWeDo() {
  const { ref, seen } = useReveal<HTMLElement>(0.25)

  // Two sources of truth, deliberately: the idle cycle, and a tab the visitor picked.
  // A manual pick suspends the cycle (its `active` goes false) and wins until it expires.
  const [picked, setPicked] = useState<number | null>(null)
  const [flash, setFlash] = useState(false)
  const auto = useCarousel({ length: 3, dwellMs: DWELL_MS, active: seen && picked === null })
  const active = picked ?? auto.index

  const releaseTimer = useRef(0)
  const flashTimer = useRef(0)

  const pick = useCallback((n: number) => {
    setPicked(n)
    setFlash(true)
    window.clearTimeout(releaseTimer.current)
    window.clearTimeout(flashTimer.current)
    releaseTimer.current = window.setTimeout(() => setPicked(null), MANUAL_HOLD_MS)
    flashTimer.current = window.setTimeout(() => setFlash(false), 1200)
  }, [])

  useEffect(
    () => () => {
      window.clearTimeout(releaseTimer.current)
      window.clearTimeout(flashTimer.current)
    },
    [],
  )

  // The count restarts whenever its pane comes back round, because `active` flips.
  const countActive = seen && active === 0
  const comments = useCountUp(142, 1400, countActive)
  const minutes = useCountUp(20, 1100, countActive)

  const panes = [
    <StormPane key="storm" comments={comments} minutes={minutes} />,
    <WindowPane key="window" />,
    <ScorePane key="score" />,
  ]

  return (
    <section
      ref={ref}
      id="what"
      className={`${page.frame} ${page.section} ${s.section} ${picked !== null ? s.manual : ''}`}
      style={{ '--wwd-dwell': `${DWELL_MS}ms` } as React.CSSProperties}
    >
      <div className={s.desktopOnly}>
        <div className={s.head}>
          <h2>
            {['What to reply.', 'When to post.'].map((line, i) => (
              <span
                key={line}
                data-reveal={seen ? 'in' : undefined}
                style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
              >
                {line}
              </span>
            ))}
            <span data-reveal={seen ? 'in' : undefined} style={{ transitionDelay: '0.34s' }}>
              Whether <em>it&rsquo;ll land.</em>
            </span>
          </h2>

          <p
            className={s.sub}
            data-reveal={seen ? 'in' : undefined}
            style={{ transitionDelay: '0.5s' }}
          >
            Artemis works all three out every minute, for every page you run. You only ever see
            the answers.
          </p>
        </div>

        <div className={s.tabs} role="tablist" aria-label="What Artemis works out">
          {TABS.map((tab, i) => (
            <button
              key={tab.index}
              role="tab"
              id={`wwd-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`wwd-pane-${i}`}
              className={`${s.tab} ${active === i ? s.on : ''}`}
              data-reveal={seen ? 'in' : undefined}
              style={{ transitionDelay: `${0.7 + i * 0.14}s` }}
              onClick={() => pick(i)}
            >
              <span className={s.rail}>
                <i />
              </span>
              <span className={s.tabIndex}>{tab.index}</span>
              <span className={s.tabTitle}>{tab.title}</span>
              <span className={s.tabSentence}>{tab.sentence}</span>
            </button>
          ))}
        </div>

        <div
          className={`${s.panel} ${flash ? s.flash : ''}`}
          data-surface="mock"
          data-reveal={seen ? 'in' : undefined}
          style={{ transitionDelay: '1.1s' }}
        >
          {/* `inert` rather than `hidden`: display:none would kill the cross-fade, but the
              panes still must not be reachable by keyboard while they are off-screen. */}
          {panes.map((pane, i) => (
            <div
              key={i}
              role="tabpanel"
              id={`wwd-pane-${i}`}
              aria-labelledby={`wwd-tab-${i}`}
              inert={active !== i}
              className={`${s.pane} ${i === 0 ? s.paneStorm : ''} ${active === i ? s.on : ''}`}
            >
              {pane}
            </div>
          ))}
        </div>
      </div>

      <MobileDeck className={s.mobileOnly} seen={seen} />

      <p className={s.closer}>
        {[
          { word: 'You', accent: false, delay: 1.3 },
          { word: 'review.', accent: false, delay: 1.42 },
          { word: 'You', accent: true, delay: 1.7 },
          { word: 'decide.', accent: true, delay: 1.82 },
        ].map(({ word, accent, delay }, i) => (
          <span
            key={i}
            className={accent ? s.accent : undefined}
            data-reveal={seen ? 'in' : undefined}
            style={{ transitionDelay: `${delay}s` }}
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}
