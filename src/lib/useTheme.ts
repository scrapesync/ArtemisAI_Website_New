import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

/** Shared with the inline bootstrap in index.html, which reads this key before first paint. */
export const THEME_KEY = 'artemis-theme'

const listeners = new Set<() => void>()

/**
 * Dark is the default: it is the theme the page was designed in, and the handoff composes the
 * hero, the mint glow and every device mock for a dark ground. Light is an explicit choice.
 *
 * Anything other than the string 'light' reads as dark, so a corrupt or hand-edited value
 * degrades to the designed default rather than throwing. `localStorage` itself throws in some
 * privacy modes, which is why every access here is guarded.
 */
function read(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

/**
 * The DOM attribute is what the CSS actually reads; `localStorage` is only how the choice
 * survives a reload. Kept in one place so the toggle, the cross-tab listener and the inline
 * bootstrap cannot drift apart.
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  // Tells the browser which way to render its own furniture — form controls, scrollbars.
  root.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f6f3ee' : '#000000')
}

let settle = 0

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Private mode. The switch still works for this page view, it just will not persist.
  }

  // Ease the repaint, but only for as long as it takes. global.css hangs a transition off
  // this attribute; leaving it on permanently would tax every unrelated hover on the page.
  const root = document.documentElement
  root.setAttribute('data-theme-switching', '')
  window.clearTimeout(settle)
  settle = window.setTimeout(() => root.removeAttribute('data-theme-switching'), 320)

  applyTheme(theme)
  for (const notify of [...listeners]) notify()
}

/** Module-level so the reference is stable; useSyncExternalStore resubscribes if it changes. */
function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  // A second tab switching theme writes to localStorage, which fires `storage` here.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== THEME_KEY) return
    applyTheme(read())
    onChange()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * The current theme and a toggle for it.
 *
 * `useSyncExternalStore` rather than state-plus-effect for the same reason
 * `usePrefersReducedMotion` uses it: the source of truth lives outside React, and this leaves
 * no window between first render and subscription where a change could be missed.
 */
export function useTheme(): [Theme, () => void] {
  const theme = useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
  const toggle = useCallback(() => setTheme(read() === 'dark' ? 'light' : 'dark'), [])
  return [theme, toggle]
}
