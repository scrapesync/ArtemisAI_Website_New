# Deploying the new site to artemisai.co.uk

## First, two corrections to what I told you earlier

I was working from the new repo only, and got two things wrong:

1. **Netlify Forms is already enabled and working.** Your dashboard shows real submissions
   against a form called `pilot-waitlist`. I listed this as a launch blocker. It isn't.
2. **There is already a privacy policy.** `privacy.html` in the live repo is 37 KB with eleven
   sections covering the data controller, GDPR legal basis, retention, rights, Meta platform
   compliance and cookies, and `/privacy` already redirects to it. I said there was none. That
   was true of the new build, not of your live site.

So the privacy notice I wrote and then removed was never needed. Your legal team is updating a
page that already exists.

## What is actually set up

There are **two separate repositories**, and only one of them is connected to Netlify.

| | `artemisai_website` (private) | `ArtemisAI_Website_New` (public) |
|---|---|---|
| Deploys to | **artemisai.co.uk**, via `main` | nothing |
| Shape | flat HTML files, `publish = "."` | Vite SPA, builds to `dist/` |
| Contains | the live marketing page, `admin_panel.html`, `privacy.html`, 15 Netlify Functions, QA dashboards, sprint trackers, decks, mockups | just the new marketing page |
| Signup form | `pilot-waitlist` (name, email, location) | `trial-signup` (email only) |

The important consequence: **the admin panel and the new site live in the same Netlify site.**
`publish = "."` means the whole repo root is served, and `/api/*` routes to
`netlify/functions/`. So we cannot simply point Netlify at the new repo. That would take the
admin panel, all fifteen functions and every internal tool offline.

The new site has to be delivered *into* the existing repo. That is what keeps the admin panel
exactly as is.

## Recommended approach: preview at a subpath, then swap

Three stages, each reversible, and nothing outside the marketing page is touched at any point.

### Stage 1 — Put it live at `/v2` where nobody will find it

In `ArtemisAI_Website_New`:

```bash
npx vite build --base=/v2/
```

The `--base` matters. Without it the build asks for `/assets/...` at the domain root, which
collides with the existing `assets/` directory and 404s.

Then copy the output into the live repo and push:

```bash
mkdir -p /home/user/artemisai_website/v2
cp -r /home/user/ArtemisAI_Website_New/dist/* /home/user/artemisai_website/v2/
cd /home/user/artemisai_website
git checkout -b new-site-v2
git add v2 && git commit -m "Add the rebuilt marketing site at /v2 for review"
git push -u origin new-site-v2
```

Merging that to `main` publishes it at **artemisai.co.uk/v2**. The live home page, the admin
panel, the functions and the forms are all untouched, because nothing outside `v2/` changed.

### Stage 2 — Check it on the real domain

Worth doing here rather than locally, because this is the first time it runs on the real host:
the fonts, the theme switcher, both themes, the phone mockups, and the signup form actually
reaching Netlify.

### Stage 3 — Swap it to the root

Your repo already uses a `_v1` convention (`sprint_tracker_v1.html`, `dependency_tree_v1.html`,
`archive_v1/`), so the old page follows it rather than being deleted:

```bash
cd /home/user/artemisai_website
git mv index.html index_v1.html
```

Rebuild at the root base and copy in:

```bash
cd /home/user/ArtemisAI_Website_New && npx vite build --base=/
cp -r dist/* /home/user/artemisai_website/
```

`assets/` merges safely. The existing directory holds three items
(`playbook/`, `scan-demo.mp4`, `scan-demo.webm`) and every file Vite emits is content-hashed,
so no filename can collide.

Rolling back is `git mv index_v1.html index.html` and a push.

## Decisions I need from you

**1. Which form should the new page post to?**

The new page posts to `trial-signup`. Your live form is `pilot-waitlist`. If we ship as-is,
Netlify registers a second form, your existing submissions stay where they are, and **any
notification or automation wired to `pilot-waitlist` stops firing for new signups.** My
recommendation is to rename ours to `pilot-waitlist` so everything keeps flowing into one place.

**2. Which fields?**

Your current form asks for name, email and location. The new design has a single email field.
Fewer fields converts better; more fields qualifies better. Netlify will accept either, but
mixing them makes the export messy. Worth deciding before the swap, not after.

**3. What happens to the old page?**

Keep it at `index_v1.html`, or remove it once you are happy?

## Something separate you should know about

This is not caused by the new site, but you are about to point launch traffic at this domain.

`publish = "."` serves **every file in the repo root** at a public URL, there is no
`robots.txt`, and `admin_login.html` uses only browser storage for its login, with no
server-side check. That means the admin panel, the QA dashboards, the sprint trackers, the
threat assessment and the JSON data files sitting next to them are all directly fetchable by
anyone who knows or guesses the filename, and are indexable by search engines.

A client-side login only hides the page, it does not protect anything behind it.

Two things that would help, in order of effort:

- **A `robots.txt`** stops search engines indexing them. This is a ten-minute change and stops
  the bleeding, but it does not stop anyone who has a URL.
- **Real access control** on the internal pages: Netlify Identity with role-based redirects, or
  Netlify's password protection, or moving the internal tooling to its own site. This is the
  actual fix.

I have not looked inside any of the data files, and I would rather you decide how to handle
this than have me poke at it. Say the word and I will do the `robots.txt` as part of the
deploy, and we can scope the access control separately.

## What I would do next

1. You confirm the form name and fields, and whether to keep `index_v1.html`.
2. I make the form change in the new repo, rebuild, and open a PR to the live repo adding `/v2`.
3. You merge, we both look at artemisai.co.uk/v2.
4. When you are happy, a second small PR does the swap.

I would still fix the light-mode contrast and the accessibility blockers before stage 3, since
those are what a visitor actually hits. The logo still needs the SVG.
