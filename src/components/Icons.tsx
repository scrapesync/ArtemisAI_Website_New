/**
 * The site's inline icon set.
 *
 * Every glyph here is single-path (or two), on a 24×24 viewBox, stroked at 1.8–2.4 with round
 * caps and joins. The handoff calls that consistency deliberate — keep it when adding icons.
 * Path data is lifted verbatim from the prototype markup.
 */
import type { SVGProps } from 'react'

/* SVGAttributes declares `size` and `strokeWidth` as `number | string`. Narrow both, so an
   icon takes one edge length and one stroke weight rather than a union nobody wants. */
type IconProps = Omit<SVGProps<SVGSVGElement>, 'size' | 'strokeWidth'> & { size?: number }

function Icon({ size = 24, strokeWidth = 2, ...rest }: IconProps & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    />
  )
}

/** The Artemis roundel: the wordmark's glyph, and the whole brand identity for now. */
export function ArtemisMark({ size = 18, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={1.8} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3.6 9h16.8" />
    </Icon>
  )
}

/** The Art E avatar glyph — a struck triangle with a weight at its centre of mass. */
export function ArtemisGlyph({ size = 16, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3.6 9h16.8" />
    </Icon>
  )
}

/** The mark used inside product chrome (notification icon, connect hub): triangle + dot. */
export function ArtemisTriangle({ size = 14, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d="M12 5.3L17.4 18.7H6.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.4" r="2" fill="currentColor" />
    </svg>
  )
}

export function CloseIcon({ size = 18, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <path d="M5 5l14 14M19 5L5 19" />
    </Icon>
  )
}

export function MenuIcon({ size = 16, ...rest }: IconProps) {
  return (
    <Icon size={size} {...rest}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Icon>
  )
}

export function ArrowLeftIcon({ size = 14, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <path d="M15 5l-7 7 7 7" />
    </Icon>
  )
}

export function ArrowRightIcon({ size = 14, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <path d="M9 5l7 7-7 7" />
    </Icon>
  )
}

export function ArrowUpIcon({ size = 14, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.6} {...rest}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </Icon>
  )
}

/** The narrow chevron that ends every card header. Authored on a 10×16 box, not 24×24. */
export function ChevronIcon({ size = 10, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 10 16"
      width={size}
      height={size * 1.6}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M2 2l6 6-6 6" />
    </svg>
  )
}

export function CheckIcon({ size = 11, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={3} {...rest}>
      <path d="M4 12.5l5.2 5.2L20 6.9" />
    </Icon>
  )
}

export function ClockIcon({ size = 16, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  )
}

export function TrendUpIcon({ size = 16, ...rest }: IconProps) {
  return (
    <Icon size={size} {...rest}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </Icon>
  )
}

export function BellIcon({ size = 16, ...rest }: IconProps) {
  return (
    <Icon size={size} {...rest}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </Icon>
  )
}

export function SearchIcon({ size = 15, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={2.2} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </Icon>
  )
}
