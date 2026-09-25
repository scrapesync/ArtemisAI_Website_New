import type { CSSProperties, ReactNode } from 'react'
import styles from './DeviceFrame.module.css'

/** Hardware buttons, in the prototype's exact positions on the 424×896 bezel. */
const BUTTONS: CSSProperties[] = [
  { left: -3, top: 150, height: 34 },
  { left: -3, top: 210, height: 62 },
  { left: -3, top: 284, height: 62 },
  { right: -3, top: 240, height: 96 },
]

interface DeviceFrameProps {
  children: ReactNode
  /**
   * Which machined finish to wear. The handoff asks that the hero device and the Connect Once
   * device stay independent — the prototype scoped their CSS specifically so one could not
   * leak into the other, and this prop is how that separation survives the port.
   */
  variant?: 'hero' | 'connect'
  /** iOS chrome: dynamic island, status bar and home indicator. The hero omits all three. */
  chrome?: boolean
  /**
   * Default rendered size as a fraction of the true 424×896. A section can override it per
   * breakpoint by setting `--device-scale` in its own stylesheet.
   */
  scale?: number
  className?: string
  screenClassName?: string
  style?: CSSProperties
}

export function DeviceFrame({
  children,
  variant = 'hero',
  chrome = false,
  scale = 0.72,
  className,
  screenClassName,
  style,
}: DeviceFrameProps) {
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ ...style, '--device-scale-default': scale } as CSSProperties}
    >
      <div className={`${styles.bezel} ${styles[variant]}`}>
        {BUTTONS.map((position, i) => (
          <span key={i} className={styles.button} style={position} />
        ))}

        {/* Everything inside the screen is a picture of the product, not page copy — the
            handoff's contrast floor applies to the page, not to mock UI inside a device. */}
        <div
          className={[styles.screen, screenClassName].filter(Boolean).join(' ')}
          data-decorative="device-screen"
          data-surface="mock"
        >
          {chrome && (
            <>
              <div className={styles.island} />
              <div className={styles.statusBar}>
                <span className={styles.statusTime}>9:41</span>
                <span className={styles.statusIcons}>
                  <CellularIcon />
                  <WifiIcon />
                  <BatteryIcon />
                </span>
              </div>
            </>
          )}

          {children}

          {chrome && <div className={styles.homeIndicator} />}
        </div>
      </div>
    </div>
  )
}

function CellularIcon() {
  return (
    <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor" aria-hidden="true">
      <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" />
      <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" />
      <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" />
      <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
      <path
        d="M1 4.2a11 11 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 7.2a6.7 6.7 0 0 1 9 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="12"
        rx="3.5"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      <rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" />
      <path
        d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  )
}
