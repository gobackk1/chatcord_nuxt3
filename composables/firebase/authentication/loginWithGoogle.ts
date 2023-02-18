import firebase from 'firebase'

export const loginWithGoogle = async (): Promise<void> => {
  const provider = new firebase.auth.GoogleAuthProvider()
  await firebase.auth().signInWithRedirect(provider)
}
