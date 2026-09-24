/** Screenshots one element by selector. node scripts/shoot-section.mjs <selector> <width> <out> [waitMs] */
import { chromium } from 'playwright'
import { launchOptions } from './chromium.mjs'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const [selector, width = '1440', out = 'shot.png', wait = '1200'] = process.argv.slice(2)
const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp' }

const srv = createServer(async (q, r) => {
  const p = (q.url ?? '/').split('?')[0]
  const f = join('dist', p === '/' ? 'index.html' : p.slice(1))
  try {
    const b = await readFile(f)
    r.writeHead(200, { 'Content-Type': T[extname(f)] ?? 'application/octet-stream' })
    r.end(b)
  } catch { r.writeHead(404); r.end() }
}).listen(0)

const browser = await chromium.launch(launchOptions())
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } })
await page.goto(`http://localhost:${srv.address().port}/`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const el = page.locator(selector).first()
await el.scrollIntoViewIfNeeded()
await page.waitForTimeout(Number(wait))
await el.screenshot({ path: out })
console.log('wrote', out)
await browser.close()
srv.close()
