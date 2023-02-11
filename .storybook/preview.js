import { setup as setupMomentJs } from '../utils/moment/setup'
import { defineComponent } from 'vue'
import { app } from '@storybook/vue3'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import StyleOverride from './StyleOverride.vue'
import 'vuetify/styles'

app.use(createVuetify({ components }))
setupMomentJs()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (story, context) => {
    const wrapped = story(context)
    return defineComponent({
      components: { wrapped, StyleOverride },
      template: `
        <style-override>
          <v-app>
            <wrapped />
          </v-app>
        </style-override>
      `,
    })
  },
]
