# Handoff: Artemis v3 marketing site

## Overview

A one-page marketing site for **Artemis**, an AI assistant that watches a small business's social pages and tells the owner three things: what to reply, when to post, and whether a draft will land. The audience is owner-operators (cafés, studios, local services) who run their own pages and don't have a social team.

The page is a single scroll of seven sections. Its job is to move a visitor from "what is this" to "start the 14-day free trial" without a pricing page, a demo booking, or a second route. Every section carries a live-feeling proof artefact (a phone screen, a chart, a drafted reply) rather than a stock illustration, because the product's credibility rests on the claim that the numbers come from the user's own history.

There is also a companion **mobile preview** page: the same site rendered inside a phone frame at 360/390/430px, used for reviewing the responsive treatment on a desktop screen.

## About the design files

The files in `design/` are **design references created in HTML** — working prototypes that show intended look, copy, and behaviour. They are **not production code to copy directly**.

They are authored in a bespoke runtime (`support.js` + `<x-dc>` custom elements) that exists only in the design tool they came from. It streams markup and re-renders from a small logic class. None of that belongs in a real app.

**The task is to recreate these designs in the target codebase's own environment** — React/Next, Vue, Svelte, Astro, whatever is already there — using its established component patterns, styling approach, and libraries. If no codebase exists yet, pick the framework that suits a marketing site with heavy scroll-driven animation (a static-first framework like Astro or Next in static-export mode is a good fit — the page has no server-rendered data and no auth) and implement there.

Read the HTML for structure, exact values, and copy. Lift the numbers. Do not port the runtime.

Open `reference/artemis-website.html` and `reference/artemis-mobile.html` in a browser to see the finished designs behave — these are self-contained single-file builds with all images and fonts embedded, no server needed.

## Fidelity

**High-fidelity.** Colours, typography, spacing, radii, motion timings, and copy are final. The UI should be recreated closely. Numbers in the mock data (142 comments, 7:40pm, score 78, +4,300 new people) are intentional and part of the narrative — keep them unless product supplies real ones.

Two known open items, flagged at the end of this document, are not blockers.

---

## Design tokens

Token files are in `tokens/` as plain CSS custom properties. They are the source of truth; the values below are copied from them for reading convenience. Import them directly or translate into the codebase's own token format.

### Colour

Ground (everything sits on near-black):

| Token | Value | Use |
|---|---|---|
| `--ground-black` | `#000000` | section grounds, hero |
| `--ground-raised` | `#080908` | page background |
| `--ground-screen` | `#0B0C0B` | inside device screens |
| `--ground-screen-deep` | `#0A0B0A` | chat surfaces, status bars |

Ink (one warm off-white at graded opacity — never a second hue):

`--ink #F6F3EE` · `--ink-80` · `--ink-70` · `--ink-62` · `--ink-60` · `--ink-45` · `--ink-40` · `--ink-35`, all `rgba(246,243,238,α)`. `--ink-on-mint #161512` is the only dark ink, used for text on a mint fill.

Mint (the single brand accent):

| Token | Value | Use |
|---|---|---|
| `--mint` | `#3BB98F` | primary action, accent, active state |
| `--mint-hover` | `#4CCB9F` | button hover |
| `--mint-light` | `#6FD9B5` | gradient highlight |
| `--mint-deep` | `#0F8A5F` | gradient shadow |
| `--mint-14` | `rgba(59,185,143,0.14)` | chip fill, dwell sweep |
| `--mint-12` | `rgba(59,185,143,0.12)` | page glow |
| `--mint-60` | `rgba(59,185,143,0.60)` | focus ring |

Lines and fills: `--line rgba(246,243,238,0.14)`, `--line-strong 0.22`, `--line-soft 0.08`, `--fill-soft 0.04`, `--fill 0.06`, `--fill-strong 0.09`, `--fill-hover 0.12`.

Semantic: `--danger #E0705F`. Platform marks (used at true brand colour in the logo rail only): Meta `#0467DF`, Facebook `#0866FF`, Instagram `#E4405F`, TikTok `#111111`, YouTube `#FF0000`, X `#111111`.

**Rule: two colours.** Mint and warm white on black. Nothing else is introduced except the platform marks, which are quoting other brands' colours and are deliberately the exception.

### Typography

