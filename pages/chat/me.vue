<template>
  <nuxt-layout name="chat-me">
    <template #side>
      <v-list nav density="compact">
        <v-list-item
          to="/chat/me/friends"
          :class="[{ 'v-list-item--active': isFriendPage }]"
        >
          <template #prepend>
            <v-icon class="mr-3">mdi-account-multiple</v-icon>
          </template>
          <v-list-item-title>フレンド</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template #prepend>
            <v-icon class="mr-3">mdi-function</v-icon>
          </template>
          <v-list-item-title>...機能追加予定</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider class="mx-2" />

      <v-list nav>
        <v-list-item
          v-for="(friend, index) in userProfile.state.friends"
          :key="index"
          :to="`/chat/me/${friend.dmId}`"
        >
          <template #prepend>
            <mol-avatar
              :photo-url="friend.photoURL"
              :display-name="friend.displayName"
            />
          </template>
          <v-list-item-title>{{ friend.displayName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>

    <template #app-bar>
      <template v-if="isFriendPage">
        <v-app-bar-title class="text-subtitle-1 mr-3">フレンド</v-app-bar-title>
        <v-btn to="/chat/me/friends" class="ml-2">一覧</v-btn>
        <v-badge
          :content="requestCount"
          :model-value="requestCount !== 0"
          color="red"
          floating
          offset-x="15"
          offset-y="15"
        >
          <v-btn to="/chat/me/pending" class="ml-2">保留中</v-btn>
        </v-badge>
        <v-dialog
          v-model="searchForm.dialog"
          max-width="400"
          @click:outside="resetSearchForm"
        >
          <template #activator="{ props }">
            <v-btn
              class="ml-2"
              size="small"
              v-bind="props"
              elevation="1"
              variant="elevated"
              >フレンドを追加する</v-btn
            >
          </template>
          <v-form
            ref="searchForm"
            v-model="searchForm.isValid"
            @submit.prevent="searchByDisplayName"
          >
            <v-card :loading="searchForm.loading">
              <template #progress>
                <v-progress-linear height="5" indeterminate></v-progress-linear>
              </template>
              <v-card-title>ユーザーを検索する</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="searchForm.name"
                  variant="outlined"
                  counter="20"
                  label="ユーザー名を入力してください"
                  autofocus
                  :rules="searchForm.rules"
                />
                <v-btn
                  color="primary"
                  :loading="searchForm.loading"
                  :disabled="!searchForm.isValid"
                  @click="searchByDisplayName"
                >
                  検索
                </v-btn>
              </v-card-text>
              <v-card-text class="py-0">
                <v-list v-if="searchForm.errorMessage">
                  <v-alert type="warning">{{
                    searchForm.errorMessage
                  }}</v-alert>
                </v-list>
                <template v-else-if="searchForm.result">
                  <v-alert type="info">ユーザーが見つかりました。</v-alert>
                  <v-list>
                    <org-user-list-item :user="searchForm.result" class="px-0">
                      <template #list-item-actions>
                        <v-list-item-action start>
                          <v-btn
                            :loading="searchForm.loading"
                            @click="requestToBecomeFriend"
                            >申請</v-btn
                          >
                        </v-list-item-action>
                      </template>
                    </org-user-list-item>
                  </v-list>
                </template>
              </v-card-text>
            </v-card>
          </v-form>
        </v-dialog>
      </template>
      <template v-if="isDirectMessagePage">
        <v-app-bar-title>
          {{ friendName }}とのダイレクトメッセージ
        </v-app-bar-title>
      </template>
    </template>

    <template #main>
      <router-view />
    </template>
  </nuxt-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from 'vue'
// import { userProfileStore } from '@/store'
import { Unsubscribe } from '@firebase/util'
// import * as functions from '@/plugins/firebase/functions'
import firebase from 'firebase'

definePageMeta({
  layout: false,
})

export default defineComponent({
  props: {
    loginUser: {
      type: Object as PropType<firebase.User>,
      required: true,
    },
  },
  setup() {
    const pushSnackbar =
      inject<(params: CC.P.PushSnackbarParams) => void>('pushSnackbar')!
    const { functions } = useFirebase()
    return { pushSnackbar, functions, userProfile: useUserProfileStore() }
  },
  data() {
    return {
      // userProfile: userProfileStore,
      unsubscribeDirectMessageChannels: null as null | Unsubscribe,
      searchForm: {
        isValid: false,
        name: '',
        rules: [(value: string) => !!value || 'ユーザー名は必須です'],
        errorMessage: '',
        loading: false,
        result: null as null | CC.P.PublicUserData,
        dialog: false,
      },
    }
  },
  computed: {
    isFriendPage() {
      const { name } = this.$route
      return typeof name === 'string' ? /(friends|pending)/.test(name) : false
    },
    isDirectMessagePage() {
      const { name } = this.$route
      return name === 'chat-me-id'
    },
    friendName() {
      const target = this.userProfile.state.friends.find(
        (friend) => friend.dmId === this.$route.params.id
      )
      return target ? target.displayName : 'フレンド'
    },
    requestCount() {
      return this.userProfile.state.friendRequests.length
    },
  },
  methods: {
    async searchByDisplayName() {
      this.searchForm.loading = true

      const response = await this.functions.searchByUserName(
        this.searchForm.name,
        this.loginUser.uid
      )
      this.resetSearchForm()

      if (!response.data.payload) {
        if (response.data.code === 'NOT_FOUND') {
          this.searchForm.errorMessage = 'ユーザーが見つかりませんでした'
        } else if (response.data.code === 'ALREADY_FRIENDS') {
          this.searchForm.errorMessage = '既にフレンドです'
        }
        this.searchForm.loading = false
        return
      }
      if (response.data.payload.user.uid === this.loginUser.uid) {
        this.searchForm.errorMessage =
          '自分自身以外のユーザーを検索してください'
        this.searchForm.loading = false
        return
      }
      this.searchForm.result = response.data.payload.user

      this.searchForm.loading = false
    },
    async requestToBecomeFriend() {
      if (this.searchForm.result === null) return
      this.searchForm.loading = true

      const response = await this.functions.requestToBecomeFriend(
        this.searchForm.result.uid
      )

      if (response.data.code === 'DOCUMENT_EXISTS') {
        this.pushSnackbar({ text: '既に申請済みです', color: 'warning' })
      } else if (response.data.code === 'TRANSACTION_SUCCESS') {
        this.pushSnackbar({ text: 'フレンド追加の申請を送りました' })
      }

      this.resetSearchForm()
      this.searchForm.loading = false
      this.searchForm.dialog = false
    },
    resetSearchForm() {
      ;(this.$refs.searchForm as CC.P.VForm).reset()
      this.searchForm.errorMessage = ''
      this.searchForm.result = null
    },
  },
})
</script>
