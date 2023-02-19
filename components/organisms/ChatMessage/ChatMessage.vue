<template>
  <v-list-item density="default" :class="$style.root">
    <template #prepend>
      <mol-avatar
        size="large"
        :photo-url="message.user.photoURL || ''"
        :display-name="message.user.displayName"
      />
    </template>
    <v-list-item-subtitle>
      <atom-time :unix-time="unixTime" />
    </v-list-item-subtitle>
    <p :class="['mb-0', $style.message]">{{ message.text }}</p>
  </v-list-item>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import firebase from 'firebase'

const props = defineProps<{ message: CC.P.ChatMessage }>()
const unixTime = computed<number>(
  () => (props.message.createdAt as firebase.firestore.Timestamp).seconds
)
</script>

<style module lang="scss">
.root {
  min-height: 64px;
  flex: 0 0 auto;
}
.message {
  white-space: pre;
}
</style>
