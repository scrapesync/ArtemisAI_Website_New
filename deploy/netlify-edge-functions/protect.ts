/**
 * HTTP Basic Auth in front of everything that is not the public marketing site.
 *
 * This site publishes its whole repository root, so the admin panel, the QA dashboards, the
 * sprint trackers and the JSON data beside them are all served at guessable URLs. The existing
 * admin login only checks credentials in the browser, which hides a page rather than
 * protecting it: the HTML and the data files can still be fetched directly.
 *
 * The rule works the safe way round. Everything is protected, and the public paths are named
 * below. A page added later is private until somebody deliberately lists it, rather than
 * exposed because nobody remembered to.
 *
 * Credentials come from INTERNAL_USER and INTERNAL_PASSWORD, set in Netlify under
 * Site configuration > Environment variables. They are never committed.
 */
import type { Config } from 'https://edge.netlify.com'

const REALM = 'ArtemisAI internal'

function challenge(body: string): Response {
  return new Response(body, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
      /* Never let a 401, or a page behind one, sit in a shared cache. */
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

/* Compares in time independent of where the first difference falls, so a wrong password
   cannot be narrowed down character by character by measuring how long the reply takes. */
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder()
  const x = enc.encode(a)
  const y = enc.encode(b)
  let diff = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

export default async (request: Request): Promise<Response | undefined> => {
  const user = Netlify.env.get('INTERNAL_USER')
  const password = Netlify.env.get('INTERNAL_PASSWORD')

  /* Fail closed. A missing credential is a misconfiguration, and serving the page anyway
     would quietly leave it open, which is the exact thing this function exists to stop. */
  if (!user || !password) {
    /* Spells out that the two names are fixed keys rather than credentials to invent, and
       that a redeploy is required. An earlier version said neither, and both were got wrong
       in practice: one variable named after the person, and no rebuild afterwards. This
       message is the only guidance anyone gets at the moment it matters. */
    return challenge(
      'Internal access is not configured.\n\n' +
        'Two environment variables are missing.\n\n' +
        'INTERNAL_USER and INTERNAL_PASSWORD are the variable NAMES, spelled\n' +
        'exactly like that. Their VALUES are the username and password you\n' +
        'want to sign in with.\n\n' +
        'In Netlify: Project configuration > Environment variables > Add a\n' +
        'variable. Add both, with the same value in all deploy contexts.\n\n' +
        'Then Deploys > Trigger deploy. Netlify reads environment values at\n' +
        'deploy time, so these pages stay locked until the site rebuilds.\n',
    )
  }

  const header = request.headers.get('authorization') ?? ''
  if (!header.startsWith('Basic ')) return challenge('Authentication required.\n')

  let decoded: string
  try {
    decoded = atob(header.slice(6))
  } catch {
    return challenge('Authentication required.\n')
  }

  /* Split on the FIRST colon only: a password may legitimately contain one. */
  const split = decoded.indexOf(':')
  if (split === -1) return challenge('Authentication required.\n')

  const okUser = safeEqual(decoded.slice(0, split), user)
  const okPass = safeEqual(decoded.slice(split + 1), password)
  /* Both are evaluated before the branch, so the reply does not reveal which one was wrong. */
  if (!(okUser && okPass)) return challenge('Authentication required.\n')

  /* Returning nothing hands the request on to the file or function it was already headed for. */
  return undefined
}

export const config: Config = {
  path: '/*',
  /* The public marketing site, and nothing else. /assets/* is deliberately absent: that
     directory belongs to this repository's internal material, while the marketing build
     writes to /site-assets/. */
  excludedPath: [
    '/',
    '/index.html',
    '/privacy',
    '/privacy.html',
    '/site-assets/*',
    '/fonts/*',
    '/og.png',
    '/favicon.svg',
    '/favicon-96.png',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/robots.txt',
    '/sitemap.xml',
  ],
}
