/**
 * Screenshots the built site at the handoff's breakpoints.
 *
 *   npm run build && node scripts/shoot.mjs [--full] [--width=1440] [--out=dir] [--wait=ms]
 *
 * Serves `dist/` so what is captured is exactly what Netlify would publish.
 */
import { chromium } from 'playwright'
import { launchOptions } from './chromium.mjs'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { extname, join } from 'node:path'

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
}

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : fallback
}
const flag = (name) => process.argv.includes(`--${name}`)

const outDir = arg('out', 'shots')
const waitMs = Number(arg('wait', 2600))
const widths = arg('width') ? [Number(arg('width'))] : [1440, 1200, 900, 760, 390]
const reduced = flag('reduced')

const server = createServer(async (req, res) => {
  const path = (req.url ?? '/').split('?')[0]
  const file = join('dist', path === '/' ? 'index.html' : path.slice(1))
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(await readFile('dist/index.html'))
  }
}).listen(0)

const port = server.address().port
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch(launchOptions())

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  })
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(waitMs)

  const suffix = reduced ? '-reduced' : ''
  const name = `${outDir}/w${width}${suffix}.png`
  await page.screenshot({ path: name, fullPage: flag('full') })
  console.log('wrote', name)
  await page.close()
}

await browser.close()
server.close()
