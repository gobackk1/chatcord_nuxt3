<template>
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    top
    transition="slide-y-transition"
    >{{ snackbar.text }}</v-snackbar
  >
  <slot />
</template>

<script lang="ts" setup>
import { reactive, provide } from 'vue'
const snackbar = reactive({
  show: false,
  text: '',
  timeout: 3000,
  color: 'info',
})

const pushSnackbar = ({
  text,
  timeout = 3000,
  color = 'info',
}: CC.P.PushSnackbarParams): void => {
  snackbar.show = true
  snackbar.text = text
  snackbar.timeout = timeout
  snackbar.color = color
}

provide('pushSnackbar', pushSnackbar)
</script>
