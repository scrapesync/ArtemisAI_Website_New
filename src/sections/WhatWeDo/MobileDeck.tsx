import { useCallback, useRef, useState } from 'react'
import { useCountUp } from '../../lib/useCountUp'
import { DAYS, SCORE_TRACKS, TABS } from './content'
import s from './MobileDeck.module.css'

/** The mobile heatmap is 7 × 3 with a brighter winner than the desktop 7 × 4. */
const HEATMAP_M: number[][] = [
  [0.1, 0.14, 0.1, 0.13, 0.18, 0.22, 0.16],
  [0.16, 0.26, 0.18, 0.16, 0.28, 0.34, 0.24],
  [0.12, 0.84, 0.2, 0.14, 0.22, 0.3, 0.18],
]

const MINI_AREA = 'M0,56 L52,54 L104,50 L156,38 L208,18 L260,4 L260,62 L0,62Z'
const MINI_LINE = 'M0,56 L52,54 L104,50 L156,38 L208,18 L260,4'

interface MobileDeckProps {
  className?: string
  seen: boolean
}

export function MobileDeck({ className, seen }: MobileDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null)
  const [card, setCard] = useState(0)

  // Which card is live is derived from scroll position rather than stored twice.
  const onScroll = useCallback(() => {
    const deck = deckRef.current
    if (!deck) return
    const step = deck.scrollWidth / 3
    setCard(Math.max(0, Math.min(2, Math.round(deck.scrollLeft / step))))
  }, [])

  const goTo = useCallback((n: number) => {
    const deck = deckRef.current
    if (!deck) return
    deck.scrollTo({ left: (deck.scrollWidth / 3) * n, behavior: 'smooth' })
  }, [])

  const comments = useCountUp(142, 1400, seen && card === 0)
  const minutes = useCountUp(20, 1100, seen && card === 0)

  const live = (n: number) => (seen && card === n ? s.on : '')

  return (
    <div className={`${s.deckWrap} ${className ?? ''}`}>
      <h2
        className={s.title}
        data-reveal={seen ? 'in' : undefined}
        style={{ transitionDelay: '0.05s' }}
      >
        What to reply. When to post. Whether <em>it&rsquo;ll land.</em>
      </h2>
      <p
        className={s.sub}
        data-reveal={seen ? 'in' : undefined}
        style={{ transitionDelay: '0.28s' }}
      >
        Artemis works all three out every minute. You only ever see the answers.
      </p>

      <div
        className={s.deck}
        ref={deckRef}
        onScroll={onScroll}
        data-reveal={seen ? 'in' : undefined}
        style={{ transitionDelay: '0.45s' }}
      >
        {/* 01 — Catch the storm */}
        <article className={`${s.card} ${live(0)}`}>
          <span className={s.cardIndex}>{TABS[0].index}</span>
          <h3 className={s.cardTitle}>{TABS[0].title}</h3>
          <p className={s.cardSentence}>
            Comments spike, Artemis catches it inside twenty minutes and drafts a calm reply in
            your voice.
          </p>

          <div className={s.labelRow}>
            <span className={s.label}>
              Storm caught &nbsp;·&nbsp; <em>6:41pm</em>
            </span>
            <span className={s.live}>
              <i />
              Live
            </span>
          </div>

          <div className={s.stats}>
            <div>
              <div className={s.number} data-numeric>
                <span ref={comments}>142</span>
              </div>
              <div className={s.caption}>comments</div>
            </div>
            <div>
              <div className={s.number} data-numeric>
                <span ref={minutes}>20</span>
                <span className={s.unit}>min</span>
              </div>
              <div className={s.caption}>to caught</div>
            </div>
          </div>

          <svg
            className={s.miniChart}
            viewBox="0 0 260 62"
            height="62"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path d={MINI_AREA} fill="url(#miniFill)" />
            <path
              className={s.spark}
              d={MINI_LINE}
              stroke="var(--wwd-graphic, var(--mint))"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="miniFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--wwd-graphic, #3BB98F)" stopOpacity="0.22" />
                <stop offset="1" stopColor="var(--wwd-graphic, #3BB98F)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className={s.replyBlock}>
            <span className={s.label}>Reply drafted, in your voice</span>
            <p className={s.replyText}>
              Thanks all, we&rsquo;re open till 8pm from Monday. Same kitchen, longer evenings.
            </p>
          </div>

          <div className={s.cardFoot}>
            <span className={s.send}>Send</span>
            <span className={s.note}>Nothing sent until you press it.</span>
          </div>
        </article>

        {/* 02 — Find the window */}
        <article className={`${s.card} ${live(1)}`}>
          <span className={s.cardIndex}>{TABS[1].index}</span>
          <h3 className={s.cardTitle}>{TABS[1].title}</h3>
          <p className={s.cardSentence}>{TABS[1].sentence}</p>

          <span className={s.label}>Read off your own history</span>

          <div className={s.heatGrid} aria-hidden="true">
            {HEATMAP_M.flatMap((row, r) =>
              row.map((alpha, c) => (
                <span
                  key={`${r}-${c}`}
                  className={s.heatCell}
                  style={{
                    background: `rgba(var(--wwd-heat-rgb, 59, 185, 143), ${alpha})`,
                    animationDelay: `${0.1 + r * 0.12}s`,
                    ...(alpha > 0.5
                      ? { boxShadow: '0 0 0 1px var(--wwd-graphic, var(--mint))' }
                      : null),
                  }}
                />
              )),
            )}
          </div>

          <div className={s.dayAxis} aria-hidden="true" data-decorative="chart-axis">
            {DAYS.map((d, i) => (
              <span key={i} className={i === 1 ? s.hot : undefined}>
                {d}
              </span>
            ))}
          </div>

          <div className={s.windowTime}>Tonight, 7:40pm</div>
          <p className={s.windowLift}>3.1&times; the reach of your usual 2pm</p>
          <p className={s.windowNote}>
            Not an industry average. Your own posts, and when your people turned up for them.
          </p>
        </article>

        {/* 03 — Score the draft */}
        <article className={`${s.card} ${live(2)}`}>
          <span className={s.cardIndex}>{TABS[2].index}</span>
          <h3 className={s.cardTitle}>{TABS[2].title}</h3>
          <p className={s.cardSentence}>
            Every draft gets a score before it goes out, and the one change that lifts it.
          </p>

          <div className={s.score} data-numeric>
            78
          </div>
          <div className={s.outOf}>OUT OF 100</div>

          <div className={s.tracks}>
            {SCORE_TRACKS.map(({ label, value, dim }) => (
              <div key={label}>
                <div className={s.trackHead}>
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
                <span className={s.bar}>
                  <i style={{ width: `${value}%`, opacity: dim ? 0.55 : 1 }} />
                </span>
              </div>
            ))}
          </div>

          <div className={s.draftBlock}>
            <span className={s.label}>The draft</span>
            <p className={s.draftText}>
              Spring hours are back. Open till 8pm from Monday, same kitchen and longer
              evenings.
            </p>
          </div>

          <p className={s.verdict}>
            Trim two lines and it clears <em>85</em>.
          </p>
        </article>
      </div>

      <div className={s.deckFoot}>
        <div className={s.dots}>
          {[0, 1, 2].map((n) => (
            <button
              key={n}
              className={s.dot}
              aria-label={`Card ${n + 1}`}
              aria-current={card === n}
              onClick={() => goTo(n)}
            />
          ))}
        </div>
        <span className={s.swipe} aria-hidden="true">
          Swipe &rarr;
        </span>
      </div>
    </div>
  )
}
