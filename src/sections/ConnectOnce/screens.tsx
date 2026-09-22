import {
  ArrowUpIcon,
  ArtemisGlyph,
  BellIcon,
  ChevronIcon,
  ClockIcon,
  TrendUpIcon,
} from '../../components/Icons'
import { PlatformMark } from '../../components/PlatformMark'
import s from './ConnectOnce.module.css'

/** Overnight comment volume, the Friday reel spiking at the end. */
const OVERNIGHT_BARS = [30, 26, 34, 28, 38, 32, 100]
/** Reach by hour, 9am → 10pm. The ninth slot is 7:40pm. */
const HOUR_BARS = [22, 30, 36, 32, 28, 40, 54, 72, 100, 66]

/** Step 1 — the pages you handed over, and the history being read. */
export function ConnectScreen() {
  return (
    <>
      <div className={s.kicker}>
        <span>Step 1 of 3</span>
        <h4>Connect once.</h4>
        <p>
          Artemis only reads the pages you hand it. Pull any of them back whenever you like.
        </p>
      </div>

      <div className={s.card}>
        <div className={s.cardHead}>
          <span className={s.cardIcon} style={{ background: 'var(--brand-facebook)' }}>
            <PlatformMark platform="facebook" color="var(--ink)" size={16} />
          </span>
          <span>
            <b>Facebook Pages</b>
            <small>
              <em>Connected</em> · Lewis Rahman
            </small>
          </span>
          <ChevronIcon className={s.chev} />
        </div>

        <div className={s.cardRow}>
          <span className={s.big} data-numeric>
            5<sup>/10</sup>
          </span>
          <span className={s.pages}>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={i < 5 ? s.authorised : undefined}
                style={{ animationDelay: `${0.5 + i * (i < 5 ? 0.06 : 0.04)}s` }}
              />
            ))}
          </span>
        </div>

        <div className={`${s.axis} ${s.axisIndented}`}>
          <span>pages authorised</span>
          <strong>Add more</strong>
        </div>
      </div>

      <div className={s.cardPlain}>
        <PlatformMark platform="instagram" color="var(--ink)" size={16} />
        <span>
          <b>Instagram</b>
          <small>Reels and stories, same feed</small>
        </span>
        <span className={s.action}>Connect</span>
      </div>

      <div className={s.cardPlain}>
        <BellIcon size={16} />
        <span>
          <b>Slack alerts</b>
          <small>Comment storms, to a channel</small>
        </span>
        <span className={s.action}>Set up</span>
      </div>

      <div className={s.foot}>
        <p className={s.footText}>
          <b>Reading your history.</b> Two years so far, 2,481 posts and 61,904 comments.
        </p>
        <span className={s.progress}>
          <i />
        </span>
        <div className={s.axis}>
          <span>Feb 2024</span>
          <em>24 months</em>
        </div>
      </div>
    </>
  )
}

/** Step 2 — what it noticed while you slept. */
export function WatchScreen() {
  return (
    <>
      <span className={s.scan} />

      <div className={s.kicker}>
        <span>Step 2 of 3</span>
        <h4>While you slept.</h4>
        <p>Nothing to firefight. One thing was unusual, so I kept an eye on it.</p>
      </div>

      <div className={`${s.card} ${s.cardWarn}`}>
        <div className={s.cardHead}>
          <span className={s.cardIcon}>
            <TrendUpIcon size={16} />
          </span>
          <span>
            <b>Friday reel</b>
            <small>
              <em>7&times; normal</em> comment rate
            </small>
          </span>
          <ChevronIcon className={s.chev} />
        </div>

        <div className={s.cardRow}>
          <span className={s.big} data-numeric>
            312
          </span>
          <span className={s.bars}>
            {OVERNIGHT_BARS.map((h, i) => (
              <i
                key={i}
                className={i === OVERNIGHT_BARS.length - 1 ? s.peak : undefined}
                style={{ height: `${h}%`, animationDelay: `${0.5 + i * 0.05}s` }}
              />
            ))}
          </span>
        </div>

        <div className={`${s.axis} ${s.axisIndented}`}>
          <span>comments read</span>
          <strong>03:12</strong>
        </div>
      </div>

      <div className={s.message}>
        <span className={s.messageAvatar}>
          <ArtemisGlyph size={12} />
        </span>
        <span>
          Mostly positive. Two people are asking about sizing for the third time, so those are
          flagged for you.
        </span>
      </div>

      <div className={s.cardPlain} style={{ display: 'block' }}>
        <p className={s.quote}>&ldquo;is this available in the UK or not&rdquo;</p>
        <p className={`${s.quote} ${s.quoteDim}`}>
          &ldquo;third time asking about sizing&hellip;&rdquo;
        </p>
        <p className={`${s.quote} ${s.quoteDimmer}`}>
          &ldquo;tagging my sister, she needs this&rdquo;
        </p>
      </div>

      <div className={s.foot}>
        <span className={s.livePill}>
          <i className={s.pulse} />
          Live · no gaps since 4 Feb
        </span>
      </div>
    </>
  )
}

/** Step 3 — the one thing to do today. */
export function AnswerScreen() {
  return (
    <>
      <div className={s.kicker}>
        <span>Step 3 of 3</span>
        <h4>Your move today.</h4>
        <p>One thing, with the numbers behind it. Say the word and I&apos;ll schedule it.</p>
      </div>

      <div className={s.card}>
        <div className={s.cardHead}>
          <span className={s.cardIcon}>
            <ClockIcon size={16} />
          </span>
          <span>
            <b>Post the sizing answer</b>
            <small>
              <em>3.1&times;</em> the reach of your morning
            </small>
          </span>
          <ChevronIcon className={s.chev} />
        </div>

        <div className={s.cardRow}>
          <span className={s.big} style={{ fontSize: 38 }} data-numeric>
            7:40<sup style={{ fontSize: 14 }}>pm</sup>
          </span>
          <span className={s.bars}>
            {HOUR_BARS.map((h, i) => (
              <i
                key={i}
                className={i === 3 ? s.dim : i === 8 ? s.peak : undefined}
                style={{ height: `${h}%`, animationDelay: `${0.5 + i * 0.05}s` }}
              />
            ))}
          </span>
        </div>

        <div className={`${s.axis} ${s.axisIndented}`}>
          <span>9am</span>
          <strong>2pm</strong>
          <span />
          <em>7:40</em>
          <span>10pm</span>
        </div>

        <div className={s.actions}>
          <span className={s.go}>Schedule it</span>
          <span className={s.ghost}>Show me why</span>
        </div>
      </div>

      <div className={s.message}>
        <span className={s.messageAvatar}>
          <ArtemisGlyph size={12} />
        </span>
        <span>
          41 people asked this week. Also worth a look: the Friday reel is still reaching new
          people, so a 6pm reshare should land.
        </span>
      </div>

      <div className={s.foot}>
        <div className={s.ask}>
          <span>Ask Art E anything&hellip;</span>
          <span className={s.askSend}>
            <ArrowUpIcon size={14} />
          </span>
        </div>
      </div>
    </>
  )
}
