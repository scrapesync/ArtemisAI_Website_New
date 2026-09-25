/* Rasterise the icon set from the brand geometry. One source, so the favicon, the touch icon
   and the maskable icons cannot drift apart the way the previous hand-made set had. */
import pw from '/home/user/ArtemisAI_Website_New/node_modules/playwright/index.js'
import { writeFile } from 'node:fs/promises'
const OUT='/home/user/ArtemisAI_Website_New/public'
const MINT='#3BB98F', GROUND='#080908'

const mark = (stroke, scale=1) => `
  <g transform="translate(18 18) scale(${scale}) translate(-18 -18)" fill="none" stroke="${stroke}">
    <rect x="2" y="2" width="32" height="32" rx="8" stroke-width="2"/>
    <path d="M18 8L26 28H10L18 8Z" stroke-width="1.5"/>
    <circle cx="18" cy="20" r="3" fill="${stroke}" stroke="none"/>
  </g>`

/* A maskable icon is cropped to a circle by the launcher, so its art has to sit inside the
   safe zone: the middle 80% of the canvas. Hence the smaller scale and the full-bleed ground. */
const doc = (opts) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="${opts.px}" height="${opts.px}">
  ${opts.round ? `<rect width="36" height="36" rx="8" fill="${GROUND}"/>` : `<rect width="36" height="36" fill="${GROUND}"/>`}
  ${mark(MINT, opts.scale)}
</svg>`

const jobs = [
  { file:'favicon-96.png',       px:96,  scale:0.82, round:true  },
  { file:'apple-touch-icon.png', px:180, scale:0.82, round:true  },
  { file:'icon-192.png',         px:192, scale:0.82, round:true  },
  { file:'icon-512.png',         px:512, scale:0.82, round:true  },
  { file:'icon-maskable-512.png',px:512, scale:0.62, round:false },
]

const b = await pw.chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const j of jobs) {
  const p = await b.newPage({ viewport:{ width:j.px, height:j.px }, deviceScaleFactor:1 })
  await p.setContent(`<body style="margin:0">${doc(j)}</body>`)
  const buf = await p.screenshot({ omitBackground:false })
  await writeFile(`${OUT}/${j.file}`, buf)
  console.log(`  ${j.file}  ${j.px}x${j.px}`)
  await p.close()
}
await b.close()
