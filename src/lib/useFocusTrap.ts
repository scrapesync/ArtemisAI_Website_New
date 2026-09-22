import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Makes a dialog actually modal.
 *
 * `role="dialog"` and `aria-modal="true"` are a promise to assistive tech that the rest of
 * the page is unreachable while the dialog is open. Nothing enforces that on its own — so
 * without this, Tab walks straight out of the open menu and into the page behind it, where
 * the controls are invisible but still focusable.
 *
 * Moves focus in on open, keeps Tab and Shift+Tab cycling inside, and puts focus back where
 * it came from on close.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active) return
    const root = ref.current
    if (!root) return

    const previous = document.activeElement as HTMLElement | null
    const focusable = () =>
      [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed',
      )

    // Move focus in, so the next Tab continues from inside rather than from the trigger.
    focusable()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusable()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement

      // Wrap at both ends, and pull focus back in if it has escaped some other way.
      if (e.shiftKey && (current === first || !root.contains(current))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (current === last || !root.contains(current))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      // Only take focus back if it is still inside the dialog being torn down; if something
      // else has deliberately claimed it, leave it alone.
      if (!previous) return
      if (document.activeElement === document.body || root.contains(document.activeElement)) {
        previous.focus()
      }
    }
  }, [ref, active])
}
