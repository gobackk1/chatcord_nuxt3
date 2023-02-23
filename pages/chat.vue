<template>
  <nuxt-layout v-if="initialized" name="chat">
    <template #side>
      <v-container class="pa-0">
        <v-row class="d-flex flex-column align-center pt-4 ma-0">
          <mol-btn-multi-tool
            :display-name="loginUser.displayName || ''"
            :photo-url="loginUser.photoURL || ''"
            :menu="menu.user"
            :tooltip-attrs="{
              location: 'right',
              zIndex: 2021,
            }"
            tooltip-text="ダイレクトメッセージ"
            :menu-attrs="{
              location: 'right top',
              zIndex: 2022,
              offset: 8,
            }"
            to="/chat/me/friends"
            :active="$route.path.startsWith('/chat/me')"
            @click-menu-item="clickMenuItem"
          />
        </v-row>
      </v-container>

      <v-divider class="mx-2 my-2" />

      <!-- <v-card
        class="d-flex flex-column align-center"
        tile
        elevation="0"
        max-height="800"
      >
        <cc-btn-multi-tool
          v-for="(room, index) in chatRooms.state.rooms"
          :key="index"
          :display-name="room.displayName"
          :photo-url="room.photoURL"
          :menu="generateRoomSettingMenu(room)"
          :tooltip-attrs="{ right: true }"
          :menu-attrs="{
            nudgeRight: 60,
            nudgeTop: 4,
          }"
          :to="generatePath(room) || ''"
          :active="room.id === $route.params.roomId"
        />

        <v-dialog
          v-model="createRoomForm.dialog"
          max-width="400px"
          @click:outside="resetCreateRoomForm"
        >
          <template #activator="{ props: dialogProps }">
            <v-tooltip location="right" :open-on-click="false">
              <template #activator="{ props: tooltipProps }">
                <v-btn icon x-large v-bind="dialogProps">
                  <v-icon size="36" v-bind="tooltipProps">mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>ルームを追加する</span>
            </v-tooltip>
          </template>
          <v-form
            ref="createRoomForm"
            v-model="createRoomForm.isValid"
            lazy-validation
          >
            <v-card :loading="createRoomForm.loading">
              <template #progress>
                <v-progress-linear height="5" indeterminate></v-progress-linear>
              </template>

              <v-card-title>新しくルームを作る</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="createRoomForm.name"
                  dense
                  required
                  outlined
                  maxlength="20"
                  counter="20"
                  label="ルーム名を入力して下さい"
                  autofocus
                  :rules="createRoomForm.rules"
                />
              </v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-spacer />
                <v-btn @click="clickCloseCreateRoom">閉じる</v-btn>
                <v-btn
                  color="primary"
                  :loading="createRoomForm.loading"
                  :disabled="!createRoomForm.isValid"
                  @click="clickCreateRoom"
                >
                  作成
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-card> -->

      <!-- <v-dialog v-model="setting.room.dialog" fullscreen hide-overlay>
        <cc-setting-page
          title="ルーム設定"
          :data-id="$route.params.roomId"
          :pages-data="setting.room.pagesData"
          :login-user="loginUser"
          @close="setting.room.dialog = false"
        />
      </v-dialog> -->

      <v-dialog v-model="setting.user.dialog" fullscreen hide-overlay>
        <org-setting-view
          title="ユーザー設定"
          :data-id="loginUser.uid"
          :pages-data="setting.user.pagesData"
          :login-user="loginUser"
          @close="setting.user.dialog = false"
        />
      </v-dialog>
    </template>

    <template #main>
      <nuxt-page :login-user="loginUser" />
    </template>
  </nuxt-layout>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <template v-else>
    <!-- <cc-full-page-loading-indicator /> -->
    loading
  </template>
</template>

<script lang="ts">
/**
 * FIXME: #components is not in alias
 * https://nuxt.com/docs/guide/directory-structure/components#direct-imports
 */
// import { OrgSettingUserProfile } from '#components'
import OrgSettingUserProfile from '../components/organisms/Setting/UserProfile.vue'
import OrgSettingUserOther from '../components/organisms/Setting/UserOther.vue'
import firebase from 'firebase'

definePageMeta({
  layout: false,
  middleware: ['auth', 'chat'],
})

