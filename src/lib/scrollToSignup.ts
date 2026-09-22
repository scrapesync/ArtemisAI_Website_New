import { SIGNUP_ANCHOR } from './constants'

/**
 * Every CTA on the page ("Join 14-day free trial", "Connect now") routes to the single
 * conversion action: the email capture in the closing block. Scrolls it into view and moves
 * focus into the input, so keyboard and screen-reader users land where sighted users look.
 */
export function scrollToSignup(): void {
  const form = document.getElementById(SIGNUP_ANCHOR)
  const input = form?.querySelector<HTMLInputElement>('input[type="email"]')
  if (!form) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })

  if (reduced) {
    input?.focus({ preventScroll: true })
    return
  }

  // Focus once the scroll has actually finished. A fixed delay either fires while the page
  // is still moving — which a screen reader announces before the visitor has arrived — or
  // waits longer than it needs to. `scrollend` knows; the timeout is the fallback for
  // browsers that do not have it yet.
  let done = false
  const settle = () => {
    if (done) return
    done = true
    window.removeEventListener('scrollend', settle)
    window.clearTimeout(fallback)
    input?.focus({ preventScroll: true })
  }
  const fallback = window.setTimeout(settle, 1200)
  window.addEventListener('scrollend', settle, { once: true })
}
