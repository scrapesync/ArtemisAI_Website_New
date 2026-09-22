import { useCallback, useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Live-updating `prefers-reduced-motion`.
 *
 * CSS media queries handle the transitions, but they cannot stop a `setTimeout` — so every
 * auto-advancing carousel reads this too and simply never arms its timer.
 *
 * Subscribed through `useSyncExternalStore`, which is the right primitive for an external
 * store like `matchMedia`: no effect, no cascading render, and no window where a change
 * between first render and subscription could be missed.
 */
export function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(QUERY)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
