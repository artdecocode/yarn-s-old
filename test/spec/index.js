import { ok } from 'assert'
import { bin } from '../../package.json'
import spawncommand from 'spawncommand'

const keys = Object.keys(bin)
ok(keys.length)
const [k] = keys
const t = bin[k]

const T = {
  async 'runs the binary'() {
    const proc = spawncommand('node', [t, 'pass', 'pass'])
    const { promise } = proc
    const { stdout, code } = await promise
    const lines = stdout.split('\n')
    const f = lines.filter(l => /this file is fine/.test(l))
    ok(f.length == 2)
    ok(!code)
  },
  async 'exits with non-zero code'() {
    const proc = spawncommand('node', [t, 'pass', 'fail'])
    const { promise } = proc
    const { code } = await promise
    ok(code)
  },
}

export default T
