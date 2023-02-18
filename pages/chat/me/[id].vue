<template>
  <nuxt-layout name="chat-me-dm">
    <org-chat-messages-list :messages="messages" />
    <mol-message-sender
      v-model="enteringMessage"
      variant="outlined"
      auto-grow
      no-resize
      rows="1"
      hide-details
      density="compact"
      placeholder="メッセージを入力してエンターを押してください..."
      @keydown:enter="sendMessage"
    />
  </nuxt-layout>
</template>

<script lang="ts">
import { Unsubscribe } from '@firebase/util'

export default defineComponent({
  setup() {
    const userProfile = useUserProfileStore()
    const { firestore } = useFirebase()
    return { userProfile, firestore }
  },
  data() {
    return {
      unsubscribeDirectMessages: null as null | Unsubscribe,
      messages: [] as CC.P.ChatMessage[],
      enteringMessage: '',
    }
  },
  watch: {
    '$route.params.id'(id: string): void {
      this.unsubscribeDirectMessages?.()
      this.messages = []
      this.subscribeDirectMessages(id)
    },
  },
  async created() {
    const { id } = this.$route.params
    if (typeof id === 'string') {
      await this.subscribeDirectMessages(id)
    } else {
      throw new Error('this route is not applicable')
    }
  },
  beforeUnmount() {
    this.unsubscribeDirectMessages?.()
  },
  methods: {
    async subscribeDirectMessages(dmId: string) {
      this.unsubscribeDirectMessages = await this.firestore.fetchDirectMessages(
        {
          dmId,
          handlers: {
            modified: {
              handler: (doc) => {
                const message = {
                  ...(doc.data() as CC.P.ChatMessage),
                  id: doc.id,
                }
                const index = this.messages.findIndex(
                  (message) => message.id === doc.id
                )
                this.messages[index] = message
              },
            },
            added: {
              handler: (doc) => {
                const message = doc.data({
                  serverTimestamps: 'estimate',
                }) as CC.P.ChatMessage
                this.messages.unshift({
                  ...message,
                  id: doc.id,
                })
              },
            },
            removed: {
              handler: (doc) => {
                const filteredMessages = this.messages.filter(
                  (message) => message.id !== doc.id
                )
                this.messages = filteredMessages
              },
            },
            catch: () => {
              // NOTE: ダイレクトメッセージ相手がユーザー削除した場合、フレンド一覧に遷移させておく
              navigateTo('/chat/me/friends')
            },
          },
        }
      )
    },
    async sendMessage() {
      if (!this.enteringMessage) return
      const { id } = this.$route.params
      if (typeof id === 'string') {
        const userData = this.userProfile.state.userData!
        await this.firestore.sendDirectMessage(
          id,
          this.enteringMessage,
          JSON.parse(JSON.stringify(userData))
        )
        this.enteringMessage = ''
      } else {
        throw new Error('this route is not applicable')
      }
    },
  },
})
</script>
