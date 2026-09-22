import {
  ArtemisGlyph,
  ArrowUpIcon,
  ChevronIcon,
  ClockIcon,
  CloseIcon,
  MenuIcon,
  TrendUpIcon,
} from '../../components/Icons'
import s from './ChatScreen.module.css'

/** Last week's reach, Monday→yesterday. The final bar is the reel that flopped. */
const REACH_BARS = [74, 82, 92, 78, 88, 70, 34]
const REACH_DAYS = ['T', 'F', 'S', 'S', 'M', 'T']

/** Reach by hour, 9am→10pm. The ninth slot is 7:40pm. */
const TIME_BARS = [22, 30, 36, 32, 28, 40, 54, 72, 100, 66]

const SUGGESTIONS = [
  'What should I post next?',
  'Any comments I missed?',
  "Who's my top fan this week?",
]

/** The thumbnail sweep runs on its own absolute delays, ~110ms apart. */
const THUMB_DELAYS = [
  4.04, 4.15, 4.25, 4.36, 4.47, 4.58, 4.69, 4.8, 4.91, 5.02, 5.13, 5.24,
]

export function ChatScreen() {
  return (
    <div className={s.screen}>
      <div className={s.glow} />

      <div className={s.bar}>
        <span className={s.iconButton}>
          <CloseIcon size={14} />
        </span>
        <span className={s.who}>
          <span className={s.avatar}>
            <ArtemisGlyph size={16} />
          </span>
          <span>
            <b>Art E</b>
            <small>
              <i className={s.liveDot} />
              Watching 3 pages
            </small>
          </span>
        </span>
        <span className={s.iconButton}>
          <MenuIcon size={16} />
        </span>
      </div>

      <div className={s.chat}>
        <div className={s.stack}>
          {/* The question, typed in */}
          <div className={`${s.message} ${s.fromMe} ${s.animated} ${s.animU1}`}>
            <div>
              <div className={s.userBubble}>
                <span className={`${s.typed} ${s.animated} ${s.animT1}`}>
                  Why did yesterday&rsquo;s reel flop?
                </span>
              </div>
            </div>
          </div>

          {/* Thinking */}
          <div className={`${s.message} ${s.animated} ${s.animTh}`}>
            <div>
              <div className={s.thinking}>
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>

          {/* Found it — twelve posts, scanned */}
          <div className={`${s.message} ${s.animated} ${s.animA1}`}>
            <div>
              <div className={s.msgRow}>
                <span className={s.msgAvatar}>
                  <ArtemisGlyph size={12} />
                </span>
                <span className={s.msgText}>
                  <b>Found it.</b> I compared it against your last 12 posts.
                </span>
              </div>
              <div className={s.thumbGrid}>
                {THUMB_DELAYS.map((delay, i) => (
                  <span
                    key={i}
                    className={`${s.thumb} ${s.animated} ${
                      i === THUMB_DELAYS.length - 1 ? s.animScanHit : s.animScan
                    }`}
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
              <div className={`${s.caption} ${s.animated} ${s.animCaption}`}>
                Yesterday, 2:04pm
              </div>
            </div>
          </div>

          {/* Reach */}
          <div className={`${s.message} ${s.animated} ${s.animA2}`}>
            <div>
              <div className={`${s.card} ${s.cardWarn}`}>
                <div className={s.cardHead}>
                  <span className={s.cardIcon}>
                    <TrendUpIcon size={16} />
                  </span>
                  <span>
                    <b>Reach</b>
                    <small>
                      <em>62% under</em> your average
                    </small>
                  </span>
                  <ChevronIcon className={s.chevron} />
                </div>
                <div className={s.row}>
                  <span className={s.big}>
                    38<sup>%</sup>
                  </span>
                  <span className={s.bars}>
                    {REACH_BARS.map((h, i) => (
                      <i
                        key={i}
                        className={`${s.animated} ${s.animGrow2} ${
                          i === REACH_BARS.length - 1 ? s.dim : ''
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </span>
                </div>
                <div className={s.axis}>
                  {REACH_DAYS.map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                  <strong>Yday</strong>
                </div>
                <div className={s.cardFoot}>
                  The hook loses them at <b>0:03</b>.
                </div>
              </div>
            </div>
          </div>

          {/* Best time */}
          <div className={`${s.message} ${s.animated} ${s.animA3}`}>
            <div>
              <div className={s.card}>
                <div className={s.cardHead}>
                  <span className={s.cardIcon}>
                    <ClockIcon size={16} />
                  </span>
                  <span>
                    <b>Best time</b>
                    <small>
                      <em>3.1&times;</em> the reach of your 2pm
                    </small>
                  </span>
                  <ChevronIcon className={s.chevron} />
                </div>
                <div className={s.row}>
                  <span className={s.big} style={{ fontSize: 38 }}>
                    7:40<sup style={{ fontSize: 14 }}>pm</sup>
                  </span>
                  <span className={s.bars}>
                    {TIME_BARS.map((h, i) => (
                      <i
                        key={i}
                        className={`${s.animated} ${s.animGrow3} ${i === 3 ? s.dim : ''} ${
                          i === 8 ? s.peak : ''
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </span>
                </div>
                <div className={s.axis}>
                  <span>9am</span>
                  <strong>2pm</strong>
                  <span />
                  <em>7:40</em>
                  <span>10pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.suggestions}>
        {SUGGESTIONS.map((text, i) => (
          <span
            key={text}
            className={`${s.chip} ${s.animated} ${s.animChip}`}
            style={{ animationDelay: `${[4.04, 4.15, 4.25][i]}s` }}
          >
            {text}
          </span>
        ))}
      </div>

      <div className={s.input}>
        <span>Ask Art E anything&hellip;</span>
        <span className={s.send}>
          <ArrowUpIcon size={14} />
        </span>
      </div>

      <p className={s.disclaimer}>Art E can make mistakes. You always decide.</p>
    </div>
  )
}
