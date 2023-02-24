/**
 * @type {import("stylelint").Config}
 */

module.exports = {
  extends: ['stylelint-config-recommended-vue', 'stylelint-config-prettier'],
  customSyntax: 'postcss-scss',
  // rules: {
  //   'unit-allowed-list': ['em'],
  // },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  ignorePatterns: ['node_modules', 'dist'],
}
