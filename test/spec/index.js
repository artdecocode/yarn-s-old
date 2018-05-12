import { ok } from 'assert'
import { bin } from '../../package.json'
import spawncommand from 'spawncommand'

const T = {
  async 'runs the binary'() {
    const keys = Object.keys(bin)
    ok(keys.length)
    const [k] = keys
    const t = bin[k]
    const proc = spawncommand('node', [t, 'build', 'build'])
    const { promise } = proc
    proc.stdout.pipe(process.stdout)
    const { stdout, code } = await promise
    const lines = stdout.split('\n')
    const f = lines.filter(l => /babel src\/bin\/yarn-s\.js --out-file index\.js/.test(l))
    ok(f.length == 2)
    ok(!code)
  },
}

export default T
