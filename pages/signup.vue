<template>
  <v-card>
    <v-card-title class="mb-3">ChatCord 新規登録</v-card-title>
    <v-card-text>
      <v-form v-model="isFormValid" @submit.prevent="register">
        <mol-field-email v-model="email" class="mb-3" />
        <mol-field-password v-model="password" class="mb-3" />
        <v-alert
          v-if="errorMessage"
          class="mb-3"
          type="warning"
          close-label="アラートを消す"
          closable
        >
          {{ errorMessage }}
        </v-alert>

        <v-btn to="/login" class="mr-3"> ログインへ </v-btn>
        <v-btn type="submit" :disabled="!isFormValid" color="primary">
          登録
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

definePageMeta({
  layout: 'only-one-form',
})

export default defineComponent({
  setup() {
    return { auth: useAuth() }
  },
  data() {
    return {
      password: '',
      email: '',
      errorMessage: '',
      isFormValid: false,
    }
  },
  methods: {
    async register() {
      this.errorMessage = ''
      const errorMessage = await this.auth.registerWithEmailAndPassword(
        this.email,
        this.password
      )

      if (errorMessage) {
        this.errorMessage = errorMessage
      } else {
        this.$router.push({ name: 'preparation' })
      }
    },
  },
})
</script>
