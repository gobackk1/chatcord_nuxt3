<template>
  <img :src="src" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppImg',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
})
</script>
