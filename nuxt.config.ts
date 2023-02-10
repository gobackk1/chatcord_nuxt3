import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  components: [
    {
      path: './components/atoms/',
      prefix: 'atom',
    },
    // {
    //   path: './components/molecules/',
    //   prefix: 'mol',
    // },
    // {
    //   path: './components/organisms/',
    //   prefix: 'org',
    // },
  ],
  css: ['mdi/css/materialdesignicons.min.css'],
  typescript: {
    shim: false,
  },
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // console.log(config.resolve?.alias)
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
})
