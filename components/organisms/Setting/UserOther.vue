<template>
  <v-card elevation="0">
    <v-card-title>その他</v-card-title>
    <v-card max-width="500" outlined>
      <v-card-text>
        <v-btn color="error" @click="deleteAccount">アカウントを削除する</v-btn>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { functions } = useFirebase()
    return { functions }
  },
  methods: {
    async deleteAccount() {
      if (!confirm('本当にアカウントを削除しますか？')) return

      const response = await this.functions.deleteUser()
      if (response.data.code === 'OK') {
        navigateTo('/login')
      }
    },
  },
})
</script>
