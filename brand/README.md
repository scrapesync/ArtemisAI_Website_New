# Brand source files

The mark as supplied, unmodified. Kept here so the geometry in `src/components/Icons.tsx` and
everything `scripts/make-icons.mjs` generates can be checked against the original rather than
against a previous copy of itself.

All four mark files are identical geometry on a 36x36 grid and differ only in colour:

| File | Colour |
|---|---|
| `artemisai-mark-gradient.svg` | `#00D4AA` to `#00A88A`, diagonal |
| `artemisai-mark-teal.svg` | flat `#00C4A0` |
| `artemisai-mark-black.svg` | flat `#0E1116` |
| `artemisai-mark-white.svg` | flat `#FFFFFF` |

That a flat black and a flat white variant exist is why the site draws the mark in
`currentColor`: a single-colour mark is the intended form, so one component can serve both
themes and sit on a mint fill without a second asset. The site uses its own `--mint` rather
than the brand teal, which was a deliberate call: `#00C4A0` against the site's `#3BB98F`
reads as two greens rather than one.

`artemisai-wordmark.svg` is the lockup. **It is not used by the site**, for two reasons: it
sets "ArtemisAI" where the site says "Artemis", and it pulls Sora from Google Fonts through an
`@import` inside the SVG, which does not render reliably and would add an external request.
The nav and footer set the word in live text instead, which stays sharp at any size, can be
selected, and is read properly by a screen reader.

These arrived renamed to `.txt`, because SVG uploads are commonly rejected as an attachment
type: an SVG is XML and can carry script. They are stored here with their proper extension.

## Regenerating the icons

```bash
npm run build && (cd dist && python3 -m http.server 4185 &)   # make-og needs the fonts served
node scripts/make-icons.mjs    # favicon-96, apple-touch, 192, 512, maskable-512
node scripts/make-og.mjs       # og.png, the social share card
```

`favicon.svg` is hand-written rather than generated, because it carries its own dark ground:
a browser tab strip may be light or dark, and an unbacked mark disappears against one of them.

The maskable icon is drawn at a smaller scale on a full-bleed ground. Launchers crop maskable
icons to a circle, so the art has to stay inside the middle 80% of the canvas; rescaling one
of the other icons would not do.
