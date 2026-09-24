import { render, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { setReducedMotion } from '../test/setup'
import { useCountUp } from './useCountUp'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

/**
 * Mirrors the real call sites: the span carries the final value as its text, and the hook
 * writes over it.
 */
function Counter({
  target,
  durationMs,
  active,
}: {
  target: number
  durationMs: number
  active: boolean
}) {
  const ref = useCountUp(target, durationMs, active)
  return <span ref={ref}>{target}</span>
}

const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms))

describe('useCountUp', () => {
  it('leaves the final value in the markup for a render that never animates', () => {
    // No hook, no JavaScript — what a crawler or a failed hydration would see.
    const { container } = render(<span>142</span>)
    expect(container.textContent).toBe('142')
  })

  it('starts from zero before the count runs', () => {
    const { container } = render(<Counter target={142} durationMs={1400} active={false} />)
    expect(container.textContent).toBe('0')
  })

  it('counts up to the target and stops there', () => {
    const { container } = render(<Counter target={142} durationMs={1400} active />)

    advance(700)
    const midway = Number(container.textContent)
    expect(midway).toBeGreaterThan(0)
    expect(midway).toBeLessThan(142)

    advance(1400)
    expect(container.textContent).toBe('142')
  })

  it('eases out — more ground covered in the first half than the second', () => {
    const { container } = render(<Counter target={100} durationMs={1000} active />)

    advance(500)
    const half = Number(container.textContent)
    // A cubic ease-out is 87.5% done at the midpoint; linear would be 50%.
    expect(half).toBeGreaterThan(50)
  })

  it('never overshoots the target', () => {
    const { container } = render(<Counter target={20} durationMs={1100} active />)

    for (let elapsed = 0; elapsed < 2000; elapsed += 100) {
      advance(100)
      expect(Number(container.textContent)).toBeLessThanOrEqual(20)
    }
  })

  it('shows the end state immediately under reduced motion', () => {
    act(() => setReducedMotion(true))
    const { container } = render(<Counter target={142} durationMs={1400} active />)

    expect(container.textContent).toBe('142')
  })

  it('recounts when its tab comes back round', () => {
    const { container, rerender } = render(<Counter target={142} durationMs={1400} active />)
    advance(1400)
    expect(container.textContent).toBe('142')

    // Moving away holds the number rather than blanking it.
    rerender(<Counter target={142} durationMs={1400} active={false} />)
    expect(container.textContent).toBe('142')

    // Coming back restarts from zero.
    rerender(<Counter target={142} durationMs={1400} active />)
    expect(container.textContent).toBe('0')
    advance(1400)
    expect(container.textContent).toBe('142')
  })

  it('cancels its frame on unmount', () => {
    const cancel = vi.spyOn(window, 'cancelAnimationFrame')
    const { unmount } = render(<Counter target={142} durationMs={1400} active />)

    advance(200)
    unmount()
    expect(cancel).toHaveBeenCalled()
  })
})
