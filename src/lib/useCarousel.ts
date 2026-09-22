import { useCallback, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface CarouselOptions {
  length: number
  /** How long each step holds, in ms. 7s Belief, 8s Collabs. */
  dwellMs: number
  /** Section is in view. The timer never runs otherwise. */
  active: boolean
  /** Hover pause. */
  paused?: boolean
  /** Belief returns to the first card when scrolled away; Collabs stays put. */
  resetOnExit?: boolean
}

export interface Carousel {
  index: number
  goTo: (n: number) => void
  next: () => void
  prev: () => void
  atStart: boolean
  atEnd: boolean
}

/**
 * The contract all three carousels share: start only when in view, hold for a dwell, pause on
 * hover, resume on leave, stay manually controllable, and suspend entirely under reduced motion.
 *
 * A manual interaction *restarts* the dwell rather than killing it — that falls out for free
 * here, because the timer effect depends on `index`, so any change to it re-arms the timeout.
 */
export function useCarousel({
  length,
  dwellMs,
  active,
  paused = false,
  resetOnExit = false,
}: CarouselOptions): Carousel {
  const [index, setIndex] = useState(0)
  const [wasActive, setWasActive] = useState(active)
  const reducedMotion = usePrefersReducedMotion()

  // Adjusting state during render when a prop changes — React's documented pattern, and the
  // right one here: an effect would paint one frame of the old card before resetting.
  if (wasActive !== active) {
    setWasActive(active)
    if (!active && resetOnExit) setIndex(0)
  }

  useEffect(() => {
    if (!active || paused || reducedMotion || length < 2) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % length), dwellMs)
    return () => window.clearTimeout(timer)
  }, [index, active, paused, reducedMotion, dwellMs, length])

  const goTo = useCallback(
    (n: number) => setIndex(((n % length) + length) % length),
    [length],
  )
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length])

  return { index, goTo, next, prev, atStart: index === 0, atEnd: index === length - 1 }
}
