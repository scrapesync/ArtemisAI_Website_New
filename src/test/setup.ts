import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

/**
 * jsdom implements no layout and no `matchMedia`, both of which the hooks under test read.
 * These two shims are the smallest stand-ins that let the real hook code run unmodified.
 */

// ── matchMedia ──────────────────────────────────────────────────────────────
const REDUCE = 'prefers-reduced-motion: reduce'
let reduced = false
const listeners = new Set<(e: MediaQueryListEvent) => void>()

/** Flip the reduced-motion preference and notify subscribers, as a real browser would. */
export function setReducedMotion(value: boolean): void {
  reduced = value
  for (const listener of [...listeners]) listener({ matches: value } as MediaQueryListEvent)
}

window.matchMedia = ((query: string) => ({
  media: query,
  get matches() {
    return query.includes(REDUCE) ? reduced : false
  },
  onchange: null,
  addEventListener: (_type: string, listener: (e: MediaQueryListEvent) => void) => {
    listeners.add(listener)
  },
  removeEventListener: (_type: string, listener: (e: MediaQueryListEvent) => void) => {
    listeners.delete(listener)
  },
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia

// ── offsetParent ────────────────────────────────────────────────────────────
// useFocusTrap uses `offsetParent !== null` to skip controls that are not rendered. jsdom
// returns null for everything, which would make every element look hidden and the trap look
// broken. Approximate it with the one distinction the trap actually cares about.
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  configurable: true,
  get(this: HTMLElement) {
    const hidden = (el: HTMLElement): boolean =>
      el.style.display === 'none' ||
      el.hasAttribute('hidden') ||
      (el.parentElement !== null && hidden(el.parentElement))
    return hidden(this) ? null : (this.parentElement ?? document.body)
  },
})

afterEach(() => {
  cleanup()
  reduced = false
  listeners.clear()
})