- Display and body: **Archivo** — `Archivo, 'Helvetica Neue', Arial, sans-serif` (Google Fonts, weights 400/500/600/700/800)
- Mono: **JetBrains Mono** — `'JetBrains Mono', ui-monospace, Menlo, monospace`

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero h1 (desktop) | 72px | 800 | `-0.042em` | 1.38 |
| Section h2 (desktop) | 60px | 700 | `-0.038em` | 1.02 |
| Section h2 (≤1200px) | 46px | 700 | `-0.038em` | 1.02 |
| Section h2 (mobile) | 26px | 700 | `-0.03em` | 1.08 |
| Hero lead | 21px | 400 | 0 | 1.6 |
| Section sub | 16px | 400 | 0 | 1.55 |
| Body / caption | 16px / 14px | 400 | 0 | 1.5–1.55 |
| Card title | 21px | 700 | `-0.022em` | — |
| Big number | 34–88px | 800 | `-0.05em` | 1 |
| Kicker / label | 10–11px | 600–700 | `0.12–0.18em`, uppercase | — |

Big numbers use `font-variant-numeric: tabular-nums` so count-up animations don't jitter. Headings use `text-wrap: balance`; body copy uses `text-wrap: pretty`.

### Spacing

4/8-ish scale: `4 8 10 14 18 22 28 34 44 56 72 104 140`px (`--sp-1` … `--sp-16`).

Page frame: max width **1440px**, gutter **130px** desktop → **56px** ≤1200px → **20px** ≤760px. Gap between top-level sections: **140px**. Body paragraph measure 480px; display heading measure 554px.

### Radius

`--r-pill 999px` (buttons, chips, inputs, status labels) · `--r-card 22px` · `--r-card-sm 18px` · `--r-tile 10px` · `--r-screen 50px` (device screen) · `--r-bezel 62px` (device bezel). Content cards in Belief and Collabs use **24px**.

### Elevation

There are no conventional drop shadows on flat UI. Depth comes from inset hairlines plus one brand glow.

```
--shadow-device:       inset 0 0 0 1.5px rgba(246,243,238,0.16), 0 60px 120px rgba(0,0,0,0.75), 0 20px 40px rgba(0,0,0,0.5)
--shadow-screen-inset: inset 0 0 0 2px #050505
--shadow-card-inset:   inset 0 0 0 1px rgba(246,243,238,0.09)
--shadow-pop:          0 24px 70px -18px rgba(0,0,0,0.75)
--glow-page:           radial-gradient(90% 60% at 50% 0%, rgba(59,185,143,0.12), rgba(8,9,8,0) 60%)
--glow-section:        radial-gradient(50% 50% at 50% 45%, rgba(59,185,143,0.14), rgba(0,0,0,0) 70%)
```

Edge fades (`--mask-rail-x` etc.) replace hard clipping on any scrolling rail.

### Motion

One easing curve does nearly all the work: `--ease-out: cubic-bezier(0.22, 0.7, 0.2, 1)` (`--ease-reveal` is the near-identical `cubic-bezier(0.2, 0.7, 0.2, 1)`).

| Token | Value | Use |
|---|---|---|
| `--dur-press` | 120ms | button press |
| `--dur-hover` | 250ms | hover transitions |
| `--dur-swap` | 300ms | tab/pane swap |
| `--dur-slide` | 550ms | carousel translate |
| `--dur-reveal` | 700ms | scroll reveal |
| `--dur-scan` | 2600ms | chart scan/draw |
| `--stagger` | 50ms | between revealed siblings |
| `--dwell` | 5s | carousel step hold |

Scroll reveal is always the same gesture: `opacity 0 → 1` plus `translateY(18px) → 0` over 700ms on `--ease-reveal`, staggered by 50–120ms between siblings. Every animated block is wrapped in `@media (prefers-reduced-motion: reduce)` handling that removes transitions and shows the end state.

### Breakpoints

| Width | Changes |
|---|---|
| **1440px** | page stops growing; gutters absorb the extra |
| **1200px** | gutter 130 → 56; display 60 → 46 |
| **900px** | two-column grids collapse to one; device centres |
| **760px** | full mobile treatment (see per-section notes) |
| **390px** | design width of the mobile kit |

Two sections (Hero, Collabs) are authored at a fixed 1440px and **scaled to fit** below that via a measured `transform: scale(w/1440)` on a wrapper, rather than reflowing. Below 760px the scale is dropped and a separate mobile layout takes over. **This is a prototype device, not a recommendation** — see "Scaling" under Implementation notes.

---

## Screens / sections

The page is one scroll. Section order, anchor ids, and `data-screen-label`s below match the source. Gap between each is 140px.

