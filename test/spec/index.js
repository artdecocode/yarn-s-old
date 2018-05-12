import { equal, assert } from 'zoroaster/assert'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import yarnS from '../../src'

const yarnSTestSuite = {
  context,
  'should be a function'() {
    equal(typeof yarnS, 'function')
  },
  'should call package without error'() {
    assert.doesNotThrow(() => {
      yarnS()
    })
  },
  /**
   * @param {Context} api
   */
  async 'calls test context method'(api) {
    await api.example()
  },
}

export default yarnSTestSuite
