# Artemis v3 marketing site — build brief

You are implementing the Artemis one-page marketing site from a design handoff.

## Read first

- `README.md` — the full handoff: tokens, every section, interactions, state, accessibility contract, open items.
- `reference/artemis-website.html` — open in a browser. Self-contained; this is what you're building.
- `reference/artemis-mobile.html` — the same site in a phone frame, for the responsive treatment.

## Ground rules

1. **The files in `design/` are design references, not code to port.** They run on a bespoke prototyping runtime (`support.js`, `<x-dc>` elements). Read them for structure, exact values, and copy. Do not copy the runtime, the `.dc.html` format, or the inline-style convention.
2. **Recreate the designs in this codebase's existing environment**, following its component patterns, styling approach, and libraries. If there is no codebase yet, use a static-first framework — the page has no server data and no auth.
3. **High fidelity.** Colours, type, spacing, radii, motion timings and copy are final. Match them.
4. **Copy is verbatim.** Do not rewrite marketing copy. If a line seems wrong, flag it — don't fix it.
5. **Mock numbers are intentional.** 142 comments, 20 min, 7:40pm, 3.1×, score 78, +4,300 new people. They carry the narrative. Keep them unless product supplies real values.

## Non-negotiables

- **Two colours.** Mint `#3BB98F` and warm white `#F6F3EE` on near-black. The only exception is platform brand marks at their true colours. Do not introduce a third hue, a gradient background, or a second accent.
- **One easing curve.** `cubic-bezier(0.22, 0.7, 0.2, 1)` does nearly all the work. Reveal is always `opacity 0→1` + `translateY(18px)→0` over 700ms.
- **Contrast floor 7.2:1** for body and UI text. Mint (6.4:1 on black) is for headline-scale text, accents, labels and numbers — never long-form body copy.
- **44px minimum hit targets.** Carousel dots are 6px visually; give them a 44px hit area.
- **`prefers-reduced-motion`** must kill transitions, show end states, and suspend auto-advance.
- **The Collabs reach badge shows new people reached** (`+4,300`), never an overlap percentage and never "follow both". This is a deliberate content rule — the pitch is incremental reach. The words "swap", "overlap" and "follow both" were removed from the whole site on purpose; don't reintroduce them.

## Where to improve on the prototype

- **Hero and Collabs are CSS-scaled** from a fixed 1440px canvas between 760px and 1440px. Prefer reflowing them properly. If you keep the scale, drive the container height from measured content — a hard-coded height already caused a silent clipping bug.
- **Accordions need `aria-expanded` / `aria-controls`.** The prototype lacks them.
- **Style `:focus-visible`** using `--focus-ring rgba(59,185,143,0.60)`. The prototype doesn't.
- **Throttle the hero parallax** to `requestAnimationFrame`.
- **Replace the prototype helpers:** `ios-frame.jsx` → a static styled device wrapper or screenshot; `image-slot.js` → normal images.
- The prototype's reveal logic stacks an `IntersectionObserver`, a scroll fallback, and timeout safety nets because it mounts inside an already-scrolled host. A normal page needs only the observer.

## Placeholders to replace

- All photography is placeholder stock (three local JPEGs for Belief; four Pexels URLs for Collabs). Collabs images must read as a café, a market, a creator, and a florist — the copy depends on it.
- There is no logo file. The wordmark is an inline roundel glyph plus "Artemis" in Archivo 700.

## Build order

Sections are independent; build them in page order and keep them as separate components. `Artemis v3 Hero 2n.dc.html` is the entry point (nav + hero + What we do) and imports the other five with 140px gaps.

1. Tokens and the page shell (background, glow, page frame, 1440/130-56-20 gutters)
2. Nav + mobile sheet + sticky mobile CTA
3. Hero (copy, CTAs, device frame, chat content)
4. What we do (tabs + swappable panel; swipe deck below 760px)
5. Belief carousel
6. How we do it
7. Collabs carousel
8. Connect once
9. FAQ accordion + closing CTA + footer

Then pass over the whole page for reveal staggers, reduced-motion, focus states, and the 1200/900/760 breakpoints.

## Ask before

- Changing any copy, number, or the section order.
- Replacing a chart or proof artefact with a simpler element.
- Adding a section, a pricing table, or a second CTA route. The page has one conversion action: the 14-day free trial.