### Sticky nav (in `Artemis v3 Hero 2n.dc.html`)

- **Layout:** full-width row, brand left, links + CTA right. Desktop only; below 760px it becomes a hamburger that opens a full-screen sheet.
- **Brand:** 18px roundel glyph (circle + vertical + horizontal stroke, `#3BB98F`, 1.8px stroke, round caps) followed by "Artemis" in Archivo 700.
- **Links:** What · Why · How · Collabs · Connect · FAQ — anchor links to `#what #why #how #collabs #connect #faq`.
- **CTA:** pill, `1px solid rgba(246,243,238,0.22)`, padding `7px 20px 7px 8px`, radius 999px, weight 600. Contains three overlapped 26px circular platform badges (Instagram, Facebook, X — each `background #000`, `box-shadow 0 0 0 1px rgba(246,243,238,0.18)`, `margin-left: -7px` for the overlap) then the label "Connect now".
- **Mobile sheet:** full-screen, close button top-right, stacked links, footer holding the same platform CTA plus a mint "Join 14-day free trial" button.
- **Mobile sticky footer CTA:** a `.mnav` bar with "Join 14-day free trial" that fades in once `scrollY > 240`.

### 1. Hero — `data-screen-label="Hero 2n"`

- **Purpose:** state the promise and show the product in one glance.
- **Layout:** two columns — copy left (flexible), phone right. Copy starts optically centred and, 1.8s after load, animates left into its final position (a deliberate "settle" move; see Interactions).
- **h1:** "Change the way you build on social media." — 72px/800, `line-height 1.38`, `letter-spacing -0.042em`. Each word is a separate span revealing on a 60ms stagger starting at 0.40s.
- **Lead:** "Artemis watches your pages every minute, so you spend your time on the work instead of the feed." — 21px, `--ink-62`, max-width 480px, reveals at 0.9s.
- **CTAs:** primary is a mint pill (`#3BB98F`, ink `#161512`, 16px/600, padding `16px 30px`, radius 999px) reading "Join 14-day free trial". Secondary is the outlined platform-badge pill reading "Connect now" (32px badges here, `margin-left: -9px`).
- **Phone:** an iPhone-proportioned frame, 402×874 screen, bezel radius 62px, screen radius 50px, four hardware buttons as 3px slivers. It has a continuous slow sway plus a **mouse-follow parallax**: `rotateY(mx * 7deg) rotateX(-my * 5deg)` where `mx`/`my` are pointer position normalised to ±1, plus `translateY(max(-140, -scrollTop * 0.1))`.
- **Phone screen content:** an "Art E" chat. A user bubble asks "Why did yesterday's reel flop?", a typing indicator runs, then three assistant messages animate in — a 12-cell thumbnail grid ("Found it. I compared it against your last 12 posts."), a **Reach** card (`38%`, "62% under your average", 7-bar week chart with yesterday dimmed, "The hook loses them at 0:03."), and a **Best time** card (`7:40pm`, "3.1× the reach of your 2pm", 10-bar day chart with a mint peak). Below: three suggestion chips, a disabled-looking input reading "Ask Art E anything…", and the disclaimer "Art E can make mistakes. You always decide."

### 2. What we do — `#what`, `data-screen-label="What we do"`

- **Purpose:** name the three jobs the product does.
- **h2:** three lines, each a revealing block — "What to reply." / "When to post." / "Whether **it'll land.**" (the last two words in mint, `font-style: normal` on an `<em>`).
- **Sub:** "Artemis works all three out every minute, for every page you run. You only ever see the answers."
- **Tabs:** a 3-column grid, 40px gap, 64px below the heading. Each tab is a click target with a thin vertical rail (which fills mint while that tab is active, as a dwell indicator), an index (`01`/`02`/`03`, 11px/700, `0.14em`, mint), a title, and a sentence:
  - **01 Catch the storm** — "When comments spike, Artemis catches it inside twenty minutes and drafts a calm reply in your voice."
  - **02 Find the window** — "Two years of your posts, read every minute. Artemis names the hour your audience shows up."
  - **03 Score the draft** — "Every draft gets a score before it goes out, and the one change that lifts it. No more guessing."
