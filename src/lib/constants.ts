/** The site's one conversion action. Every CTA on the page routes here. */
export const SIGNUP_ANCHOR = 'trial-signup'

/* The Netlify form these submissions join. Deliberately the name the live site already uses:
   Netlify keys submissions and notifications by form name, so posting to a new one would
   start a second, empty stream and silently stop any existing alert from firing.
   Must stay identical to the static twin's name in index.html. */
export const NETLIFY_FORM = 'pilot-waitlist'

/** Copy that appears in more than one place.

    CTA_LABEL is no longer the handoff's wording. The beta is free from 15 December until the
    main launch, so there is no trial to offer; this matches what the live site already says. */
export const CTA_LABEL = 'Join the free beta'
export const CONNECT_LABEL = 'Connect now'

/* The team's way in to the admin panel, which lives in the repository this site deploys into
   rather than in this one. A real destination, unlike the entries in PENDING_LINKS. */
export const TEAM_LINK = { href: '/admin_login.html', label: 'Team login' } as const

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
  name: 'ArtemisAI',
  legalName: 'ArtemisAI Ltd',
  url: 'https://artemisai.co.uk',
  title: 'ArtemisAI · Change the way you build on social media',
  description:
    'ArtemisAI watches your pages every minute and tells you what to reply, when to post, and whether a draft will land. Read from two years of your own history, not an industry average.',
} as const
