<template>
  <v-card ref="form">
    <v-card-title class="mb-3">ユーザー名を入力してください</v-card-title>
    <v-card-text>
      <v-form v-model="isFormValid" @submit.prevent="startApp">
        <mol-field-user-name v-model="userName" autofocus />
        <v-alert
          v-show="errorMessage"
          type="warning"
          close-label="アラートを閉じる"
          closable
        >
          {{ errorMessage }}
        </v-alert>
        <v-btn
          type="submit"
          :loading="isLoading"
          :disabled="!isFormValid"
          color="primary"
        >
          ChatCordを始める
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
definePageMeta({
  layout: 'only-one-form',
  middleware: ['auth'],
})

export default defineComponent({
  setup() {
    const { functions } = useFirebase()
    return { functions }
  },
  data() {
    return {
      userName: '',
      errorMessage: '',
      successMessage: '',
      isFormValid: false,
      isLoading: false,
    }
  },
  methods: {
    async startApp() {
      this.errorMessage = ''
      this.isLoading = true
      const response = await this.functions.updateUserProfile({
        displayName: this.userName,
      })

      if (response.data.code === 'ALREADY_EXISTS') {
        this.errorMessage =
          '既にユーザー名が使われています。別のユーザー名を入力してください。'
        this.isLoading = false
        return
      }
      navigateTo('./chat/me/friends')
    },
  },
})
</script>
