import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Counts from 0 to `target`, eased `1 - (1 - k)³`, driven by requestAnimationFrame.
 *
 * Bump `runKey` to replay — the handoff re-runs the count when its tab is picked by hand.
 * Under reduced motion the final value is returned directly, derived during render rather
 * than written from an effect.
 */
export function useCountUp(
  target: number,
  durationMs: number,
  active: boolean,
  runKey: number = 0,
): number {
  const [value, setValue] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!active || reducedMotion) return

    let start: number | null = null
    let frame = 0

    const tick = (now: number) => {
      start ??= now
      const k = Math.min(1, (now - start) / durationMs)
      setValue(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // runKey is intentionally a dependency: changing it restarts the count.
  }, [target, durationMs, active, reducedMotion, runKey])

  return reducedMotion ? target : value
}
