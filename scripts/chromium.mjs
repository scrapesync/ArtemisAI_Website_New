import { existsSync } from 'node:fs'

/**
 * This container ships a Chromium that Playwright's own resolver does not find, so the scripts
 * have to be pointed at it explicitly. A CI runner installs its own matching build instead, and
 * there the pinned path does not exist — so fall through to Playwright's resolution rather than
 * failing with a missing executable.
 */
const PINNED = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

export const launchOptions = () => (existsSync(PINNED) ? { executablePath: PINNED } : {})
