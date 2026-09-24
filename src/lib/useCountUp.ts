import { useLayoutEffect, useRef, type RefObject } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Counts an element's number up to `target`, writing straight to the DOM.
 *
 * The obvious implementation holds the value in state, but a 1400ms count ticks about 84
 * times, and each tick re-renders the entire owning section — the chart, the device frame,
 * every pane — to change three characters of text. Writing `textContent` on a ref skips React
 * entirely: the section renders once and the number still animates.
 *
 * Returns the ref to attach to the element holding the number. That element's JSX should carry
 * the final value as its text, so the correct number is in the markup before this hook runs,
 * and stays there if it never does — better for assistive tech and for a crawler than the `0`
 * a state-based version would render.
 *
 * `active` gates the run: flipping it false and true again restarts the count, which is how
 * the number re-counts each time its tab comes back round.
 */
export function useCountUp(
  target: number,
  durationMs: number,
  active: boolean,
): RefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)
  const reducedMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion gets the end state, which is what the markup already says.
    if (reducedMotion) {
      el.textContent = String(target)
      return
    }

    if (!active) {
      // Before the first run, replace the markup's final value with zero so the count has
      // somewhere to start. A layout effect does this before paint, so it never flashes.
      // After a run, leave the number where it finished — a tab you have already seen keeps
      // its result rather than blanking when you move away from it.
      if (!hasRun.current) el.textContent = '0'
      return
    }

    hasRun.current = true
    let start: number | null = null
    let frame = 0

    const tick = (now: number) => {
      start ??= now
      const k = Math.min(1, (now - start) / durationMs)
      // Cubic ease-out: fast off the mark, settling onto the final value.
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) frame = requestAnimationFrame(tick)
    }

    el.textContent = '0'
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs, active, reducedMotion])

  return ref
}
