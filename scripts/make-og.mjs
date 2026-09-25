/* Rebuilds the social share card. Same layout as before; the mark is now the real one and the
   em dash is gone, matching the copy pass that removed them from the page. */
import pw from 'playwright'
import { writeFile } from 'node:fs/promises'
const B='http://localhost:4185'
const MARK = `<svg viewBox="0 0 36 36" width="46" height="46" fill="none" style="color:#3BB98F">
  <rect x="2" y="2" width="32" height="32" rx="8" stroke="currentColor" stroke-width="2"/>
  <path d="M18 8L26 28H10L18 8Z" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="18" cy="20" r="3" fill="currentColor"/></svg>`

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url('${B}/fonts/archivo-400-latin.woff2') format('woff2');font-weight:100 900;font-display:block}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#080908;font-family:Archivo,sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;inset:0;background:radial-gradient(90% 60% at 50% 0%,rgba(59,185,143,0.12),rgba(8,9,8,0) 60%)}
.wrap{position:relative;padding:72px 84px;height:100%;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;color:#F6F3EE;font-size:31px;font-weight:800;letter-spacing:-0.03em}
h1{margin-top:auto;font-size:78px;font-weight:800;letter-spacing:-0.04em;line-height:1.08;color:#F6F3EE;max-width:19ch}
h1 em{font-style:normal;color:#3BB98F}
p{margin-top:36px;margin-bottom:auto;font-size:26px;line-height:1.5;color:rgba(246,243,238,0.62);max-width:44ch}
</style></head><body>
<div class="glow"></div>
<div class="wrap">
  <div class="brand">${MARK}<span>ArtemisAI</span></div>
  <h1>Change the way you build on <em>social media</em>.</h1>
  <p>What to reply. When to post. Whether it&rsquo;ll land. Read from two years of your own history.</p>
</div></body></html>`

const b = await pw.chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const p = await b.newPage({ viewport:{width:1200,height:630}, deviceScaleFactor:1 })
await p.setContent(html, { waitUntil:'networkidle' })
await p.evaluate(()=>document.fonts.ready)
await p.waitForTimeout(400)
await writeFile(new URL('../public/og.png', import.meta.url), await p.screenshot())
console.log('og.png rebuilt')
await b.close()
