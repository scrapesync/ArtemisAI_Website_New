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
 * The glyph shows the theme you are *in*, not the one you would get — a moon while the page
 * is dark. That is the convention people already read on other sites, and the alternative
 * (showing the destination) is the single most common way these controls confuse.
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
      {theme === 'dark' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
      <span className="visually-hidden">Light mode</span>
    </button>
  )
}
