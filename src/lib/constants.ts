/** The site's one conversion action. Every CTA on the page routes here. */
export const SIGNUP_ANCHOR = 'trial-signup'

/* The Netlify form these submissions join. Deliberately the name the live site already uses:
   Netlify keys submissions and notifications by form name, so posting to a new one would
   start a second, empty stream and silently stop any existing alert from firing.
   Must stay identical to the static twin's name in index.html. */
export const NETLIFY_FORM = 'pilot-waitlist'

/** Copy that appears in more than one place. Verbatim from the handoff — do not rewrite. */
export const CTA_LABEL = 'Join 14-day free trial'
export const CONNECT_LABEL = 'Connect now'

export const NAV_LINKS = [
  { href: '#what', label: 'What' },
  { href: '#why', label: 'Why' },
  { href: '#how', label: 'How' },
  { href: '#collabs', label: 'Collabs' },
  { href: '#connect', label: 'Connect' },
  { href: '#faq', label: 'FAQ' },
] as const

export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'x'

/**
 * Destinations that do not exist yet.
 *
 * The prototype points all of these at `#` / `#0`. They are rendered, styled and announced
 * but inert, and collected here so wiring them up later is a single edit. Replace a `null`
 * with a URL and the component renders a real link instead of a placeholder.
 *
 * Typed as `string | null` rather than inferred, so the real-link branch stays live code.
 */
export const PENDING_LINKS: {
  social: Record<SocialPlatform, string | null>
  company: Record<'about' | 'careers', string | null>
  legal: Record<'privacy' | 'terms', string | null>
} = {
  social: {
    facebook: null,
    instagram: null,
    tiktok: null,
    youtube: null,
    x: null,
  },
  company: {
    about: null,
    careers: null,
  },
  legal: {
    privacy: null,
    terms: null,
  },
}

export const CONTACT_EMAIL = 'hello@artemisai.co.uk'

export const SITE = {
  name: 'Artemis',
  legalName: 'ArtemisAI Ltd',
  url: 'https://artemisai.co.uk',
  title: 'Artemis · Change the way you build on social media',
  description:
    'Artemis watches your pages every minute and tells you what to reply, when to post, and whether a draft will land. Read from two years of your own history, not an industry average.',
} as const
