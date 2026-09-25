import { useEffect, useRef, useState } from 'react'
import { CheckIcon, SearchIcon } from '../../components/Icons'
import { useInView } from '../../lib/useInView'
import page from '../../styles/page.module.css'
import { CUBE_CELLS, DECK_CHIPS, FLYING_CHIPS, KEYS, MOBILE_QA } from './content'
import s from './HowWeDoIt.module.css'

/**
 * Scales the fixed 1440px diagram canvas to the width available.
 *
 * Unlike the prototype's other two scaled sections, this one is safe to keep: it is a
 * diagram of absolutely-positioned geometry rather than a text layout, and its height is a
 * constant 600px, so the container height is arithmetic rather than measured guesswork.
 */
function useStageScale() {
  const outerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const stage = stageRef.current
    if (!outer || !stage) return

    const fit = () => {
      const scale = Math.min(1, outer.clientWidth / 1440)
      stage.style.transform = `scale(${scale})`
      outer.style.height = `${Math.round(600 * scale)}px`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(outer)
    return () => observer.disconnect()
  }, [])

  return { outerRef, stageRef }
}

export function HowWeDoIt() {
  // Live, not one-shot: `inView` gates the animation loops as well as the reveal, and the
  // reveal itself is latched so content never fades back out once it has appeared.
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const [seen, setSeen] = useState(false)
  if (inView && !seen) setSeen(true)
  const { outerRef, stageRef } = useStageScale()

  // The diagram is full-bleed: its own stage carries the gutters, so it must not sit inside
  // the page frame, or it would be padded twice and scaled down for nothing.
  return (
    <section
      ref={ref}
      id="how"
      className={page.section}
      data-animate={inView ? 'running' : 'paused'}
    >
      <div className={`${page.frame} ${s.head}`}>
        <h2 data-reveal={seen ? 'in' : undefined}>How does it know?</h2>
        <p data-reveal={seen ? 'in' : undefined} style={{ transitionDelay: '0.15s' }}>
          It reads every comment for <b>sentiment, emotion, topic, intent and toxicity</b>, then
          checks it against two years of your page.
        </p>
      </div>

      {/* Both the diagram and the mobile variant are pictures of a process, and both are
          aria-hidden — which left a screen reader with only the heading and sub-line for the
          whole section. This carries the same narrative in prose, at every width. */}
      <p className="visually-hidden">
        Artemis reads every one of tonight&rsquo;s comments five ways: for sentiment, emotion,
        topic, intent and toxicity. A usual Tuesday brings twenty comments; tonight brought a
        hundred and forty-two, which is a storm. Most of them are the same question, so it
        drafts one reply that covers them all. Nothing goes out until you say so.
      </p>

      <div className={s.outer} ref={outerRef} aria-hidden="true">
        <div className={s.stage} ref={stageRef}>
          <div className={s.canvas} data-surface="mock">
            {/* The post that set it off */}
            <div data-surface="mock" className={`${s.card} ${s.post}`}>
              <div className={s.postHead}>
                <span className={s.postAvatar} />
                <span>
                  <span className={s.postName}>Corner Eatery</span>
                  <br />
                  <span className={s.postMeta}>Facebook · 6:20pm</span>
                </span>
                <span className={s.postTile}>f</span>
              </div>
              <p className={s.postBody}>Spring hours are back. Open till 8pm from Monday.</p>
              <span className={s.count}>142 comments &darr;</span>
              <span className={s.replied}>
                <CheckIcon size={11} />
                Replied · 6:43pm
              </span>
            </div>

            {/* The stack they peel off */}
            {DECK_CHIPS.map(({ left, top, handle, text }) => (
              <div key={handle} className={s.chip} style={{ left, top }}>
                <span className={s.chipAvatar} />
                <span>
                  <span className={s.chipHandle}>{handle}</span>
                  <br />
                  <span className={s.chipText}>{text}</span>
                </span>
              </div>
            ))}

            {/* Ten comments flying into the lattice, 0.27s apart */}
            {FLYING_CHIPS.map(({ handle, text }, i) => (
              <div
                key={handle}
                className={s.flyer}
                style={{ animationDelay: `${0.5 + i * 0.27}s`, zIndex: 20 - i }}
              >
                <span className={s.chipAvatar} />
                <span>
                  <span className={s.chipHandle}>{handle}</span>
                  <br />
                  <span className={s.chipText}>{text}</span>
                </span>
              </div>
            ))}

            {/* Artemis reading them */}
            <div className={s.scene}>
              <div className={s.cube}>
                {CUBE_CELLS.map(({ x, y, z, usual, delay }) => (
                  <span
                    key={`${x},${y},${z}`}
                    className={`${s.cell} ${usual ? s.cellUsual : s.cellTonight}`}
                    style={
                      {
                        '--x': `${x}px`,
                        '--y': `${y}px`,
                        '--z': `${z}px`,
                        // Only the colour pass is staggered; the collapse and the
                        // counter-spin must stay in lockstep across all 125 dots.
                        animationDelay: `${delay}s, 0s, 0s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>

            <span className={s.emitted} />

            {/* What it worked out, in order */}
            <p className={`${s.line} ${s.line1}`}>
              Reads every one of them, <em>five ways</em>.
            </p>
            <p className={`${s.line} ${s.line2}`}>
              Your usual Tuesday: <em>20</em>.
            </p>
            <p className={`${s.line} ${s.line3}`}>
              Tonight: <em>142</em>. That&apos;s a storm.
            </p>
            <p className={`${s.line} ${s.line4}`}>
              Most are the same question. <em>One reply.</em>
            </p>
            <p className={`${s.line} ${s.line5}`}>
              Nothing goes out <em>until you say so</em>.
            </p>

            <div className={s.keys}>
              {KEYS.map((key, i) => (
                <span key={key} className={`${s.key} ${s[`key${i}`]}`}>
                  {key}
                </span>
              ))}
            </div>

            {/* The draft, and you sending it */}
            <div data-surface="mock" className={`${s.card} ${s.reply}`}>
              <span className={s.replyLabel}>Drafted · 6:41pm</span>
              <p className={s.replyBody}>
                Thanks all, we&rsquo;re open till 8pm from Monday. Same kitchen, longer
                evenings.
              </p>
              <div className={s.replyActions}>
                <span className={s.send}>
                  <span className={s.sendIdle}>Send</span>
                  <span className={s.sendDone}>Sent &#10003;</span>
                </span>
                <span className={s.changeIt}>Change it</span>
              </div>
            </div>

            <span className={s.returning} />
          </div>
        </div>
      </div>

      <MobileQA />
    </section>
  )
}

/** Below 760px the diagram is replaced by three questions cycling through a search pill. */
function MobileQA() {
  return (
    <div className={s.mobile} aria-hidden="true">
      <div className={s.searchBar}>
        {MOBILE_QA.map(({ question }, i) => (
          <div key={question} className={s.query} style={{ animationDelay: `${i * -4}s` }}>
            <SearchIcon size={15} className={s.queryIcon} />
            <span
              className={`${s.typed} ${s[`type${question.length}`] ?? ''}`}
              style={{ animationDelay: `${i * -4}s` }}
            >
              {question}
            </span>
            <i className={s.caret} />
          </div>
        ))}
      </div>

      <div className={s.answerStage}>
        {MOBILE_QA.map(({ question, source, progress, footnote }, i) => (
          <div key={question} className={s.answer} style={{ animationDelay: `${i * -4}s` }}>
            <p className={s.answerHead}>{ANSWERS[i]}</p>
            <div className={s.source} style={{ animationDelay: `${i * -4}s` }}>
              <span className={s.sourceLabel}>Read from</span>
              <p className={s.sourceBody}>{source}</p>
              <span className={s.sourceTrack}>
                <i style={{ width: `${progress}%`, animationDelay: `${i * -4}s` }} />
              </span>
              <p className={s.footnote}>{footnote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Written out rather than interpolated, so the mint emphasis lands on the right numbers. */
const ANSWERS = [
  <>
    <em>118</em> of tonight&rsquo;s 142 comments ask the same thing. One reply covers them all.
  </>,
  <>
    Post next at <em>7:40pm</em>. That&rsquo;s <em>3.1&times;</em> the reach of your usual 2pm.
  </>,
  <>
    Your draft scores <em>78</em> out of 100. Trim two lines and it clears <em>85</em>.
  </>,
]
