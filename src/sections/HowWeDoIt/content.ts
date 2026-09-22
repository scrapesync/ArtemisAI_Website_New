/** Copy and data for "How we do it". Verbatim from the prototype markup. */

/** The fanned stack the flying chips peel off. */
export const DECK_CHIPS = [
  { left: 36, top: 266, handle: '@rob.h', text: 'is the garden open?' },
  { left: 35, top: 262, handle: '@mia.l', text: 'open Sunday?' },
  { left: 34, top: 258, handle: '@ben.w', text: 'best pizza in town' },
  { left: 33, top: 254, handle: '@zoe.c', text: 'open tonight?' },
  { left: 32, top: 250, handle: '@ali.r', text: 'do you take bookings?' },
  { left: 31, top: 246, handle: '@finn.o', text: 'what time do you shut?' },
] as const

/** Ten comments flying into the cube, 0.27s apart. */
export const FLYING_CHIPS = [
  { handle: '@sarah.m', text: 'what time do you shut tonight?' },
  { handle: '@tomk', text: 'open on the bank holiday?' },
  { handle: '@dan.cooks', text: 'love the new menu' },
  { handle: '@priya.k', text: 'doing Sunday roast?' },
  { handle: '@jay.edits', text: 'what time do you close?' },
  { handle: '@lena.runs', text: 'booked for Friday!' },
  { handle: '@marcus.t', text: 'is parking free after 6?' },
  { handle: '@ella.paints', text: 'open Monday?' },
  { handle: '@amara.s', text: 'closing time?' },
  { handle: '@kai.moves', text: 'can we bring the dog?' },
] as const

/**
 * The five analysis keys.
 *
 * NOTE: the handoff README calls the fifth one "Urgency"; the prototype markup says
 * "Toxicity", in both this row and the section's sub-line. The markup wins — flagged rather
 * than silently reconciled, per the brief.
 */
export const KEYS = ['Sentiment', 'Emotion', 'Topic', 'Intent', 'Toxicity'] as const

/** The mobile variant: three questions, each with its answer and provenance. */
export const MOBILE_QA = [
  {
    question: 'What do I reply?',
    answer: ['118', ' of tonight’s 142 comments ask the same thing. One reply covers them all.'],
    source:
      'Every comment on tonight’s post, read for sentiment, emotion, topic, intent and toxicity — plus two years of your own replies for the voice.',
    progress: 83,
    footnote: '118 of 142 matched',
  },
  {
    question: 'When should I post?',
    answer: ['7:40pm', '3.1×'],
    source:
      'Two years of your posts and when your people actually turned up for them. Not an industry average.',
    progress: 100,
    footnote: '104 weeks of your own posts',
  },
  {
    question: 'Will this draft land?',
    answer: ['78', '85'],
    source:
      'The draft against everything of yours that landed before it, scored line by line before it goes out.',
    progress: 78,
    footnote: 'Hook 82 · Length 64 · Timing 91',
  },
] as const

/**
 * The cube: 5 × 5 × 5 = 125 dots on a 46px pitch.
 * Twenty are "your usual Tuesday"; the other 105 are tonight's flood.
 */
export const CUBE_AXIS = [-92, -46, 0, 46, 92] as const

const USUAL = new Set([
  '-92,-92,-92', '-92,-92,-46', '-92,92,-46', '-92,92,46', '-46,-92,0',
  '-46,-46,-92', '-46,0,-46', '0,-92,46', '0,0,-92', '0,0,-46',
  '0,0,92', '0,46,-92', '0,46,0', '46,-46,-46', '46,0,46',
  '92,-92,-92', '92,-92,-46', '92,-92,46', '92,-46,0', '92,92,46',
])

export interface CubeCell {
  x: number
  y: number
  z: number
  usual: boolean
  /** Diagonal wave: 0.00s at the near corner to 1.20s at the far one. */
  delay: number
}

export const CUBE_CELLS: CubeCell[] = CUBE_AXIS.flatMap((x, xi) =>
  CUBE_AXIS.flatMap((y, yi) =>
    CUBE_AXIS.map((z, zi) => ({
      x,
      y,
      z,
      usual: USUAL.has(`${x},${y},${z}`),
      delay: (xi + yi + zi) * 0.1,
    })),
  ),
)
