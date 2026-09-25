const SC='/tmp/claude-0/-home-user-ArtemisAI-Website-New/d817024e-fdae-5acb-9561-6a869f5c8b84/scratchpad'
let ENV = {}
globalThis.Netlify = { env: { get: (k) => ENV[k] } }
const { default: handler } = await import(`${SC}/protect.mjs`)

const basic = (u,p) => ({ headers: new Headers({ authorization: 'Basic ' + Buffer.from(`${u}:${p}`).toString('base64') }) })
const raw   = (v) => ({ headers: new Headers(v ? { authorization: v } : {}) })

let pass=0, fail=0
const check = async (name, env, req, wantStatus) => {
  ENV = env
  const r = await handler(req)
  const got = r === undefined ? 'PASS-THROUGH' : r.status
  const ok = got === wantStatus
  ok ? pass++ : fail++
  console.log(`${ok?'ok  ':'FAIL'} ${name} -> ${got}${ok?'':`  (wanted ${wantStatus})`}`)
}

const GOOD = { INTERNAL_USER:'artemis', INTERNAL_PASSWORD:'s3cret:with:colons' }

await check('no credentials configured -> locked, not open', {}, basic('a','b'), 401)
await check('only user configured -> locked',      { INTERNAL_USER:'artemis' }, basic('artemis','x'), 401)
await check('no Authorization header',             GOOD, raw(null), 401)
await check('non-Basic scheme (Bearer)',           GOOD, raw('Bearer abc123'), 401)
await check('malformed base64',                    GOOD, raw('Basic !!!!not-base64!!!!'), 401)
await check('no colon in decoded value',           GOOD, raw('Basic ' + Buffer.from('nocolon').toString('base64')), 401)
await check('wrong username',                      GOOD, basic('wrong','s3cret:with:colons'), 401)
await check('wrong password',                      GOOD, basic('artemis','wrong'), 401)
await check('empty password',                      GOOD, basic('artemis',''), 401)
await check('correct credentials',                 GOOD, basic('artemis','s3cret:with:colons'), 'PASS-THROUGH')

// The challenge must actually prompt a browser, or nobody can ever log in.
ENV = GOOD
const r = await handler(raw(null))
const hdr = r.headers.get('WWW-Authenticate')
const cache = r.headers.get('Cache-Control')
console.log(`ok   WWW-Authenticate: ${hdr}`)
console.log(`ok   Cache-Control: ${cache}`)
if (!hdr?.startsWith('Basic realm=')) { console.log('FAIL missing Basic challenge'); fail++ } else pass++
if (cache !== 'no-store') { console.log('FAIL 401 is cacheable'); fail++ } else pass++

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
