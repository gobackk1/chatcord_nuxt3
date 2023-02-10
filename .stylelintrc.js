/**
 * @type {import("stylelint").Config}
 */

module.exports = {
  extends: ['stylelint-config-recommended-vue', 'stylelint-config-prettier'],
  customSyntax: 'postcss-scss',
  rules: {},
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  ignorePatterns: ['node_modules', 'dist'],
}
