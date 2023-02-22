import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import Vuetify from 'vite-plugin-vuetify'
import { loadNuxt, buildNuxt } from '@nuxt/kit'

// https://github.com/nuxt/framework/issues/6496
async function getNuxtViteConfig(): Promise<any> {
  const nuxt = await loadNuxt({ cwd: process.cwd(), dev: false })
  return await new Promise((resolve, reject) => {
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

export default defineConfig(async () => {
  const config = await getNuxtViteConfig()
  return {
    define: {
      'import.meta.vitest': false,
    },
    plugins: [Vue(), Vuetify()],
    test: {
      setupFiles: './test/vitest/vitest.setup.ts',
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'c8',
        reporter: ['html', 'text'],
        reportsDirectory: '.coverage',
        all: true,
        src: [
          './components',
          './composables',
          './functions',
          './layouts',
          './middleware',
          './pages',
        ],
        extension: ['.ts', '.vue'],
      },
      deps: {
        inline: ['vuetify'],
      },
    },
    resolve: {
      alias: { ...config.resolve.alias },
    },
  }
})
