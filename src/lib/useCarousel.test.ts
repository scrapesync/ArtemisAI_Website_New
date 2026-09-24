import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { setReducedMotion } from '../test/setup'
import { useCarousel } from './useCarousel'

const DWELL = 7000

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

/** Push the clock past one dwell, inside React's act() so state settles. */
const dwell = (ms = DWELL) => act(() => void vi.advanceTimersByTime(ms))

describe('useCarousel', () => {
  it('advances one step per dwell while in view', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: true }),
    )

    expect(result.current.index).toBe(0)
    dwell()
    expect(result.current.index).toBe(1)
    dwell()
    expect(result.current.index).toBe(2)
  })

  it('wraps back to the first card', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: true }),
    )

    dwell()
    dwell()
    dwell()
    expect(result.current.index).toBe(0)
  })

  it('never arms the timer while out of view', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: false }),
    )

    dwell(DWELL * 5)
    expect(result.current.index).toBe(0)
  })

  it('holds while paused and resumes on leave', () => {
    const { result, rerender } = renderHook(
      ({ paused }) => useCarousel({ length: 3, dwellMs: DWELL, active: true, paused }),
      { initialProps: { paused: true } },
    )

    dwell(DWELL * 3)
    expect(result.current.index).toBe(0)

    rerender({ paused: false })
    dwell()
    expect(result.current.index).toBe(1)
  })

  it('suspends auto-advance under reduced motion', () => {
    act(() => setReducedMotion(true))
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: true }),
    )

    dwell(DWELL * 5)
    expect(result.current.index).toBe(0)

    // Manual control still works — reduced motion suspends the timer, not the carousel.
    act(() => result.current.next())
    expect(result.current.index).toBe(1)
  })

  it('restarts the dwell after a manual step, rather than cutting it short', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: true }),
    )

    dwell(DWELL - 1000)
    act(() => result.current.goTo(2))
    expect(result.current.index).toBe(2)

    // The old timer had 1s left; if it survived, this would advance.
    dwell(2000)
    expect(result.current.index).toBe(2)

    // A full dwell from the manual step does advance.
    dwell(DWELL - 2000)
    expect(result.current.index).toBe(0)
  })

  it('returns to the first card on exit only when asked to', () => {
    const reset = renderHook(
      ({ active }) => useCarousel({ length: 3, dwellMs: DWELL, active, resetOnExit: true }),
      { initialProps: { active: true } },
    )
    dwell()
    expect(reset.result.current.index).toBe(1)
    reset.rerender({ active: false })
    expect(reset.result.current.index).toBe(0)

    const keep = renderHook(
      ({ active }) => useCarousel({ length: 3, dwellMs: DWELL, active, resetOnExit: false }),
      { initialProps: { active: true } },
    )
    dwell()
    expect(keep.result.current.index).toBe(1)
    keep.rerender({ active: false })
    expect(keep.result.current.index).toBe(1)
  })

  it('wraps prev() below zero', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: false }),
    )

    act(() => result.current.prev())
    expect(result.current.index).toBe(2)
  })

  it('normalises an out-of-range goTo', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: false }),
    )

    act(() => result.current.goTo(4))
    expect(result.current.index).toBe(1)
    act(() => result.current.goTo(-1))
    expect(result.current.index).toBe(2)
  })

  it('reports the ends, which is what disables the arrows', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 3, dwellMs: DWELL, active: false }),
    )

    expect(result.current.atStart).toBe(true)
    expect(result.current.atEnd).toBe(false)
    act(() => result.current.goTo(2))
    expect(result.current.atStart).toBe(false)
    expect(result.current.atEnd).toBe(true)
  })

  it('does not arm a timer for a single slide', () => {
    const { result } = renderHook(() =>
      useCarousel({ length: 1, dwellMs: DWELL, active: true }),
    )

    dwell(DWELL * 3)
    expect(result.current.index).toBe(0)
  })
})
