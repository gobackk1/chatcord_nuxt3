// import * as functions from 'firebase-functions'

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// export const helloWorld = functions
//   .region('asia-northeast1')
//   .https.onCall(() => ({}))
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

export default {
  name: 'HomePage',
  data: () => ({
    currentUser: null,
  }),
  mounted() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user != null) {
        this.currentUser = user
      } else {
        this.currentUser = null
      }
    })
  },
  methods: {
    signIn() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((auth) => {
          console.log('login', auth.user)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log('failed to login', errorCode, errorMessage)
        })
    },
    async signOutUser() {
      await signOut(getAuth())
    },
  },
}
