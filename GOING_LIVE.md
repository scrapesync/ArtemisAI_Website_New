# Going live: the simple version

## Where things stand

Everything technical is done and tested. The new site is built, the signup form is wired to
your existing `pilot-waitlist` form, and I have staged the exact change against your live
repository.

**I am blocked on one thing: I do not have permission to write to your live repository.**
I asked for it and the request was denied, which is the system working as intended. You have to
grant it. Nothing below can happen until you do.

## What the change actually is

35 files. **Nothing is deleted.** One file is modified: `index.html`, your home page.

Everything else is new files being added alongside what is already there: the page's images,
fonts, icons, and a `robots.txt`.

I checked each of these individually and they are **untouched**:

- `admin_panel.html` and `admin_login.html` — the admin panel stays exactly as is
- `privacy.html` — your existing privacy policy
- `netlify.toml` — your redirects and function routing
- all 15 files in `netlify/functions/` — zero changes
- `data_explorer.html`, `qa_dashboard.html`, and the rest of the internal tooling

## What happens next, step by step

**Step 1 — Set the two environment variables** described under "Your internal pages are now
locked" below. Do this first, otherwise merging locks you out of your own admin panel.

**Step 2 — You give me access.** Ask me to retry, and approve the permission prompt when it
appears.

**Step 3 — I open a Pull Request.** This is GitHub's "here is a proposed change" feature.
Opening one changes nothing on your live site. Your current page stays exactly as it is.

**Step 4 — Netlify builds a preview.** It automatically builds any Pull Request at its own
temporary web address and posts the link on the PR. Your live site is untouched. Netlify says
this itself on your dashboard: *"The agent publishes changes in a Preview, your live site won't
change."*

**Step 5 — You look at the preview.** I will send you the link. Worth checking:

- The page looks right, and the light/dark switcher in the top right works
- Your admin panel asks for the username and password, and lets you in with them
- The signup form accepts an email and shows the confirmation

**Step 6 — You click Merge.** One green button on the Pull Request page. Netlify redeploys
automatically and the new page is live on artemisai.co.uk within a minute or two.

If you do not like it at step 5, click Close instead and nothing ever reaches your live site.

## If something looks wrong after it goes live

Your old page is not gone. It stays in the repository's history, so getting it back is one
change that I can make in a couple of minutes. You will not lose it.

## Two things that are worth knowing before you press Merge

**Your signup form changes shape.** It currently asks for name, email and location. The new one
asks for email only, which is what you chose. Submissions still land in the same
`pilot-waitlist` list alongside the ones you already have, so nothing is lost and any existing
notification keeps working. New entries will simply have an email and no name or location.

**Your internal pages are now locked.** You asked for this, and it is included.

Everything except the public marketing page now sits behind a username and password, checked on
Netlify's servers before anything is sent to the browser. That covers the admin panel, the QA
dashboards, the sprint trackers, the JSON data files, `/api/*` and `assets/playbook/`. The old
admin login only checked things in the browser, which hides a page rather than protecting it:
the HTML and data could still be fetched directly. This cannot be.

**You must do one thing before merging, or your own tooling locks you out.** In Netlify, go to
Site configuration > Environment variables and add two:

| Name | Value |
|---|---|
| `INTERNAL_USER` | a username you choose |
| `INTERNAL_PASSWORD` | a strong password you choose |

I cannot set these for you, and they are deliberately not in the code. If they are missing the
lock stays shut and shows a message explaining what to set, because a security control that
silently lets everyone through when misconfigured is worse than none.

After that, opening any internal page asks for that username and password once per browser
session. Everyone on the team uses the same pair, so share it however you normally share a
password. I checked first that no GitHub Action calls the site over HTTP, so the nightly jobs
are unaffected.

## Still outstanding on the site itself

None of these stop you going live, but you should know they are there:

- **The logo is still wrong** everywhere, including the icon that shows in a browser tab and
  the image that appears when the site is shared. Waiting on the SVG from you.
- **Light mode has a contrast failure** on the Collabs reach badge, and some accessibility
  issues in the FAQ and the tab strips.
- **The fonts ship 16 files where 4 would do**, about 350 KB of waste on every first visit.

My honest recommendation: go live, then fix these in that order. None is severe enough to
justify delaying, and the site is better than what is there now.