export default defineComponent({
  setup() {
    const userProfile = useUserProfileStore()
    const loginUser = userProfile.state.userData
    if (loginUser === null) {
      throw new Error('this page navigation is not applicable')
    }
    return { auth: useAuth(), userProfile, loginUser }
  },
  data() {
    return {
      initialized: true,
      unsubscribe: null as null | (() => void),
      // chatRooms: chatRoomsStore,
      createRoomForm: {
        name: '',
        loading: false,
        dialog: false,
        isValid: false,
        rules: [(value: string) => !!value || 'ルーム名は必須です。'],
      },
      menu: {
        user: ['ユーザー設定', 'ログアウトする'],
      },
      setting: {
        room: {
          dialog: false,
          pagesData: [
            {
              label: '概要',
              // page: CcRoomSettingOverviewPage,
            } as CC.P.SettingPage,
            {
              label: 'ルーム削除',
              // page: CcRoomSettingDestroyPage,
            } as CC.P.SettingPage,
          ],
        },
        user: {
          dialog: false,
          pagesData: [
            {
              label: 'プロフィール',
              page: OrgSettingUserProfile,
            } as CC.P.SettingPage,
            {
              label: 'その他',
              page: OrgSettingUserOther,
            } as CC.P.SettingPage,
          ],
        },
      },
    }
  },
  created() {
    this.unsubscribe = this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUpChatApplication(user)
      } else {
        this.tearDownChatApplication()
      }
    })
  },
  beforeUnmount() {
    this.unsubscribe?.()
  },
  methods: {
    async setUpChatApplication(user: firebase.User) {
      // NOTE: loading indicatorを表示するためにbeforeEnterではなくコンポーネント側でfetchする
      await Promise.all([
        this.userProfile.actions.fetchFriends(user.uid),
        this.userProfile.actions.fetchFriendRequests(user.uid),
        // this.chatRooms.actions.fetchRoomsForLoginUser(user.uid),
      ])
      // NOTE: ネストしたルーティングのコンポーネントのレンダリング前に
      // 必要なデータを用意するため必ず最後にセットする。
      this.initialized = true
    },
    tearDownChatApplication() {
      // this.chatRooms.actions.initializeStore()
      this.userProfile.actions.initializeStore()
      this.initialized = false
    },
    async clickCreateRoom() {
      this.createRoomForm.loading = true
      // const roomId = await this.chatRooms.actions.createRoom(
      //   this.createRoomForm.name,
      //   this.loginUser.uid
      // )
      // this.chatRooms.actions.setCreatingRoomId(roomId)
      this.resetCreateRoomForm()
    },
    resetCreateRoomForm() {
      ;(this.$refs.createRoomForm as CC.P.VForm).reset()
      this.createRoomForm.name = ''
      this.createRoomForm.loading = false
      this.createRoomForm.dialog = false
    },
    clickCloseCreateRoom() {
      this.resetCreateRoomForm()
    },
    async logout() {
      // this.chatRooms.actions.initializeStore()
      // this.userProfile.actions.initializeStore()
      this.$router.push('/login')
      await this.auth.logout()
    },
    clickMenuSetting(room: CC.P.ChatRoom) {
      if (this.$route.params.roomId !== room.id) {
        if (!room.channels[0]) {
          throw new Error('room must hove at least one channel')
        }
        this.$router.push({
          path: `/chat/room/${room.id}/${room.channels[0].id}`,
          query: { from: 'friends' },
        })
      }
      this.setting.room.dialog = true
    },
    async clickMenuExit(roomId: string) {
      const { uid } = this.loginUser
      // await this.chatRooms.actions.destroyRoomMember(roomId, uid)
    },
    clickUserSetting() {
      this.setting.user.dialog = true
    },
    // generateRoomSettingMenu(room: CC.P.ChatRoom): CC.P.MultiToolMenu[] {
    //   return [
    //     {
    //       label: 'ルーム設定',
    //       click: () => {
    //         this.clickMenuSetting(room)
    //       },
    //     },
    //     {
    //       label: '...機能追加予定',
    //       click: () => {
    //         console.log('...機能追加予定')
    //       },
    //     },
    //   ]
    // },
    generatePath(room: CC.P.ChatRoom) {
      if (!room.channels[0]) {
        if (this.initialized) {
          throw new Error('room must hove at least one channel')
        }
        return
      }
      return `/chat/room/${room.id}/${room.channels[0].id}`
    },
    clickMenuItem(label: string) {
      switch (label) {
        case 'ユーザー設定':
          this.clickUserSetting()
          break
        case 'ログアウトする':
          this.logout()
          break
      }
    },
  },
})
</script>