- **Panel:** one shared panel below the tabs with three swappable panes.
  - **Pane 1** — two columns split by a 1px hairline. Left: "Storm caught · 6:41pm" label, a live dot pulsing, two 56px count-up numbers (`142` comments, `20 min` from first to caught), a mint status pill reading "**1** reply covers all", then an area chart (`560×150` viewBox, mint 2.5px stroke with a `stroke-dasharray` draw-on, mint-to-transparent fill) with a dashed vertical marker at 63% labelled "Artemis flags it", and a time axis 6:20pm → 6:50. Right: "Reply drafted, in your voice" label above a stack of three rotating Art E reply cards (each with a 26px radial-gradient avatar, name, "Pinned reply" kicker, `n / 3` counter, and 18px reply text), then a mint "Send" pill, a ghost "Change it first" pill, and "Nothing sent until you press it."
  - **Pane 2** — left: a 7×3 heatmap grid of mint cells at graded opacity with one cell at `0.84` and a mint hairline (the winning slot), day labels M–S with T in mint. Right: "Post it" label, "Tonight, 7:40pm" at 56px/800, "3.1× the reach of your usual 2pm" at 20px/600 mint, and "Not an industry average. Two years of your own posts, and when your people actually turned up for them."
  - **Pane 3** — left: score `78` at 88px/800 with "OUT OF 100" beneath, and three labelled tracks that fill on reveal — Hook 82, Length 64 (at 0.55 opacity), Timing 91. Right: "The draft" label, the draft text at 19px, then "Trim two lines and it clears **85**." (85 in mint).
- **Closer:** "You review. **You decide.**" centred at 30px/700, second half mint, words revealing on a stagger.
- **Mobile (≤760px):** the tabs-and-panel structure is replaced by a horizontal snap-scrolling deck of three self-contained cards (`min(300px, 84vw)` each, radius 20px, `--fill-soft` background with an inset hairline), each carrying its own number, chart, and proof; dots + "Swipe →" below; then the same "You review. You decide." closer at 20px.

### 3. Belief / Why — `#why`, `data-screen-label="Why we do it"`

- **File:** `Artemis v3 Belief.dc.html`
- **Purpose:** three principles, each proven by a photo with a real UI artefact laid over it.
- **h2:** "Growth shouldn't mean being online all day." (60px/700, max-width 980px)
- **Layout:** a horizontal track of three 690px cells, 24px gap, bleeding past the right gutter (`margin: 56px -130px 0`, `padding-left: 130px`) so the next card is always partly visible. Translates on `transform` over 900ms `cubic-bezier(0.65,0,0.35,1)`; offsets `[0, -714, -938]`.
- **Card:** 690×500, radius 24px, `#121211`, `1px solid rgba(246,243,238,0.10)`, photo `object-fit: cover` under a three-stop bottom scrim (`rgba(10,11,10,0.05) → 0.2 at 45% → 0.84`).
- **Glass overlay** (bottom-left, 24px inset): radius 14px, `rgba(18,18,17,0.78)`, `backdrop-filter: blur(18px)`, `box-shadow 0 8px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(246,243,238,0.08)`. Pops in at 0.5s with a 12px rise.
  1. **Notification card** (292px) — Artemis icon, "now", "3 people asked what time you close tonight", "Reply's drafted in your voice. Have a look when you get a sec."
  2. **Comment thread** (272px) — a truncated question line "**sarah.m** what time do you shut tonight?" above a draft reply card ("Corner Eatery · DRAFT" / "Open till 8pm from Monday — same kitchen, longer evenings.") with mint "Send" and ghost "Change it" pills.
  3. **Intro card** (380px) — two overlapping 24px avatars, "Riverside Runners are worth a hello.", "Puts you in front of 8,200 people who don't know you yet.", and a mint "Say hello" pill.
- **Captions** (16px, `--ink-55`, max-width 620px, 22px below the card; bold lead-in in full `--ink`):
  1. "**Same tools, any size.** A café with 1,200 followers gets the same read of its comments as a brand with a team behind it. The only difference is who's holding the phone."
  2. "**You always decide.** Artemis drafts, scores and suggests — it never posts. Every reply and every post waits for you to say so."
  3. "**Opportunities should find you.** Other pages already reach people you never will. Artemis finds them and makes the introduction, so you're not the one hunting."
- **Controls:** two 48px circular arrows, right-aligned, 36px below the track; `rgba(246,243,238,0.10)` → `0.16` on hover; 0.3 opacity and `pointer-events: none` at the ends.
- **Behaviour:** auto-advances on a 7s dwell (prop-controlled 3–15s) once 20% in view; pauses on hover; resets to card 1 when scrolled out.
- **Mobile:** cells become `84vw`, cards 330px tall, gap 14px, arrows hidden (swipe only).

### 4. How we do it — `#how`, `data-screen-label="How we do it"`

