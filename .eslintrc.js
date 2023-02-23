/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript',
    '@nuxt/eslint-config',
    '@vue/eslint-config-prettier',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      rules: {
        /**
         * NOTE:
         * 以下の理由によりオフ
         * - 実行エラーが発生してテストが落ちるのは問題ない
         * - 型を絞り込む等、ロジックをテストに書きたくない
         */
        '@typescript-eslint/no-non-null-assertion': false,
      },
    },
  ],
  ignorePatterns: ['node_modules', 'dist'],
}
