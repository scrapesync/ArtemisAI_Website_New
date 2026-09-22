import { ArtemisGlyph } from '../../components/Icons'
import {
  DAYS,
  DRAFT_TEXT,
  HEATMAP,
  REPLIES,
  SCORE_TRACKS,
  STORM_AREA,
  STORM_LINE,
} from './content'
import s from './WhatWeDo.module.css'

/** Pane 1 — a comment storm caught, and one reply that covers it. */
export function StormPane({ comments, minutes }: { comments: number; minutes: number }) {
  return (
    <>
      <div className={s.stormLeft}>
        <div className={s.stormHead}>
          <span className={s.label}>
            Storm caught &nbsp;·&nbsp; <em>6:41pm</em>
          </span>
          <span className={s.live}>
            <i className={s.liveDot} />
            Live
          </span>
        </div>

        <div className={s.stats}>
          <div className={s.stat}>
            <div className={s.big} data-numeric>
              {comments}
            </div>
            <div className={s.statCaption}>comments</div>
          </div>
          <div className={s.stat}>
            <div className={s.big} data-numeric>
              {minutes}
              <span>min</span>
            </div>
            <div className={s.statCaption}>from first to caught</div>
          </div>
          <span className={s.coverPill}>
            <i />
            <span>
              <b>1</b> reply covers all
            </span>
          </span>
        </div>

        <div className={s.chart}>
          <svg viewBox="0 0 560 150" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path d={STORM_AREA} fill="url(#stormFill)" />
            <path
              className={s.spark}
              d={STORM_LINE}
              stroke="var(--mint)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="stormFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#3BB98F" stopOpacity="0.22" />
                <stop offset="1" stopColor="#3BB98F" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <span className={s.marker} />
          <span className={s.markerLabel}>Artemis flags it</span>
        </div>

        {/* A chart axis: decorative, and every value on it is restated in the copy beside
            the chart. One of the handoff's three named contrast exceptions. */}
        <div className={s.axis} data-decorative="chart-axis">
          <span>6:20pm</span>
          <span>6:30</span>
          <em>6:41</em>
          <span>6:50</span>
        </div>
      </div>

      <div className={s.stormRight}>
        <span className={s.label}>Reply drafted, in your voice</span>

        <div className={s.replyStack}>
          {REPLIES.map((text, i) => (
            <article
              key={text}
              className={s.replyCard}
              style={{ animationDelay: `${i * -3}s` }}
              aria-hidden={i > 0}
            >
              <div className={s.replyHead}>
                <span className={s.replyAvatar}>
                  <ArtemisGlyph size={12} />
                </span>
                <span className={s.replyName}>Art E</span>
                <span className={s.replyKicker}>Pinned reply</span>
                {/* One of the handoff's three named contrast exceptions: decorative, and the
                    same information is in the rotation itself. */}
                <span className={s.replyCount} data-decorative="counter">
                  {i + 1} / 3
                </span>
              </div>
              <p className={s.replyBody}>{text}</p>
            </article>
          ))}
        </div>

        <div className={s.replyFoot}>
          <span className={s.pillSolid}>Send</span>
          <span className={s.pillGhost}>Change it first</span>
          <span className={s.replyNote}>Nothing sent until you press it.</span>
        </div>
      </div>
    </>
  )
}

/** Pane 2 — the hour the audience actually shows up. */
export function WindowPane() {
  return (
    <>
      <div>
        <span className={s.label}>
          Best window &nbsp;·&nbsp; <em>read off your own history</em>
        </span>

        <div className={s.heatGrid} aria-hidden="true">
          {HEATMAP.flatMap((row, r) =>
            row.map((alpha, c) => (
              <span
                key={`${r}-${c}`}
                className={s.heatCell}
                style={{
                  background: `rgba(59, 185, 143, ${alpha})`,
                  // A diagonal wipe: 60ms per column, 60ms per row.
                  animationDelay: `${(r + c) * 0.06}s`,
                  ...(alpha > 0.5 ? { boxShadow: '0 0 0 1px var(--mint)' } : null),
                }}
              />
            )),
          )}
        </div>

        <div className={s.dayAxis} aria-hidden="true" data-decorative="chart-axis">
          {DAYS.map((day, i) => (
            <span key={i} className={i === 1 ? s.hot : undefined}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <div>
        <span className={s.label}>Post it</span>
        <div className={`${s.big} ${s.windowTime}`}>Tonight, 7:40pm</div>
        <p className={s.windowLift}>3.1&times; the reach of your usual 2pm</p>
        <p className={`${s.paneSub} ${s.windowNote}`}>
          Not an industry average. Two years of your own posts, and when your people actually
          turned up for them.
        </p>
      </div>
    </>
  )
}

/** Pane 3 — the draft, scored before it goes out. */
export function ScorePane() {
  return (
    <>
      <div>
        <span className={s.label}>
          Draft scored &nbsp;·&nbsp; <em>before you post</em>
        </span>

        <div className={s.scoreRow}>
          <div>
            <div className={`${s.big} ${s.scoreValue}`} data-numeric>
              78
            </div>
            <div className={s.scoreOutOf}>OUT OF 100</div>
          </div>

          <div className={s.tracks}>
            {SCORE_TRACKS.map(({ label, value, dim }, i) => (
              <div key={label}>
                <div className={s.trackHead}>
                  <span>{label}</span>
                  <b>{value}</b>
                </div>
                <div className={s.track}>
                  <span
                    className={s.trackFill}
                    style={{
                      width: `${value}%`,
                      opacity: dim ? 0.55 : 1,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <span className={s.label}>The draft</span>
        <p className={s.draftText}>{DRAFT_TEXT}</p>
        <p className={s.draftVerdict}>
          Trim two lines and it clears <em>85</em>.
        </p>
      </div>
    </>
  )
}
