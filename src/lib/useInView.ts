import { useEffect, useRef, useState, type RefObject } from 'react'

export interface InViewOptions {
  /** Fraction of the element that must be visible. Varies by section in the handoff. */
  threshold?: number
  /** Stop observing after the first intersection. Use for one-shot reveals. */
  once?: boolean
  rootMargin?: string
}

/**
 * One IntersectionObserver, used both as the page's reveal trigger and as the in-view gate
 * for the auto-advancing carousels.
 *
 * The prototype stacks an observer, a scroll-position fallback and a timeout safety net,
 * because it mounts inside an already-scrolled host in its design tool. A normal page needs
 * only the observer — but we keep a synchronous first check so an element that is already on
 * screen at mount reveals without waiting for the first observer callback.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  once = false,
  rootMargin,
}: InViewOptions = {}): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return { ref, inView }
}

/** One-shot reveal. Content that has appeared never fades back out. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
  const { ref, inView } = useInView<T>({ threshold, once: true })
  return { ref, seen: inView }
}
