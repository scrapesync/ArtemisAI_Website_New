import type { CSSProperties } from 'react'
import { PlatformMark } from './PlatformMark'
import type { Platform } from './platforms'
import styles from './PlatformBadges.module.css'

/** Instagram, Facebook and X — the three the "Connect now" pill advertises, in that order. */
const BADGES: { platform: Platform; color: string; scale: number }[] = [
  { platform: 'instagram', color: 'var(--brand-instagram)', scale: 0.54 },
  { platform: 'facebook', color: 'var(--brand-facebook)', scale: 0.54 },
  // The prototype inverts the near-black X mark to read on the black badge.
  { platform: 'x', color: 'var(--ink)', scale: 0.5 },
]

interface PlatformBadgesProps {
  /** Badge diameter in px. 26 in the nav, 32 in the hero. */
  size?: number
  /** How far each badge tucks under the previous one. Ignored when `flat`. */
  overlap?: number
  /** The mobile sheet lays them out side by side instead of stacked. */
  flat?: boolean
}

export function PlatformBadges({ size = 26, overlap = -7, flat = false }: PlatformBadgesProps) {
  return (
    <span
      className={`${styles.cluster} ${flat ? styles.flat : ''}`}
      style={
        {
          '--badge-size': `${size}px`,
          '--badge-overlap': `${overlap}px`,
        } as CSSProperties
      }
    >
      {BADGES.map(({ platform, color, scale }) => (
        <span key={platform} className={styles.badge}>
          <PlatformMark platform={platform} color={color} size={Math.round(size * scale)} />
        </span>
      ))}
    </span>
  )
}
