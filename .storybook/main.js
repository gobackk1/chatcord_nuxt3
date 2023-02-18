const vuetify = require('vite-plugin-vuetify')
const AutoImport = require('unplugin-auto-import/vite')

// https://github.com/nuxt/framework/issues/6496
async function getNuxtViteConfig() {
  const { loadNuxt, buildNuxt } = await import('@nuxt/kit')
  const nuxt = await loadNuxt({ cwd: process.cwd(), dev: false, ssr: false })
  return new Promise((resolve, reject) => {
    nuxt.hook('vite:extendConfig', (config) => {
      resolve(config)
      throw new Error('_stop_')
    })
    buildNuxt(nuxt).catch((err) => {
      if (!err.toString().includes('_stop_')) {
        reject(err)
      }
    })
  }).finally(() => nuxt.close())
}

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
  viteFinal: async (config) => {
    const nuxtViteConfig = await getNuxtViteConfig()

    config.resolve.alias = {
      ...nuxtViteConfig.resolve.alias,
      ...config.resolve.alias,
    }
    config.plugins.push(vuetify())
    config.plugins.push(AutoImport({ imports: ['vue'], dts: false }))

    return config
  },
  staticDirs: ['./static'],
}
