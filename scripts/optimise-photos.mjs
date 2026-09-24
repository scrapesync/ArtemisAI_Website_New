/**
 * Converts the Belief photographs to WebP with a JPEG fallback, at the two widths the layout
 * actually asks for (690px cards on desktop, 84vw on mobile).
 *
 * The originals are 1380x1000 JPEGs from the handoff. They are placeholder stock and must be
 * replaced before launch — see docs/design-handoff/README.md, "Assets".
 *
 *   node scripts/optimise-photos.mjs
 */
import { chromium } from 'playwright'
import { launchOptions } from './chromium.mjs'
import { readFile, writeFile, mkdir } from 'node:fs/promises'

const SRC = 'docs/design-handoff/design/icons'
const OUT = 'src/assets/photos'
const NAMES = ['belief-cafe', 'belief-thumb', 'belief-owners']
// The card is 690px wide at most; 1380 covers a 2x display.
const WIDTHS = [690, 1380]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch(launchOptions())
const page = await browser.newPage()
await page.goto('about:blank')

for (const name of NAMES) {
  const b64 = (await readFile(`${SRC}/${name}.jpg`)).toString('base64')
  for (const width of WIDTHS) {
    // WebP at both widths, plus a single JPEG at the smaller width as the fallback for the
    // few browsers without WebP. A 2x JPEG would double the weight for almost nobody.
    const formats =
      width === WIDTHS[0]
        ? [
            ['image/webp', 'webp', 0.82],
            ['image/jpeg', 'jpg', 0.82],
          ]
        : [['image/webp', 'webp', 0.82]]

    for (const [type, ext, quality] of formats) {
      const dataUrl = await page.evaluate(
        async ({ b64, width, type, quality }) => {
          const img = new Image()
          img.src = 'data:image/jpeg;base64,' + b64
          await img.decode()
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = Math.round((img.naturalHeight / img.naturalWidth) * width)
          const ctx = canvas.getContext('2d')
          ctx.imageSmoothingQuality = 'high'
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          return canvas.toDataURL(type, quality)
        },
        { b64, width, type, quality },
      )
      const file = `${OUT}/${name}-${width}.${ext}`
      const bytes = Buffer.from(dataUrl.split(',')[1], 'base64')
      await writeFile(file, bytes)
      console.log(`wrote ${file} (${Math.round(bytes.length / 1024)}KB)`)
    }
  }
}

await browser.close()
