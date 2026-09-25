import type { ReactNode } from 'react'
import cafe690 from '../../assets/photos/belief-cafe-690.jpg'
import cafe690w from '../../assets/photos/belief-cafe-690.webp'
import cafe1380w from '../../assets/photos/belief-cafe-1380.webp'
import thumb690 from '../../assets/photos/belief-thumb-690.jpg'
import thumb690w from '../../assets/photos/belief-thumb-690.webp'
import thumb1380w from '../../assets/photos/belief-thumb-1380.webp'
import owners690 from '../../assets/photos/belief-owners-690.jpg'
import owners690w from '../../assets/photos/belief-owners-690.webp'
import owners1380w from '../../assets/photos/belief-owners-1380.webp'

export interface BeliefCard {
  photo: { webp: string; webp2x: string; jpg: string; alt: string }
  caption: ReactNode
}

/**
 * Photography is placeholder stock from the handoff and must be replaced before launch —
 * see docs/design-handoff/README.md, "Assets".
 */
export const CARDS: BeliefCard[] = [
  {
    photo: {
      webp: cafe690w,
      webp2x: cafe1380w,
      jpg: cafe690,
      alt: 'A café owner on her phone behind the counter',
    },
    caption: (
      <>
        <b>Same tools, any size.</b> A café with 1,200 followers gets the same read of its
        comments as a brand with a team behind it. The only difference is who&rsquo;s holding
        the phone.
      </>
    ),
  },
  {
    photo: {
      webp: thumb690w,
      webp2x: thumb1380w,
      jpg: thumb690,
      alt: 'A thumb hovering over a phone screen, about to tap',
    },
    caption: (
      <>
        <b>You always decide.</b> Artemis drafts, scores and suggests. It never posts. Every
        reply and every post waits for you to say so.
      </>
    ),
  },
  {
    photo: {
      webp: owners690w,
      webp2x: owners1380w,
      jpg: owners690,
      alt: 'Two local business owners together, laughing',
    },
    caption: (
      <>
        <b>Opportunities should find you.</b> Other pages already reach people you never will.
        Artemis finds them and makes the introduction, so you&rsquo;re not the one hunting.
      </>
    ),
  },
]
