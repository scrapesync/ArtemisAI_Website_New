import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { THEME_KEY, applyTheme, setTheme, useTheme } from './useTheme'

function Probe() {
  const [theme, toggle] = useTheme()
  return (
    <button type="button" onClick={toggle} aria-pressed={theme === 'light'}>
      {theme}
    </button>
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.colorScheme = ''
  document.head.innerHTML = '<meta name="theme-color" content="#000000">'
})
afterEach(() => vi.useRealTimers())

const metaColor = () =>
  document.querySelector('meta[name="theme-color"]')?.getAttribute('content')

describe('useTheme', () => {
  it('starts dark, because that is the theme the page was designed in', () => {
    const { container } = render(<Probe />)
    expect(container.textContent).toBe('dark')
  })

  it('toggles to light and back', () => {
    const { container, getByRole } = render(<Probe />)

    act(() => getByRole('button').click())
    expect(container.textContent).toBe('light')

    act(() => getByRole('button').click())
    expect(container.textContent).toBe('dark')
  })

  it('persists the choice', () => {
    const { getByRole } = render(<Probe />)
    act(() => getByRole('button').click())
    expect(localStorage.getItem(THEME_KEY)).toBe('light')
  })

  it('reads an existing choice on first render', () => {
    localStorage.setItem(THEME_KEY, 'light')
    const { container } = render(<Probe />)
    expect(container.textContent).toBe('light')
  })

  it('falls back to dark on a value it does not recognise', () => {
    // A hand-edited or half-written storage value must not take the page somewhere undefined.
    localStorage.setItem(THEME_KEY, 'chartreuse')
    const { container } = render(<Probe />)
    expect(container.textContent).toBe('dark')
  })

  it('survives localStorage throwing, as it does in some privacy modes', () => {
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('denied')
    })

    const { container, getByRole } = render(<Probe />)
    expect(container.textContent).toBe('dark')
    // The switch still works for this page view; it just cannot be remembered.
    expect(() => act(() => getByRole('button').click())).not.toThrow()

    getItem.mockRestore()
    setItem.mockRestore()
  })

  it('follows a switch made in another tab', () => {
    const { container } = render(<Probe />)
    expect(container.textContent).toBe('dark')

    act(() => {
      localStorage.setItem(THEME_KEY, 'light')
      window.dispatchEvent(new StorageEvent('storage', { key: THEME_KEY, newValue: 'light' }))
    })
    expect(container.textContent).toBe('light')
  })

  it('ignores storage events for other keys', () => {
    const { container } = render(<Probe />)

    // Put a real theme in storage but announce a DIFFERENT key. A listener that checks the
    // key stays put; one that re-reads on any storage event at all would pick this up and
    // flip the page on an unrelated write.
    localStorage.setItem(THEME_KEY, 'light')
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'something-else', newValue: 'x' }),
      )
    })
    expect(container.textContent).toBe('dark')
  })

  it('drives the attribute, the colour scheme and the browser chrome colour', () => {
    applyTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.style.colorScheme).toBe('light')
    expect(metaColor()).toBe('#f6f3ee')

    applyTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(metaColor()).toBe('#000000')
  })

  it('eases the switch only while it is happening', () => {
    vi.useFakeTimers()
    const root = document.documentElement

    setTheme('light')
    expect(root.hasAttribute('data-theme-switching')).toBe(true)

    act(() => void vi.advanceTimersByTime(400))
    expect(root.hasAttribute('data-theme-switching')).toBe(false)
  })
})
