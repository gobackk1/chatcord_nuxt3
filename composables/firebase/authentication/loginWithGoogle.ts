import firebase from 'firebase'

export const loginWithGoogle =
  async (): Promise<firebase.auth.GoogleAuthProvider> => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithRedirect(provider)
    return provider
  }
