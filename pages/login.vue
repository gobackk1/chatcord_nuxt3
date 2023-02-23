<template>
  <v-card>
    <v-card-title class="mb-3">ChatCord ログイン</v-card-title>
    <v-card-text>
      <v-form v-model="isFormValid" @submit.prevent="login">
        <mol-field-email v-model="email" class="mb-3" />
        <mol-field-password v-model="password" class="mb-3 text-left" />
        <v-alert
          v-if="errorMessage"
          class="mb-3"
          type="warning"
          close-label="アラートを消す"
          closable
        >
          {{ errorMessage }}
        </v-alert>
        <v-btn to="/signup" class="mr-3"> 新規登録する </v-btn>
        <v-btn class="mr-3" @click="loginWithGoogle"
          >googleでログインする</v-btn
        >
        <v-btn type="submit" :disabled="!isFormValid" color="primary">
          ログイン
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
definePageMeta({
  layout: 'only-one-form',
})

export default defineComponent({
  setup() {
    const auth = useAuth()
    return { auth }
  },
  data() {
    return {
      password: '',
      email: '',
      errorMessage: '',
      isFormValid: false,
    }
  },
  created() {
    console.log(this)
  },
  methods: {
    async login() {
      this.errorMessage = ''
      const errorMessage = await this.auth.loginWithEmailAndPassword(
        this.email,
        this.password
      )

      if (errorMessage) {
        this.errorMessage = errorMessage
      } else {
        /**
         * NOTE:
         * router.pushの後にナビゲーションガードを挟むと、期待している遷移でもエラーが発生する
         * 他に良い方法を思いつかなかったので、空実装の関数でエラー潰しをする
         * https://stackoverflow.com/questions/62223195
         */
        //
        // FIXME: Error: Navigation cancelled from "/login" to "/chat/me/friends" with a new navigation.
        // this.$router.push({ name: 'friends' }).catch(() => ({}))
        navigateTo('/chat/me/friends')
      }
    },
    async loginWithGoogle() {
      await this.auth.loginWithGoogle()
    },
  },
})
</script>
