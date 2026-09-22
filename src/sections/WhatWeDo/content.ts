/** Copy and data for "What we do". Verbatim from the handoff — do not rewrite. */

export const TABS = [
  {
    index: '01',
    title: 'Catch the storm',
    sentence:
      'When comments spike, Artemis catches it inside twenty minutes and drafts a calm reply in your voice.',
  },
  {
    index: '02',
    title: 'Find the window',
    sentence:
      'Two years of your posts, read every minute. Artemis names the hour your audience shows up.',
  },
  {
    index: '03',
    title: 'Score the draft',
    sentence:
      'Every draft gets a score before it goes out, and the one change that lifts it. No more guessing.',
  },
] as const

export const REPLIES = [
  "Thanks all — we're open till 8pm from Monday. Same kitchen, longer evenings.",
  'Yes, open on the bank holiday — 12 till 8. Come hungry.',
  "Weekdays stay 6pm this week, then 8pm from Monday. We'll remind you.",
] as const

/** Comment volume, 6:20pm → 6:50pm. The storm is the climb at the right. */
export const STORM_AREA =
  'M0,140 L60,136 L120,138 L180,130 L240,124 L300,110 L360,86 L420,50 L480,22 L560,6 L560,150 L0,150Z'
export const STORM_LINE =
  'M0,140 L60,136 L120,138 L180,130 L240,124 L300,110 L360,86 L420,50 L480,22 L560,6'

/**
 * Engagement by day, four bands deep. Seven columns × four rows — the README calls this
 * "7×3", but that is the mobile deck card; the desktop grid is 28 cells.
 * The winning slot is row 4, Tuesday.
 */
export const HEATMAP: number[][] = [
  [0.1, 0.14, 0.1, 0.12, 0.16, 0.22, 0.16],
  [0.16, 0.22, 0.18, 0.16, 0.26, 0.32, 0.24],
  [0.22, 0.26, 0.22, 0.24, 0.3, 0.34, 0.28],
  [0.28, 0.62, 0.3, 0.26, 0.34, 0.38, 0.3],
]

export const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const

export const SCORE_TRACKS = [
  { label: 'Hook', value: 82, dim: false },
  { label: 'Length', value: 64, dim: true },
  { label: 'Timing', value: 91, dim: false },
] as const

export const DRAFT_TEXT =
  "Spring hours are back. Open till 8pm from Monday — same kitchen, longer evenings. Come and see what we've done with the place, we think you'll like it."
