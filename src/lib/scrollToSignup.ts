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

  // Focus after the scroll settles, otherwise the browser jumps straight to the field.
  window.setTimeout(() => input?.focus({ preventScroll: true }), reduced ? 0 : 600)
}
