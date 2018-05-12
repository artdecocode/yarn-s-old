import { equal, assert } from 'zoroaster/assert'
import context, { Context } from '../context' // eslint-disable-line no-unused-vars
import yarnSeries from '../../src'

const yarnSeriesTestSuite = {
  context,
  'should be a function'() {
    equal(typeof yarnSeries, 'function')
  },
  'should call package without error'() {
    assert.doesNotThrow(() => {
      yarnSeries()
    })
  },
  /**
   * @param {Context} api
   */
  async 'calls test context method'(api) {
    await api.example()
  },
}

export default yarnSeriesTestSuite
