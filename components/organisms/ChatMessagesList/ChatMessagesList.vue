<template>
  <v-list class="d-flex flex-column-reverse" :class="$style.root">
    <org-chat-message
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </v-list>
</template>

<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  props: {
    messages: {
      type: Array as PropType<CC.P.ChatMessage[]>,
      required: true,
    },
  },
})
</script>

<style module lang="scss">
.root {
  overflow-y: scroll;
  word-break: break-all;
  flex-grow: 1;
}
</style>