- **File:** `Artemis v2 How We Do It.dc.html`
- **Purpose:** answer the credibility question — where do the numbers come from.
- **h2:** "How does it know?" · **Sub:** "It reads every comment for **sentiment, emotion, topic, intent and urgency**…"
- **Desktop:** a staged diagram, roughly 1440×770. A small post card (240×160) top-left holding "Spring hours are back. Open till 8pm from Monday." and "142 comments ↓"; a scatter of small comment chips (`@rob.h` "is the garden open?" and siblings) drifting in; a 3D cube of small cells (CSS 3D, `--x/--y/--z` per cell) standing in for Artemis reading them; five lines that appear in sequence beside it —
  1. "Reads every one of them, *five ways*."
  2. "Your usual Tuesday: *20*."
  3. "Tonight: *142*. That's a storm."
  4. "Most are the same question. *One reply.*"
  5. "Nothing goes out *until you say so*."
  — a row of five keys (Sentiment · Emotion · Topic · Intent · Urgency), and a final reply card ("Drafted · 6:41pm", the reply text, a "Send" pill that flips to "Sent ✓", and a ghost "Change it").
- **Mobile:** the diagram is dropped. Instead, three questions cycle through a search-style input pill, each answered by a stacked card: "**118** of tonight's 142 comments ask the same thing" / "Post next at **7:40pm**. That's **3.1×**…" / "Your draft scores **78** out of 100. Trim two lines…" — each with a "Read from" provenance block and a progress bar (83% / 100% / 78%).

### 5. Collabs — `#collabs`, `data-screen-label="Collabs"`

- **File:** `Artemis v3 Collabs.dc.html`
- **Purpose:** show the partner-matching feature as three concrete, judgeable matches.
- **h2:** "Who to collaborate with." / "And why." (two revealing lines, 60px/700)
- **Sub:** "Businesses, creators and pages worth working with — who, why it makes sense, who you'd reach, and what you could run together."
- **Layout:** a 2-column grid, 24px gap, 56px below the heading. Left cell is fixed (always "you"); right cell holds three stacked photo panels that cross-fade (`opacity` + `scale(0.985) → 1`, 600ms). Both cells 340px tall, radius 24px.
- **Photo panel:** image fills, under a bottom scrim (`rgba(0,0,0,0.05) → 0.15 at 50% → 0.85`), with an identity tag pinned bottom-left/right (inset 20px): radius 16px, `rgba(0,0,0,0.55)`, `1px solid rgba(246,243,238,0.12)`, `backdrop-filter: blur(12px)`. Tag contains a 46px monogram avatar (dark gradient, `box-shadow 0 0 0 2px #000, 0 0 0 4px #3BB98F`), a 17px/700 name with a small mint verified tick, a 13px meta line, and a relationship chip on the right (11px/700, `0.14em`, uppercase, mint, `1px solid rgba(59,185,143,0.4)`, pill).
  - **You:** Corner Eatery · "you · café · **1,240** followers" · chip "You"
  - **Match 1:** Saturday Market · "Community page · **5.8k** followers" · chip "Every other Saturday"
  - **Match 2:** Tom Ashby · "Creator · **24k** followers" · chip "Films local spots"
  - **Match 3:** Hollow Lane Florist · "Florist · **5.4k** followers" · chip "Same block"
- **Reach badge:** a 104px mint circle centred on the seam between the two photos, `box-shadow 0 0 0 10px #000` to knock it out of both, springing in at 0.45s delay on `cubic-bezier(.2,.9,.3,1.2)`. Reads `+4,300` / `+9,100` / `+2,600` over a 9px uppercase "new people".
  - **Content rule:** this badge always shows **new people reached**, never an audience-overlap percentage and never "follow both". The pitch is incremental reach, not shared followers. Do not reintroduce a % here.
- **Caption:** three labelled lines in a `104px 1fr` grid, 16px gap. Labels are 10px/700 `0.14em` uppercase mint; body is 16px at `--ink-78`. Fades in at a 0.75s delay.
  - **Match 1** — WHY "Their crowd is on your street every other Saturday, and most of them have never been in." / REACH "4,300 new people, the kind who already respond to local food." / TOGETHER "A market-day special: they post the stall map, you post the deal. They get somewhere to send people at 1pm; you get a queue."
  - **Match 2** — WHY "He films small businesses for people who live here. He hasn't filmed yours." / REACH "9,100 new people who watch his videos to decide where to go next." / TOGETHER "One morning behind your counter: he gets a story, you host his followers for breakfast. He gets the access; you get his Saturday audience."
  - **Match 3** — WHY "Their Friday bouquet drop lands at your busiest hour, one block away." / REACH "2,600 new people who already buy something nice on a Friday." / TOGETHER "Table flowers from them, a mention from you. They get a standing order; you get a room that photographs well."
