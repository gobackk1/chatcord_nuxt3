<template>
  <v-list>
    <org-user-list-item
      v-for="request in userProfile.state.friendRequests"
      :key="request.uid"
      :user="request"
    >
      <template #list-item-actions>
        <template v-if="request.type === 'send'">
          <v-list-item-action>
            <v-btn :loading="loading" @click="cancelFriendRequest(request.uid)"
              >キャンセル</v-btn
            >
          </v-list-item-action>
        </template>
        <template v-if="request.type === 'receive'">
          <v-list-item-action>
            <v-btn :loading="loading" @click="acceptFriendRequest(request.uid)"
              >承諾</v-btn
            >
          </v-list-item-action>
          <v-list-item-action>
            <v-btn :loading="loading" @click="cancelFriendRequest(request.uid)"
              >拒否</v-btn
            >
          </v-list-item-action>
        </template>
      </template>
      <v-divider />
    </org-user-list-item>
    <v-list-item v-if="userProfile.state.friendRequests.length === 0">
      保留中のリクエストはありません。
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const userProfile = useUserProfileStore()
const { functions } = useFirebase()
let loading = false
const pushSnackbar =
  inject<(params: CC.P.PushSnackbarParams) => void>('pushSnackbar')!
const acceptFriendRequest = async (id: string) => {
  loading = true
  await functions.acceptFriendRequest(id)
  pushSnackbar({ text: 'フレンドが追加されました。', color: 'success' })
  loading = false
}
const cancelFriendRequest = async (id: string) => {
  loading = true
  await functions.cancelFriendRequest(id)
  pushSnackbar({ text: 'フレンド追加の申請を拒否しました。' })
  loading = false
}
</script>
