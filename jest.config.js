/**
 * @type {import("ts-jest").InitialOptionsTsJest}
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./components/**/*.vue'],
  coverageDirectory: '.coverage',
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'test'],
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  transform: {
    '.*\\.(vue)$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironmentOptions: {
    // https://stackoverflow.com/questions/72587750/
    customExportConditions: ['node', 'node-addons'],
  },
}