- **Controls:** three dots (6px, growing to 20px wide and mint when active) left; two 44px outlined circular arrows right.
- **Behaviour:** auto-advances every 8s (prop-controlled 3–15s) once 20% in view; pauses on hover.
- **Mobile:** the two photos stack into a single 196px-tall pair sharing one rounded outline (top card rounds the top corners, bottom card the bottom); the badge shrinks to 72px and sits on the join; tags collapse to a compact pill with the meta line hidden; captions drop to 14px on a `78px 1fr` grid.

### 6. Connect once — `#connect`, `data-screen-label="Connect once"`

- **File:** `Artemis v3 Connect Once.dc.html`
- **Purpose:** show that setup is one action and it covers every platform.
- **h2:** "Connect once.<br>It just runs." (max-width 554px)
- **Platform rail:** a looping horizontal marquee of circular platform tiles at true brand colour (Meta, Facebook, Instagram, TikTok, YouTube, X, repeated three times for a seamless 26s drift), with a mint Artemis hub sitting over the centre and edge masks fading both ends. Beside it: "Every platform you post on, already connected."
- **Step chips:** a horizontal rail of three chips — `01 Connect your page` · `02 It watches 24/7` · `03 You get answers`. The active chip has a mint fill that sweeps across as a dwell timer. The rail translates via the CSS `translate` property.
- **Step copy:** an `h3` plus one line, cross-fading on step change:
  1. "Sign in with Facebook. Artemis reads two years of your history to learn *your* audience."
  2. "Every post and comment, so it knows what a normal day looks like, and notices when it isn't."
  3. "One thing to do today, in plain English, with the numbers behind every claim."
- **Phone:** same device frame as the hero, screen content changing per step.

### 7. FAQ + footer — `#faq`, `data-screen-label="FAQ and footer"`

- **File:** `Artemis v3 FAQ Footer.dc.html`
- **FAQ:** an 820px centred column. h2 (60px/700, centred, max-width 620px) over a stack of five accordion items, 12px gap.
  - **Item:** radius 18px, `1px solid rgba(246,243,238,0.12)`, `rgba(246,243,238,0.03)`. Open state: border `rgba(59,185,143,0.5)`, background `rgba(59,185,143,0.06)`.
  - **Question row:** full-width button, `padding 22px 26px`, 17px/600 text, with an 18px mint plus/minus on the right (the vertical bar fades and rotates 90° on open).
  - **Answer:** opens via `grid-template-rows: 0fr → 1fr` over 440ms `cubic-bezier(0.22,0.7,0.2,1)` — height-animation without measuring. Body 15px/1.62 at `--ink-65`, `padding 0 26px 24px`.
  - **Questions:** "Do I have to give you my Facebook password?" · "Will Artemis post or reply without asking me?" · "How can it predict how a post will do?" · "Is my page's data kept private?" · "When can I use it?" (answers verbatim in the source file)
- **Closing CTA:** a 760px centred block over a mint radial glow (`700×380`, `rgba(59,185,143,0.16)`) and a masked dot grid. h2 at 60px, a 16px sub ("Free while …"), and an email capture.
  - **Email pill:** a single pill (`box-sizing: border-box`) containing a stretching input and a mint submit button. On mobile the pill decomposes — the input becomes a full-width standalone pill (`padding 15px 20px`, `1px solid rgba(246,243,238,0.18)`, `rgba(246,243,238,0.04)`) with the button below it.
  - Submitting swaps the form for a confirmation state.
- **Footer:** links and legal, `padding 48px 20px 104px` on mobile (the extra bottom space clears the sticky mobile CTA).

---

## Interactions & behaviour

**Scroll reveal** — the page's base gesture, used in every section. Elements start `opacity: 0; translateY(18px)` and transition to `opacity: 1; translateY(0)` over 700ms on `cubic-bezier(0.2,0.7,0.2,1)`. Triggered by an `IntersectionObserver` at `threshold: 0.2–0.25`, with a `getBoundingClientRect` fallback check on scroll plus a timeout safety net (the prototype needed these because it can mount inside an already-scrolled container; a normal app usually needs only the observer). Siblings stagger 50–120ms via `transition-delay` / `animation-delay`.

