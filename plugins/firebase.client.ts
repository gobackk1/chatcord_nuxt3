import firebase from 'firebase'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAloN6sViDzURT9UEZwebdQsV0MGZ8Asec',
    authDomain: 'chatcord-nuxt3.firebaseapp.com',
    projectId: 'chatcord-nuxt3',
    storageBucket: 'chatcord-nuxt3.appspot.com',
    messagingSenderId: '733157946491',
    appId: '1:733157946491:web:b5b257c244b6cd2b09dede',
  }
  firebase.initializeApp(firebaseConfig)

  const functions = firebase.app().functions('asia-northeast1')

  if (window.location.hostname === 'localhost') {
    const storage = firebase.storage()
    const auth = firebase.auth()

    auth.useEmulator('http://localhost:9099')
    storage.useEmulator('localhost', 9199)
    firebase.firestore().useEmulator('localhost', 8080)
    functions.useEmulator('localhost', 5001)
  }
})
