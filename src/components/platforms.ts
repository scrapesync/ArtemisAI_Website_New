/** Platform identities: the marks' names and their true brand colours.

Kept apart from the component so `PlatformMark.tsx` exports only a component — which is what
React Fast Refresh needs to hot-swap it cleanly. */
export type Platform = 'meta' | 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'x'

/** True brand colours, from tokens/colors.css. */
export const PLATFORM_COLOR: Record<Platform, string> = {
  meta: 'var(--brand-meta)',
  facebook: 'var(--brand-facebook)',
  instagram: 'var(--brand-instagram)',
  tiktok: 'var(--brand-tiktok)',
  youtube: 'var(--brand-youtube)',
  x: 'var(--brand-x)',
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  meta: 'Meta',
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
}