**Hero copy settle** — 1.8s after mount, the hero copy block animates from optically-centred to left-aligned. Implemented by measuring each element's `left` before the layout change, applying the layout change, setting a compensating `translateX`, then transitioning that to 0 over 1.1s — a FLIP. Cosmetic; drop it if it fights the codebase.

**Hero phone parallax** — `mousemove` on window sets `rotateY(mx·7deg) rotateX(-my·5deg)`; scroll sets `translateY(max(-140, -top·0.1))`. Both applied to one wrapper with `transform-style: preserve-3d` and `will-change: transform`. Throttle to `requestAnimationFrame` in production.

**Count-up numbers** — `142` over 1400ms and `20` over 1100ms, eased `1 - (1-k)³`, driven by `requestAnimationFrame`. Re-runs when its section re-enters view and on a 15s cycle.

**Auto-advancing carousels** — three of them (What-we-do tabs, Belief, Collabs). All share the same contract: start only when in view, hold each step for a configurable dwell (7s Belief, 8s Collabs, 15s tab cycle), pause on hover, resume on leave, reset when scrolled away, and always remain manually controllable via dots/arrows/tabs. A manual interaction restarts the timer rather than killing it.

**Accordion** — single-open FAQ, animated with `grid-template-rows`.

**Hover states** — arrows and ghost buttons lighten their fill/border (`0.10 → 0.16`, `0.16 → 0.5`); the mint primary goes `#3BB98F → #4CCB9F`; tabs raise their rail. All 250ms.

**Reduced motion** — every section has a `@media (prefers-reduced-motion: reduce)` block that kills transitions and renders the revealed end state. Preserve this. Auto-advance should also be suppressed under reduced motion in the real build.

**Responsive** — see the breakpoint table. The two biggest behavioural shifts at 760px: the What-we-do tab/panel becomes a swipe deck, and the Collabs side-by-side pair stacks vertically with the badge on the seam.

**No real backend.** Every number, chart, and message is static mock content. The only stateful input is the footer email capture, which currently just swaps to a confirmation state.

## State

Per-section local UI state only — no global store, no data fetching.

| State | Owner | Notes |
|---|---|---|
| `tab: 0 \| 1 \| 2 \| 3` | What we do | 0 = idle/cycling; 1–3 = a tab explicitly picked. Auto-returns to 0 after 15s. |
| `seen: boolean` | every section | has it entered the viewport — gates reveal + auto-advance |
| `i: number` | Belief, Collabs | active carousel index |
| `paused` / `hold: boolean` | Belief, Collabs | hover pause |
| `menu: boolean` | nav | mobile sheet open |
| `told: boolean` | hero | user has scrolled/interacted once |
| `mcard: 0..2` | What we do (mobile) | active card in the swipe deck, derived from `scrollLeft` |
| `open: 0..4 \| null` | FAQ | single-open accordion |
| `submitted: boolean` | footer | email capture confirmation |

## Assets

**Fonts** — Archivo and JetBrains Mono from Google Fonts. `reference/artemis-mobile.html` has Archivo inlined as a base64 woff2 if an offline copy is needed.

**Icons** — `design/icons/` holds the platform marks (`instagram-color.svg`, `facebook-color.svg`, `x-color.svg`) and the Belief photos. Everything else is inline SVG in the markup: the Artemis roundel, chevrons, ticks, arrows, clock, trend, and menu glyphs. All are single-path, 24×24 viewBox, `stroke-width` 1.8–2.4, round caps and joins — that consistency is deliberate, so keep it when adding icons.

**Photography** — the design uses stock photography as placeholders:
- Belief cards: three local images in `design/icons/` (`belief-cafe.jpg`, `belief-thumb.jpg`, `belief-owners.jpg`)
- Collabs panels: four Pexels URLs, embedded in the markup (`262978`, `1775043`, `2402777`, `1470171`)

**These are placeholders and must be replaced before launch** — either licensed stock or, better, real photography of a real customer. The Collabs images in particular are standing in for specific business types (a café interior, a market, a creator, a florist) and the panel copy depends on them reading as those things.

**Logo** — there is no logo file. The wordmark is currently the inline roundel glyph plus "Artemis" set in Archivo 700. Real logo assets are an open item.

## Accessibility

The design carries a contrast contract from the Artemis design system worth preserving:

