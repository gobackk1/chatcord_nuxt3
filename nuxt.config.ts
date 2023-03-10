import type { NuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export const nuxtConfig: NuxtConfig = {
  ssr: false,
  imports: {
    dirs: ['composables/firebase/', 'composables'],
  },
  components: [
    {
      path: './components/atoms/',
      prefix: 'atom',
    },
    {
      path: './components/molecules/',
      prefix: 'mol',
    },
    {
      path: './components/organisms/',
      prefix: 'org',
    },
  ],
  css: ['mdi/css/materialdesignicons.min.css'],
  typescript: {
    shim: false,
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // console.log(config)
        config.plugins?.push(vuetify())
      })
    },
  ],
  // build: {
  //   transpile: ['vuetify'],
  // },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(nuxtConfig)
