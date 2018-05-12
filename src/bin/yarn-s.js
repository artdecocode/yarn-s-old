#!/usr/bin/env node
import spawncommand from 'spawncommand'
import { resolve } from 'path'

const p = resolve(process.cwd(), 'package.json')
let scripts
try {
  ({ scripts = {} } = require(p))
} catch (err) {
  console.log('package.json not found in cwd')
  process.exit(1)
}

const keys = Object.keys(scripts)

const [,, ...args] = process.argv

const sa = args.filter((arg) => {
  return keys.find(a => a == arg)
})

const run = (a) => {
  const proc = spawncommand('yarn', [a], {
    stdio: 'inherit',
  })
  const { promise } = proc
  return { proc, promise }
}

;(async () => {
  try {
    await sa
      .reduce(async (acc, command) => {
        const a = await acc
        const { promise } = run(command)
        const c = await promise
        const { code } = c
        if (code) throw new Error(`Command "${command}" existed with code ${code}`)
        return [...a, c]
      }, Promise.resolve([]))
  } catch ({ message, stack }) {
    console.error(message) // eslint-disable-line
    process.exit(1)
  }
})()
