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

/**
 * The Artemis mark: a rounded square holding a struck triangle with a weight at its centre.
 *
 * Geometry is the brand SVG verbatim, on its own 36x36 grid rather than the icon set's 24, so
 * the numbers can be checked against the source file without rescaling arithmetic in the way.
 *
 * Drawn in currentColor rather than the brand gradient. The brand set ships flat black and
 * flat white variants alongside the gradient one, so a single-colour mark is the designer's
 * intent, not a compromise; and one colour is what lets the same glyph serve both themes and
 * sit on a mint fill without a second asset.
 */
export function ArtemisMark({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <rect x="2" y="2" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="2" />
      <path d="M18 8L26 28H10L18 8Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="20" r="3" fill="currentColor" />
    </svg>
  )
}

/**
 * The mark without its frame, for the small sizes: chat avatars, notification badges, the
 * connect hub. Those already sit inside a circle or a tinted chip, so the frame would read as
 * a second border, and below about 16px its 2px stroke closes up into a solid blob.
 *
 * Same triangle and dot as ArtemisMark, on a viewBox cropped to their painted bounds so the
 * glyph fills the space it is given. The top of that box allows for the apex's miter, which
 * overshoots the 8 in the path data by just over 2 units.
 */
export function ArtemisGlyph({ size = 16, ...rest }: IconProps) {
  return (
    <svg
      viewBox="6.2 5.6 23.6 23.6"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M18 8L26 28H10L18 8Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="20" r="3" fill="currentColor" />
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

/** Shown while the page is dark: pressing it goes light. */
export function MoonIcon({ size = 24, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={1.9} {...rest}>
      <path d="M20.8 13.4A8.4 8.4 0 1 1 10.6 3.2a6.6 6.6 0 0 0 10.2 10.2Z" />
    </Icon>
  )
}

/** Shown while the page is light: pressing it goes dark. */
export function SunIcon({ size = 24, ...rest }: IconProps) {
  return (
    <Icon size={size} strokeWidth={1.9} {...rest}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M6.5 6.5 4.9 4.9M19.1 19.1l-1.6-1.6M17.5 6.5l1.6-1.6M4.9 19.1l1.6-1.6" />
    </Icon>
  )
}
