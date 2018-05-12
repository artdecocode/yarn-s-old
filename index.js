#!/usr/bin/env node
"use strict";
var _spawncommand = _interopRequireDefault(require("spawncommand"));
var _path = require("path");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const p = (0, _path.resolve)(process.cwd(), 'package.json');
let scripts;
try {
  ({ scripts = {} } = require(p));
} catch (err) {
  console.log('package.json not found in cwd');
  process.exit(1);
}

const keys = Object.keys(scripts);

const [,, ...args] = process.argv;

const sa = args.filter(arg => {
  return keys.find(a => a == arg);
});

const run = a => {
  const proc = (0, _spawncommand.default)('yarn', [a], {
    stdio: 'inherit' });

  const { promise } = proc;
  return { proc, promise };
};

(async () => {
  console.log(sa);
  try {
    await sa.
    reduce(async (acc, command) => {
      const a = await acc;
      const { proc, promise } = run(command);
      const c = await promise;
      return [...a, c];
    }, Promise.resolve([]));
  } catch (err) {
    console.error(err);
  }
})();
