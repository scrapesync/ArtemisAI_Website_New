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

**Step 1 — You give me access.** Ask me to retry, and approve the permission prompt when it
appears. That is the only technical thing you need to do.

**Step 2 — I open a Pull Request.** This is GitHub's "here is a proposed change" feature.
Opening one changes nothing on your live site. Your current page stays exactly as it is.

**Step 3 — Netlify builds a preview.** It automatically builds any Pull Request at its own
temporary web address and posts the link on the PR. Your live site is untouched. Netlify says
this itself on your dashboard: *"The agent publishes changes in a Preview, your live site won't
change."*

**Step 4 — You look at the preview.** I will send you the link. Worth checking:

- The page looks right, and the light/dark switcher in the top right works
- Your admin panel still loads
- The signup form accepts an email and shows the confirmation

**Step 5 — You click Merge.** One green button on the Pull Request page. Netlify redeploys
automatically and the new page is live on artemisai.co.uk within a minute or two.

If you do not like it at step 4, click Close instead and nothing ever reaches your live site.

## If something looks wrong after it goes live

Your old page is not gone. It stays in the repository's history, so getting it back is one
change that I can make in a couple of minutes. You will not lose it.

## Two things that are worth knowing before you press Merge

**Your signup form changes shape.** It currently asks for name, email and location. The new one
asks for email only, which is what you chose. Submissions still land in the same
`pilot-waitlist` list alongside the ones you already have, so nothing is lost and any existing
notification keeps working. New entries will simply have an email and no name or location.

**Your internal pages are publicly reachable.** This is not caused by this change, and it is
worth saying plainly before you send launch traffic at the domain. Netlify serves every file in
your repository root, so `admin_panel.html`, the QA dashboards, the sprint trackers and the
data files next to them can be opened by anyone who knows the address. The admin login only
checks things in the browser, which hides the page rather than protecting it.

The `robots.txt` I am adding asks search engines not to index any of them, and that is a real
improvement on having none at all. But it does not stop anyone who has a link. Properly fixing
it means real login protection on those pages, which is a separate piece of work I would rather
scope with you than rush in alongside a launch.

## Still outstanding on the site itself

None of these stop you going live, but you should know they are there:

- **The logo is still wrong** everywhere, including the icon that shows in a browser tab and
  the image that appears when the site is shared. Waiting on the SVG from you.
- **Light mode has a contrast failure** on the Collabs reach badge, and some accessibility
  issues in the FAQ and the tab strips.
- **The fonts ship 16 files where 4 would do**, about 350 KB of waste on every first visit.

My honest recommendation: go live, then fix these in that order. None is severe enough to
justify delaying, and the site is better than what is there now.
