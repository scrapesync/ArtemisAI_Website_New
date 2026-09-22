import { useEffect, useState } from 'react'

/**
 * True once the page has scrolled past `offset`. Drives the sticky mobile CTA, which the
 * prototype toggled by reaching for `document.querySelector` and mutating a class directly.
 */
export function useScrolledPast(offset: number): boolean {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      setPast(window.scrollY > offset)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [offset])

  return past
}
