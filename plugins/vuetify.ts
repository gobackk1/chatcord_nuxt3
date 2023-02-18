import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { defineNuxtPlugin } from '#app'

export const vuetifyConfig = {
  theme: {
    // defaultTheme: 'dark',
  },
  defaults: {
    VList: {
      density: 'compact',
    },
    VTextField: {
      density: 'compact',
      variant: 'outlined',
    },
    VAlert: {
      density: 'compact',
    },
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify(vuetifyConfig)
  nuxtApp.vueApp.use(vuetify)
})