- **Body and UI text: minimum 7.2:1** against its ground. On `#000`, `--ink-62` (`rgba(246,243,238,0.62)`) is the floor for body copy; anything smaller or lighter than that was raised during design review.
- **Mint on black is 6.4:1** — fine for headline-scale and bold text, and used for accents, labels and numbers. Mint is never the colour of long-form body copy.
- **Ink on mint** uses `#161512`, not black, and clears comfortably.
- Three named exceptions exist where a value is decorative and also stated in adjacent full-contrast text (chart axis labels, the `n / 3` counter, the dimmed 64 score bar). They are redundant by design — do not let that pattern spread.
- Interactive targets are **44px minimum** (arrows are 44–48px, question rows are 60px+). Carousel dots are 6px visually but must carry a 44px hit area.
- Every carousel/accordion control is a real `<button>` with an `aria-label` ("Slide 1", "Previous", "Next"). Keep them. Accordions need `aria-expanded` and `aria-controls` in the real build — the prototype does not have these and should not be copied on that point.
- Focus rings: `--focus-ring rgba(59,185,143,0.60)`. The prototype does not style `:focus-visible`; the real build must.

## Implementation notes

**Scaling.** Hero and Collabs are authored at a fixed 1440px and scaled down with a measured `transform: scale()` between 760px and 1440px, with the container height set from `scrollHeight × scale`. This was a prototyping shortcut to keep a dense composition intact. **Consider reflowing them properly instead** — scaled text ignores the user's font size, and the height bookkeeping is fragile (a bug where content grew past a hard-coded 800px container silently clipped the Collabs nav row). If you keep the scale approach, drive the container height from measured content, never a constant.

**No CSS classes in half the source.** The prototype mixes inline styles and class-based CSS because of how its runtime streams. Ignore that entirely — use whatever styling approach the codebase uses.

**`ios-frame.jsx` / `image-slot.js`** in `design/` are prototype helpers (a device bezel component and a drag-and-drop image placeholder). They're included only so the reference files run. Replace both: the device frame with a static styled wrapper or a real screenshot, the image slot with normal `<img>`/`next/image`.

**Section-scoped styles.** The device-frame CSS is deliberately scoped so that the hero's phone styling doesn't leak into the Connect Once phone. Whatever component boundary you use, keep those two independent.

## Files

```
design_handoff_artemis_v3_site/
├── README.md                      this document
├── design/                        the HTML design references
│   ├── Artemis v3 Hero 2n.dc.html   nav + hero + What we do; imports the rest
│   ├── Artemis v3 Belief.dc.html    section 3
│   ├── Artemis v2 How We Do It.dc.html  section 4
│   ├── Artemis v3 Collabs.dc.html   section 5
│   ├── Artemis v3 Connect Once.dc.html  section 6
│   ├── Artemis v3 FAQ Footer.dc.html    section 7 + footer
│   ├── Artemis Mobile.dc.html       the phone-frame review harness
│   ├── ios-frame.jsx                prototype device frame (replace)
│   ├── image-slot.js                prototype image placeholder (replace)
│   ├── support.js                   prototype runtime (do not port)
│   └── icons/                       platform marks + Belief photos
├── tokens/                        design tokens as CSS custom properties
│   ├── colors.css  typography.css  spacing.css  radius.css
│   ├── motion.css  elevation.css   breakpoints.css
│   └── fonts.css   base.css
└── reference/                     self-contained builds — open these first
    ├── artemis-website.html         the full site, all assets embedded
    └── artemis-mobile.html          the site in a phone frame, offline-ready
```

`Artemis v3 Hero 2n.dc.html` is the entry point: it holds the nav, hero and What-we-do, then imports the other five sections in order with 140px gaps.

A fuller design system — 34 components, UI kits, state patterns, and a rendered style guide — sits alongside this in `design_handoff_artemis_design_system/`. Worth reading if you're building beyond this one page, particularly for the authenticated app (which uses a different accent scale: teal `#00C4A0` plus violet, deliberately distinct from the public site's mint).

## Open items

1. **No logo files.** The wordmark is an inline glyph plus Archivo 700 type. Needs real assets in SVG.
2. **All photography is placeholder stock.** See Assets.
3. **Heading/sub mismatch in Collabs.** The h2 reads "Who to collaborate with. And why." while the sub-line underneath says "worth working with". Copy review pending — one of the two should change.
4. **Match 2's photo.** The Collabs slide 2 image is a race-crowd shot inherited from an earlier version of that slide; it now sits under "Tom Ashby / Creator" and reads as a running event rather than someone who films local businesses. Needs a different image.
