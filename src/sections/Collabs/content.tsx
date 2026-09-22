import type { ReactNode } from 'react'

export interface Identity {
  monogram: string
  name: string
  /** The bold fragment is the follower count. */
  meta: ReactNode
  chip: string
  /** Steers the placeholder panel's tone; replaced when real photography lands. */
  tone: string
}

export interface Match {
  identity: Identity
  /** New people reached — never an overlap percentage. See the content rule below. */
  reach: string
  caption: { why: string; reach: string; together: string }
}

export const YOU: Identity = {
  monogram: 'CE',
  name: 'Corner Eatery',
  meta: (
    <>
      you · café · <em>1,240</em> followers
    </>
  ),
  chip: 'You',
  tone: '#2b2118',
}

/**
 * CONTENT RULE (from the handoff's CLAUDE.md, non-negotiable):
 * the badge always shows *new people reached*, never an audience-overlap percentage and
 * never "follow both". The pitch is incremental reach. The words "swap", "overlap" and
 * "follow both" were removed from the whole site on purpose — do not reintroduce them.
 */
export const MATCHES: Match[] = [
  {
    identity: {
      monogram: 'SM',
      name: 'Saturday Market',
      meta: (
        <>
          Community page · <em>5.8k</em> followers
        </>
      ),
      chip: 'Every other Saturday',
      tone: '#1d2a20',
    },
    reach: '+4,300',
    caption: {
      why: 'Their crowd is on your street every other Saturday, and most of them have never been in.',
      reach: '4,300 new people, the kind who already respond to local food.',
      together:
        'A market-day special: they post the stall map, you post the deal. They get somewhere to send people at 1pm; you get a queue.',
    },
  },
  {
    identity: {
      monogram: 'TA',
      name: 'Tom Ashby',
      meta: (
        <>
          Creator · <em>24k</em> followers
        </>
      ),
      chip: 'Films local spots',
      tone: '#241f2c',
    },
    reach: '+9,100',
    caption: {
      why: 'He films small businesses for people who live here. He hasn’t filmed yours.',
      reach: '9,100 new people who watch his videos to decide where to go next.',
      together:
        'One morning behind your counter: he gets a story, you host his followers for breakfast. He gets the access; you get his Saturday audience.',
    },
  },
  {
    identity: {
      monogram: 'HF',
      name: 'Hollow Lane Florist',
      meta: (
        <>
          Florist · <em>5.4k</em> followers
        </>
      ),
      chip: 'Same block',
      tone: '#2a1d24',
    },
    reach: '+2,600',
    caption: {
      why: 'Their Friday bouquet drop lands at your busiest hour, one block away.',
      reach: '2,600 new people who already buy something nice on a Friday.',
      together:
        'Table flowers from them, a mention from you. They get a standing order; you get a room that photographs well.',
    },
  },
]
