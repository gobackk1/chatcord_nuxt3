<template>
  <v-card elevation="0">
    <v-card-title>プロフィール</v-card-title>
    <v-card max-width="500" outlined>
      <v-card-text>
        <mol-avatar :photo-url="photoURL" :display-name="displayName" />

        <input
          ref="file"
          type="file"
          style="display: none"
          accept="image/png"
          @change="changeFile"
        />
        <v-btn :loading="loading" @click="clickUploadButton"
          >アバターを変更する</v-btn
        >

        <v-card-subtitle class="text-subtitle pb-0 mb-0"
          >ユーザー名</v-card-subtitle
        >
        <v-card-title class="text-title pt-0 mb-3">
          {{ userProfile.state.userData!.displayName }}
        </v-card-title>
        <v-card-subtitle class="text-subtitle pb-0 mb-0">
          メールアドレス
        </v-card-subtitle>
        <v-card-title class="text-title pt-0 mb-3">
          {{ userProfile.state.userData!.email }}
        </v-card-title>

        <!-- <v-card-actions>
          <v-spacer />
          <v-btn>ユーザープロフィールを編集</v-btn>
        </v-card-actions> -->
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import firebase from 'firebase'

export default defineComponent({
  setup() {
    const userProfile = useUserProfileStore()
    const { functions, storage } = useFirebase()
    return { userProfile, functions, storage }
  },
  data() {
    return {
      loading: false,
      cancelUpload: null as null | (() => void),
    }
  },
  computed: {
    photoURL() {
      return this.userProfile.state.userData!.photoURL!
    },
    displayName() {
      return this.userProfile.state.userData!.displayName!
    },
  },
  beforeUnmount() {
    this.cancelUpload?.()
  },
  methods: {
    clickUploadButton() {
      if (this.$refs.file instanceof HTMLElement) {
        this.$refs.file.click()
      }
    },
    async changeFile(event: Event) {
      const target = event.target as HTMLInputElement
      if (!target.files || !target.files[0]) return
      this.loading = true
      const storageRef = this.storage().ref()
      const imageRef = storageRef.child(
        `images/users/${this.userProfile.state.userData?.uid}/avatar.png`
      )
      const uploadTask = imageRef.put(target.files[0])

      this.cancelUpload = uploadTask.cancel
      uploadTask.on('state_changed', null, this.uploadError, async () => {
        const photoURL =
          (await uploadTask.snapshot.ref.getDownloadURL()) as string
        await this.functions.updateUserProfile({ photoURL })
        const copy = { ...this.userProfile.state.userData } as firebase.User
        copy!.photoURL = photoURL
        this.userProfile.actions.setUserData(copy)
        this.loading = false
      })
    },
    uploadError(error: firebase.storage.FirebaseStorageError) {
      // TODO: コンポーネント破壊時に動作確認
      console.log(error)
    },
  },
})
</script>
