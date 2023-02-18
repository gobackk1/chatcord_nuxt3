<template>
  <v-list>
    <template v-for="friend in userProfile.state.friends" :key="friend.uid">
      <org-user-list-item :user="friend">
        <template #list-item-actions>
          <v-list-item-action>
            <v-btn :loading="loading" :to="`/chat/me/${friend.dmId}`"
              >メッセージ</v-btn
            >
          </v-list-item-action>
          <v-list-item-action>
            <v-btn :loading="loading" @click="deleteFriend(friend.uid)"
              >削除</v-btn
            >
          </v-list-item-action>
        </template>
      </org-user-list-item>
      <v-divider class="mx-2" />
    </template>
    <v-list-item v-if="userProfile.state.friends.length === 0">
      フレンドがいません。
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
const userProfile = useUserProfileStore()
const { functions } = useFirebase()
let loading = false
const deleteFriend = async (uid: string): Promise<void> => {
  loading = true
  await functions.deleteFriend(uid)
  loading = false
}
</script>
