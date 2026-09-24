/**
 * Renders the favicon set and the social card from the Artemis roundel glyph.
 *
 * There is no logo file in the handoff — the wordmark is this inline glyph plus "Artemis" in
 * Archivo 700. Everything here is generated from that, so it stays consistent with the nav
 * until real brand assets land. Re-run with: node scripts/make-brand-assets.mjs
 */
import { chromium } from 'playwright'
import { launchOptions } from './chromium.mjs'
import { writeFile } from 'node:fs/promises'

// This image ships a Chromium build older than the playwright package pins, so point at it
// directly rather than triggering a download that the network policy would block anyway.

const MINT = '#3BB98F'
const GROUND = '#080908'
const INK = '#F6F3EE'

const roundel = (size, stroke) => `
  <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
    <g stroke="${MINT}" stroke-width="${stroke}" stroke-linecap="round">
      <circle cx="32" cy="32" r="24"/><path d="M32 8v48"/><path d="M9.6 24h44.8"/>
    </g>
  </svg>`

const icon = (px, radius, pad) => `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;width:${px}px;height:${px}px}
  .t{width:${px}px;height:${px}px;background:${GROUND};border-radius:${radius}px;
     display:flex;align-items:center;justify-content:center}
</style>
<div class="t">${roundel(px - pad * 2, (px - pad * 2) * 0.075)}</div>`

const card = `<!doctype html><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&display=swap">
<style>
  html,body{margin:0;width:1200px;height:630px}
  body{background:${GROUND};font-family:Archivo,sans-serif;color:${INK};
       display:flex;flex-direction:column;justify-content:space-between;
       padding:78px 84px;box-sizing:border-box;position:relative;overflow:hidden}
  .glow{position:absolute;left:50%;top:-30%;width:1100px;height:760px;transform:translateX(-50%);
        background:radial-gradient(50% 50% at 50% 50%, rgba(59,185,143,0.16), rgba(0,0,0,0) 70%)}
  .brand{display:flex;align-items:center;gap:16px;position:relative}
  .brand span{font-size:34px;font-weight:700;letter-spacing:-0.02em}
  h1{position:relative;margin:0;font-size:82px;font-weight:800;line-height:1.1;
     letter-spacing:-0.042em;max-width:920px}
  p{position:relative;margin:0;font-size:26px;line-height:1.45;color:rgba(246,243,238,0.62);max-width:760px}
  em{font-style:normal;color:${MINT}}
</style>
<div class="glow"></div>
<div class="brand">${roundel(40, 4.8)}<span>Artemis</span></div>
<h1>Change the way you build on <em>social media</em>.</h1>
<p>What to reply. When to post. Whether it'll land — read from two years of your own history.</p>`

const browser = await chromium.launch(launchOptions())

for (const [file, html, size] of [
  ['public/favicon-96.png', icon(96, 21, 10), 96],
  ['public/apple-touch-icon.png', icon(180, 0, 26), 180],
]) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 })
  await page.setContent(html)
  await writeFile(file, await page.screenshot({ omitBackground: true }))
  await page.close()
  console.log('wrote', file)
}

const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(card, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await writeFile('public/og.png', await page.screenshot())
console.log('wrote public/og.png')

await browser.close()
