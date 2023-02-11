const path = require('path')

module.exports = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    // NOTE: trueにするとUIコンポーネントのレンダリングに時間がかかるようになる。
    // 画像回帰テストのscenario.delayを3000msぐらいに設定する必要がある。
    // storyStoreV7: true,
  },
  viteFinal: (config) => {
    config.resolve.alias['~'] = path.resolve(__dirname, '..', 'components')
    return config
  },
}
