import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAloN6sViDzURT9UEZwebdQsV0MGZ8Asec',
    authDomain: 'chatcord-nuxt3.firebaseapp.com',
    projectId: 'chatcord-nuxt3',
    storageBucket: 'chatcord-nuxt3.appspot.com',
    messagingSenderId: '733157946491',
    appId: '1:733157946491:web:b5b257c244b6cd2b09dede',
  }
  initializeApp(firebaseConfig)

  if (window.location.hostname === 'localhost') {
    const auth = getAuth()
    connectAuthEmulator(auth, 'http://localhost:9099')

    const storage = getStorage()
    connectStorageEmulator(storage, 'localhost', 9199)

    const db = getFirestore()
    connectFirestoreEmulator(db, 'localhost', 8080)

    const functions = getFunctions()
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }
})
