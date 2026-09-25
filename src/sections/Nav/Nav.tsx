import { useCallback, useEffect, useRef, useState } from 'react'
import { ArtemisMark, CloseIcon } from '../../components/Icons'
import { PlatformBadges } from '../../components/PlatformBadges'
import { ThemeToggle } from '../../components/ThemeToggle'
import { CONNECT_LABEL, CTA_LABEL, NAV_LINKS, TEAM_LINK } from '../../lib/constants'
import { scrollToSignup } from '../../lib/scrollToSignup'
import { useFocusTrap } from '../../lib/useFocusTrap'
import { useLockBodyScroll } from '../../lib/useLockBodyScroll'
import { useScrolledPast } from '../../lib/useScrolledPast'
import styles from './Nav.module.css'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolledPast(240)
  const sheetRef = useRef<HTMLDivElement>(null)

  useLockBodyScroll(menuOpen)
  // role="dialog" + aria-modal is a promise that the page behind is unreachable. Keep it.
  useFocusTrap(sheetRef, menuOpen)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Escape closes the sheet, as a full-screen overlay should.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  const goToSignup = useCallback(() => {
    closeMenu()
    scrollToSignup()
  }, [closeMenu])

  return (
    <>
      <header className={styles.nav}>
        <a className={styles.brand} href="#top" aria-label="ArtemisAI, home">
          <ArtemisMark size={18} />
          <span>ArtemisAI</span>
        </a>

        <nav className={`${styles.links} ${styles.desktopOnly}`} aria-label="Sections">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          {/* Last, and set apart: the others jump within this page, this one leaves it. */}
          <a className={styles.teamLink} href={TEAM_LINK.href}>
            {TEAM_LINK.label}
          </a>
        </nav>

        {/* One group, so the bar's space-between distributes around the pair rather than
            between them — that is what keeps the toggle a fixed 8px off the CTA. */}
        <div className={`${styles.actions} ${styles.desktopOnly}`}>
          <ThemeToggle />

          <button className={styles.connect} onClick={goToSignup}>
            <span className={styles.badges}>
              <PlatformBadges size={26} overlap={-7} />
            </span>
            <span>{CONNECT_LABEL}</span>
          </button>
        </div>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <div
          ref={sheetRef}
          className={styles.sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button className={styles.close} onClick={closeMenu} aria-label="Close menu">
            <CloseIcon size={18} />
          </button>

          <nav className={styles.sheetLinks} onClick={closeMenu} aria-label="Sections">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a className={styles.teamLink} href={TEAM_LINK.href}>
              {TEAM_LINK.label}
            </a>
          </nav>

          <div className={styles.sheetTheme}>
            <ThemeToggle withLabel />
          </div>

          <div className={styles.sheetFoot}>
            <button onClick={goToSignup}>
              <PlatformBadges size={22} flat />
              <span>{CONNECT_LABEL}</span>
            </button>
            <button className={styles.sheetGo} onClick={goToSignup}>
              {CTA_LABEL}
            </button>
          </div>
        </div>
      )}

      <div
        className={`${styles.stickyCta} ${scrolled ? styles.stickyOn : ''}`}
        inert={menuOpen}
      >
        <button onClick={goToSignup} tabIndex={scrolled ? 0 : -1}>
          {CTA_LABEL}
        </button>
      </div>
    </>
  )
}
