# Files that belong in the live repository

This site is built here but deployed into `scrapesync/artemisai_website`, which is what Netlify
serves artemisai.co.uk from. That repository publishes its whole root and also holds the admin
panel, the internal dashboards and fifteen Netlify Functions, so it cannot simply be replaced.

Anything in this folder is **source for that repository**, kept here so it is reviewed and
versioned alongside the site it protects.

## `netlify-edge-functions/protect.ts`

Copy to `netlify/edge-functions/protect.ts` in the live repository.

Puts HTTP Basic Auth in front of every path except the public marketing site. It needs no
`netlify.toml` change, because a Netlify edge function declares its own routing in the exported
`config` at the bottom of the file.

**It fails closed.** With `INTERNAL_USER` and `INTERNAL_PASSWORD` unset it locks everything and
returns a message saying so, rather than serving the pages unprotected. Set both in Netlify
under Site configuration > Environment variables *before* deploying it, or the internal tooling
goes dark until you do.

The allowlist is the safe way round: everything is protected and the public paths are named, so
a page added later is private by default rather than exposed by an oversight.

Note that `/assets/*` is deliberately **not** public. That directory belongs to the live
repository's internal material (`assets/playbook/`), which is why this site's build writes to
`/site-assets/` instead — see `assetsDir` in `vite.config.ts`.

## `netlify-edge-functions/protect.test.mjs`

Covers the auth logic: unset credentials, a missing or non-Basic header, malformed base64, a
value with no colon, a wrong username, a wrong password, an empty password, a correct login,
and a password containing colons. It also asserts the 401 carries a real `WWW-Authenticate`
challenge, without which no browser would ever prompt, and `Cache-Control: no-store`.

Run it after transpiling the TypeScript, since the handler reads `Netlify.env`:

```bash
npx esbuild deploy/netlify-edge-functions/protect.ts --format=esm --outfile=/tmp/protect.mjs
# strip the remote type import and the config export, then:
node deploy/netlify-edge-functions/protect.test.mjs
```
