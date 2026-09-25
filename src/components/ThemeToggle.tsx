import { MoonIcon, SunIcon } from './Icons'
import { useTheme } from '../lib/useTheme'
import styles from './ThemeToggle.module.css'

interface ThemeToggleProps {
  /** Renders a visible "Appearance" label beside the glyph, for the mobile sheet. */
  withLabel?: boolean
  className?: string
}

/**
 * Switches the page between dark and light.
 *
 * The glyph shows the theme you would GET, not the one you are in: a moon on the light page
 * means "go dark". Both conventions are in the wild; this is the one the site uses, so the
 * control reads as the action it performs rather than as a status light.
 *
 * `aria-pressed` makes it a toggle rather than a button that does something unnamed, so a
 * screen reader announces both the control and its current state.
 */
export function ThemeToggle({ withLabel = false, className }: ThemeToggleProps) {
  const [theme, toggle] = useTheme()

  return (
    <button
      type="button"
      className={[styles.toggle, withLabel ? styles.labelled : '', className]
        .filter(Boolean)
        .join(' ')}
      onClick={toggle}
      aria-pressed={theme === 'light'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {withLabel && <span className={styles.label}>Appearance</span>}
      {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
      <span className="visually-hidden">Light mode</span>
    </button>
  )
}
