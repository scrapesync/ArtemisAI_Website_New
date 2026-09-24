import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useRef } from 'react'

import { useFocusTrap } from './useFocusTrap'

function Dialog({ active, hideMiddle = false }: { active: boolean; hideMiddle?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, active)
  return (
    <div ref={ref}>
      <button type="button">first</button>
      <button type="button" style={hideMiddle ? { display: 'none' } : undefined}>
        middle
      </button>
      <button type="button">last</button>
    </div>
  )
}

/** The trap listens on document in the capture phase, so dispatch there. */
const tab = (shiftKey = false) =>
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true }),
  )

const label = () => document.activeElement?.textContent

describe('useFocusTrap', () => {
  it('moves focus in when the dialog opens', () => {
    render(<Dialog active />)
    expect(label()).toBe('first')
  })

  it('leaves focus alone while closed', () => {
    render(<Dialog active={false} />)
    expect(document.activeElement).toBe(document.body)
  })

  it('wraps forward from the last control to the first', () => {
    const { getByText } = render(<Dialog active />)
    ;(getByText('last') as HTMLButtonElement).focus()

    tab()
    expect(label()).toBe('first')
  })

  it('wraps backward from the first control to the last', () => {
    render(<Dialog active />)
    expect(label()).toBe('first')

    tab(true)
    expect(label()).toBe('last')
  })

  it('does not hijack a Tab in the middle of the dialog', () => {
    const { getByText } = render(<Dialog active />)
    ;(getByText('middle') as HTMLButtonElement).focus()

    tab()
    // Not redirected — the browser's own tab order takes it from here.
    expect(label()).toBe('middle')
  })

  it('skips controls that are not rendered', () => {
    const { getByText } = render(<Dialog active hideMiddle />)
    ;(getByText('last') as HTMLButtonElement).focus()

    tab()
    expect(label()).toBe('first')
    tab(true)
    expect(label()).toBe('last')
  })

  it('pulls focus back in if it escapes', () => {
    const outside = document.createElement('button')
    document.body.append(outside)
    render(<Dialog active />)

    outside.focus()
    tab()
    expect(label()).toBe('first')

    outside.remove()
  })

  it('returns focus to the trigger when the dialog closes', () => {
    const trigger = document.createElement('button')
    trigger.textContent = 'open'
    document.body.append(trigger)
    trigger.focus()

    const { rerender } = render(<Dialog active />)
    expect(label()).toBe('first')

    rerender(<Dialog active={false} />)
    expect(label()).toBe('open')

    trigger.remove()
  })
})
