/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress', 'dashboard'],
  testRunner: 'jest',
  coverageAnalysis: 'off',
}
