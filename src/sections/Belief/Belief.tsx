import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, ArtemisGlyph } from '../../components/Icons'
import { useCarousel } from '../../lib/useCarousel'
import { useInView } from '../../lib/useInView'
import { useMediaQuery } from '../../lib/useMediaQuery'
import page from '../../styles/page.module.css'
import { CARDS } from './content'
import s from './Belief.module.css'

const DWELL_MS = 7000

/**
 * Where the track has to sit for each card to land on the left gutter.
 *
 * The prototype hard-codes `[0, -714, -938]`, which only holds at exactly 1440px with 130px
 * gutters — the third value is not a full cell because the last card is end-aligned against
 * the right gutter instead. Since we reflow rather than scale, the same three numbers are
 * measured from the laid-out DOM and recomputed whenever the box changes.
 */
function useTrackOffsets(viewRef: React.RefObject<HTMLDivElement | null>, count: number) {
  const [offsets, setOffsets] = useState<number[]>(() => Array(count).fill(0))

  useLayoutEffect(() => {
    const view = viewRef.current
    const track = view?.firstElementChild as HTMLElement | null
    if (!view || !track) return

    const measure = () => {
      const gutter = parseFloat(getComputedStyle(track).paddingLeft) || 0
      // How far the track can travel before the last card's right edge hits the right gutter.
      const maxShift = Math.max(0, track.scrollWidth - (view.clientWidth - gutter))
      const next = Array.from(track.children, (cell) =>
        Math.min((cell as HTMLElement).offsetLeft - gutter, maxShift),
      )
      setOffsets((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next,
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(view)
    observer.observe(track)
    return () => observer.disconnect()
  }, [viewRef, count])

  return offsets
}

export function Belief() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const viewRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // Below 760px the track becomes a real scroll container so the cards can be swiped, and
  // auto-advance drives it with scrollTo instead of a transform.
  const isMobile = useMediaQuery('(max-width: 760px)')
  const offsets = useTrackOffsets(viewRef, CARDS.length)

  const { index, goTo, next, prev, atStart, atEnd } = useCarousel({
    length: CARDS.length,
    dwellMs: DWELL_MS,
    active: inView,
    paused: hovered,
    // Belief returns to the first card when scrolled away; Collabs does not.
    resetOnExit: true,
  })

  useEffect(() => {
    const view = viewRef.current
    if (!view || !isMobile) return
    const target = offsets[index] ?? 0
    if (Math.abs(view.scrollLeft - target) < 4) return
    view.scrollTo({
      left: target,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }, [index, isMobile, offsets])

  // Keep the index honest when the visitor swipes, so auto-advance resumes from where they are.
  const onScroll = useCallback(() => {
    const view = viewRef.current
    if (!view || !isMobile) return
    let closest = 0
    let best = Infinity
    offsets.forEach((offset, i) => {
      const distance = Math.abs(view.scrollLeft - offset)
      if (distance < best) {
        best = distance
        closest = i
      }
    })
    if (closest !== index) goTo(closest)
  }, [isMobile, offsets, index, goTo])

  return (
    <section ref={ref} id="why" className={`${page.frame} ${page.section} ${s.section}`}>
      <h2 className={s.title} data-reveal={inView ? 'in' : undefined}>
        Growth shouldn&rsquo;t mean being online all day.
      </h2>

      <div
        ref={viewRef}
        className={`${s.view} ${inView ? s.seen : ''}`}
        data-reveal={inView ? 'in' : undefined}
        style={{ transitionDelay: '0.15s' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onScroll={onScroll}
      >
        <div
          className={s.track}
          style={{ transform: isMobile ? undefined : `translateX(${-(offsets[index] ?? 0)}px)` }}
        >
          {CARDS.map(({ photo, caption }, i) => (
            <div className={s.cell} key={i}>
              <div className={s.card} data-surface="mock">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${photo.webp} 690w, ${photo.webp2x} 1380w`}
                    sizes="(max-width: 760px) 84vw, 690px"
                  />
                  <img
                    className={s.photo}
                    src={photo.jpg}
                    alt={photo.alt}
                    width={690}
                    height={500}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className={s.scrim} />
                {i === 0 && <NotificationCard />}
                {i === 1 && <CommentThread />}
                {i === 2 && <IntroCard />}
              </div>
              <p className={s.caption}>{caption}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.arrows} data-reveal={inView ? 'in' : undefined} style={{ transitionDelay: '0.3s' }}>
        <button className={s.arrow} onClick={prev} disabled={atStart} aria-label="Previous">
          <ArrowLeftIcon size={14} />
        </button>
        <button className={s.arrow} onClick={next} disabled={atEnd} aria-label="Next">
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </section>
  )
}

/* The three glass artefacts are mock product UI laid over a photograph — a picture of the
   product, like the device screens, rather than page copy. */
function NotificationCard() {
  return (
    <div className={`${s.glass} ${s.note}`} data-decorative="product-mock">
      <div className={s.noteHead}>
        <span className={s.noteIcon}>
          <ArtemisGlyph size={12} />
        </span>
        <span className={s.noteApp}>Artemis</span>
        <span className={s.noteTime}>now</span>
      </div>
      <p className={s.noteTitle}>3 people asked what time you close tonight</p>
      <p className={s.noteBody}>
        Reply&rsquo;s drafted in your voice. Have a look when you get a sec.
      </p>
    </div>
  )
}

function CommentThread() {
  return (
    <div className={s.thread} data-decorative="product-mock">
      <div className={s.question}>
        <b>sarah.m</b> what time do you shut tonight?
      </div>
      <div className={`${s.glass} ${s.comment}`}>
        <span className={s.commentAvatar} />
        <div className={s.commentBody}>
          <div className={s.commentName}>
            Corner Eatery<span>draft</span>
          </div>
          <p className={s.commentText}>
            Open till 8pm from Monday. Same kitchen, longer evenings.
          </p>
          <div className={s.actions}>
            <span className={s.send}>Send</span>
            <span className={s.ghost}>Change it</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function IntroCard() {
  return (
    <div className={`${s.glass} ${s.intro}`} data-decorative="product-mock">
      <span className={s.introAvatars}>
        <i />
        <i />
      </span>
      <div>
        <div className={s.introTitle}>Riverside Runners are worth a hello.</div>
        <p className={s.introBody}>
          Puts you in front of 8,200 people who don&apos;t know you yet.
        </p>
      </div>
      <span className={s.send} style={{ flex: 'none' }}>
        Say hello
      </span>
    </div>
  )
}
